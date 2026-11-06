// Server-only lead storage on Upstash Redis (REST API, no SDK).
// Vercel → Storage → Upstash Redis adds KV_REST_API_URL / KV_REST_API_TOKEN automatically.
import crypto from 'crypto';

const BASE = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
export const storeReady = () => Boolean(BASE && TOKEN);

async function cmd(...args) {
  const r = await fetch(BASE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args.map(String)),
    cache: 'no-store',
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || `redis ${r.status}`);
  return j.result;
}

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
  const first = await cmd('SET', `paid:${s.id}`, '1', 'NX');
  if (first !== 'OK') return null;
  const c = s.customer_details || {};
  const [firstName, ...rest] = String(c.name || '').trim().split(/\s+/);
  return addLead({
    kind: 'pago', first: firstName || '', last: rest.join(' '), email: c.email || '', phone: c.phone || '',
    country: '', message: `Pago ${((s.amount_total || 0) / 100).toFixed(2)} ${String(s.currency || '').toUpperCase()} · ${s.id}`,
    lang: s.metadata?.lang || 'es', page: 'stripe', consent: true,
  });
}
