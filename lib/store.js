// Server-only lead storage on Upstash Redis (REST API, no SDK).
// Vercel → Storage → Upstash Redis adds KV_REST_API_URL / KV_REST_API_TOKEN automatically.
import crypto from 'crypto';

import { storeReady, cmd } from './redis';
import { notifyAdmin, clubWelcome } from './mail';

export { storeReady };

export const STATUSES = ['nuevo', 'contactado', 'cerrado'];

export async function addLead(lead) {
  const now = Date.now();
  const id = now.toString(36) + crypto.randomBytes(3).toString('hex');
  const rec = { id, status: 'nuevo', note: '', createdAt: new Date(now).toISOString(), ...lead };
  await cmd('SET', `lead:${id}`, JSON.stringify(rec));
  await cmd('ZADD', 'leads', now, id);
  return rec;
}

export async function listLeads(limit = 2000) {
  const ids = await cmd('ZREVRANGE', 'leads', 0, limit - 1);
  if (!ids || !ids.length) return [];
  const vals = await cmd('MGET', ...ids.map((i) => `lead:${i}`));
  return vals.filter(Boolean).map((v) => JSON.parse(v));
}

export async function updateLead(id, patch) {
  const v = await cmd('GET', `lead:${id}`);
  if (!v) return null;
  const rec = JSON.parse(v);
  if (STATUSES.includes(patch.status)) rec.status = patch.status;
  if (typeof patch.note === 'string') rec.note = patch.note.slice(0, 4000);
  rec.updatedAt = new Date().toISOString();
  await cmd('SET', `lead:${id}`, JSON.stringify(rec));
  return rec;
}

export async function deleteLead(id) {
  await cmd('DEL', `lead:${id}`);
  await cmd('ZREM', 'leads', id);
}

/** Simple fixed-window rate limit. Returns true when allowed. */
export async function allow(key, limit, seconds) {
  try {
    const n = await cmd('INCR', `rl:${key}`);
    if (n === 1) await cmd('EXPIRE', `rl:${key}`, seconds);
    return n <= limit;
  } catch { return true; }
}

/** Saves a paid Stripe Checkout session once (idempotent by session id). */
export async function recordPayment(s) {
  if (!storeReady() || !s || s.payment_status !== 'paid') return null;
  // only Ruta Suiza sales (our checkout always sets metadata.product), never other businesses on the same Stripe account
  if (!['club', 'asesoria'].includes(s.metadata?.product)) return null;
  const first = await cmd('SET', `paid:${s.id}`, '1', 'NX');
  if (first !== 'OK') return null;
  const c = s.customer_details || {};
  const [firstName, ...rest] = String(c.name || '').trim().split(/\s+/);
  const club = s.metadata?.product === 'club' || s.mode === 'subscription';
  const amount = `${((s.amount_total || 0) / 100).toFixed(2)} ${String(s.currency || '').toUpperCase()}`;
  const lead = await addLead({
    kind: club ? 'club_pago' : 'pago', first: firstName || '', last: rest.join(' '), email: c.email || '', phone: c.phone || '',
    country: '', message: club ? `Abonnement Club ${amount}/mois · ${s.subscription || s.id}` : `Pago ${amount} · ${s.id}`,
    lang: s.metadata?.lang || 'es', page: 'stripe', consent: true,
  });
  try {
    await notifyAdmin(lead);
    if (club) await clubWelcome({ email: lead.email, name: c.name, lang: lead.lang });
  } catch (e) { console.error('payment e-mail failed', e.message); }
  return lead;
}

/** Small diagnostic notes shown in /admin (last checkout error, TWINT refusal…). */
export async function setDiag(key, value) {
  if (!storeReady()) return;
  try { await cmd('SET', `diag:${key}`, JSON.stringify({ value, at: new Date().toISOString() }), 'EX', 60 * 60 * 24 * 30); } catch { /* ignore */ }
}
export async function getDiag(key) {
  if (!storeReady()) return null;
  try { const v = await cmd('GET', `diag:${key}`); return v ? JSON.parse(v) : null; } catch { return null; }
}

/** Private admin notes per client (keyed by e-mail or phone). */
export async function getClientNotes() {
  if (!storeReady()) return {};
  const flat = await cmd('HGETALL', 'client:notes');
  const out = {};
  if (Array.isArray(flat)) for (let i = 0; i < flat.length; i += 2) out[flat[i]] = flat[i + 1];
  else if (flat && typeof flat === 'object') Object.assign(out, flat);
  return out;
}
export async function setClientNote(key, note) {
  if (!storeReady()) return;
  if (note) await cmd('HSET', 'client:notes', key, String(note).slice(0, 4000));
  else await cmd('HDEL', 'client:notes', key);
}

/** Deletes requests older than 24 months and bookings older than 12 months (runs at most once a day). */
export async function purgeOldData() {
  if (!storeReady()) return null;
  try {
    if ((await cmd('SET', 'purge:lock', '1', 'NX', 'EX', 86400)) !== 'OK') return null;
    const leadCut = Date.now() - 730 * 86400 * 1000;
    const oldLeads = await cmd('ZRANGEBYSCORE', 'leads', '-inf', leadCut);
    for (const id of oldLeads) { await cmd('DEL', `lead:${id}`); await cmd('ZREM', 'leads', id); }
    const d = new Date(Date.now() - 365 * 86400 * 1000).toISOString().slice(0, 10).replace(/-/g, '');
    const oldBks = await cmd('ZRANGEBYSCORE', 'bks', '-inf', Number(d) * 10000);
    for (const id of oldBks) { await cmd('DEL', `bk:${id}`); await cmd('ZREM', 'bks', id); }
    return { leads: oldLeads.length, bookings: oldBks.length };
  } catch { return null; }
}

/** Deletes everything stored about one client (requests, bookings, note). Stripe data stays in Stripe. */
export async function deleteClientData({ key, email, phone }) {
  if (!storeReady()) return 0;
  const em = String(email || '').trim().toLowerCase();
  const ph = String(phone || '').replace(/[^\d+]/g, '');
  const same = (x) => (em && String(x.email || '').trim().toLowerCase() === em) || (ph && String(x.phone || '').replace(/[^\d+]/g, '') === ph);
  let n = 0;
  for (const l of await listLeads()) if (same(l)) { await cmd('DEL', `lead:${l.id}`); await cmd('ZREM', 'leads', l.id); n += 1; }
  const ids = await cmd('ZREVRANGE', 'bks', 0, 999);
  if (ids.length) {
    const vals = await cmd('MGET', ...ids.map((i) => `bk:${i}`));
    for (const v of vals) {
      if (!v) continue;
      const b = JSON.parse(v);
      if (!same(b)) continue;
      if (b.min !== undefined) await cmd('DEL', `slot2:${b.date}:${b.min}`);
      await cmd('DEL', `bk:${b.id}`); await cmd('ZREM', 'bks', b.id);
      n += 1;
    }
  }
  if (key) await cmd('HDEL', 'client:notes', key);
  return n;
}

export const PAYMENT_KINDS = ['pago', 'club_pago', 'pago_fallido', 'club_baja'];
/** Deletes every payment-related entry recorded from Stripe (requests and bookings stay). */
export async function resetPayments() {
  if (!storeReady()) return 0;
  let n = 0;
  for (const l of await listLeads(5000)) {
    if (l.page === 'stripe' && PAYMENT_KINDS.includes(l.kind)) { await cmd('DEL', `lead:${l.id}`); await cmd('ZREM', 'leads', l.id); n += 1; }
  }
  return n;
}
