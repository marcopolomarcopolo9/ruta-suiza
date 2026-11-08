// Club member area: passwordless login by e-mail link, membership checked in Stripe. Server-only.
import crypto from 'crypto';
import { cmd, storeReady } from './redis';
import { stripe, stripeReady } from './stripe';
import { normEmail } from './letters';

export const MEMBER_COOKIE = 'rs_member';
const SESSION_DAYS = 30;
const SECRET = process.env.MEMBER_SECRET
  || crypto.createHash('sha256').update(`member:${process.env.ADMIN_PASSWORD || ''}:${process.env.STRIPE_SECRET_KEY || ''}`).digest('hex');
const hmac = (s) => crypto.createHmac('sha256', SECRET).update(s).digest('base64url');
const ehash = (e) => crypto.createHash('sha256').update(normEmail(e)).digest('hex').slice(0, 32);

/** True when this e-mail has an active Club subscription in Stripe (cached 10 min). */
export async function isActiveMember(email) {
  const e = normEmail(email);
  if (!e || !stripeReady()) return false;
  const key = `member:${ehash(e)}`;
  if (storeReady()) { const c = await cmd('GET', key); if (c !== null && c !== undefined) return c === '1'; }
  let ok = false;
  const cs = await stripe('GET', `customers?email=${encodeURIComponent(e)}&limit=10`);
  for (const c of cs.data || []) {
    const subs = await stripe('GET', `subscriptions?customer=${c.id}&status=all&limit=20`);
    if ((subs.data || []).some((s) => ['active', 'trialing', 'past_due'].includes(s.status))) { ok = true; break; }
  }
  if (storeReady()) await cmd('SET', key, ok ? '1' : '0', 'EX', 600);
  return ok;
}
export async function forgetMember(email) { if (storeReady()) await cmd('DEL', `member:${ehash(email)}`); }

export async function createMagic(email, lang) {
  const t = crypto.randomBytes(24).toString('hex');
  await cmd('SET', `mlink:${t}`, JSON.stringify({ e: normEmail(email), lang }), 'EX', 1200);
  return t;
}
export async function consumeMagic(token) {
  const k = `mlink:${String(token).replace(/[^a-f0-9]/g, '')}`;
  const v = await cmd('GET', k);
  if (!v) return null;
  await cmd('DEL', k);
  return JSON.parse(v);
}

export function sessionCookie(email) {
  const body = Buffer.from(JSON.stringify({ e: normEmail(email), x: Date.now() + SESSION_DAYS * 86400000 })).toString('base64url');
  return { name: MEMBER_COOKIE, value: `${body}.${hmac(body)}`, maxAge: SESSION_DAYS * 86400 };
}
/** Returns the member e-mail from the signed cookie, or null. Accepts a Request or next/headers cookies(). */
export function memberEmail(src) {
  const raw = (src.cookies?.get ? src.cookies.get(MEMBER_COOKIE)?.value : '') || '';
  const [body, sig] = raw.split('.');
  if (!body || !sig) return null;
  const good = hmac(body);
  if (sig.length !== good.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))) return null;
  try { const j = JSON.parse(Buffer.from(body, 'base64url').toString()); return j.x > Date.now() ? j.e : null; } catch { return null; }
}
