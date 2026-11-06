// Password-only admin access: ADMIN_PASSWORD env var, httpOnly cookie holding an HMAC of it.
import crypto from 'crypto';

const PW = process.env.ADMIN_PASSWORD || '';
export const COOKIE = 'rs_admin';
const sig = () => crypto.createHmac('sha256', PW).update('ruta-suiza-admin-v1').digest('hex');

export function passwordOk(p) {
  if (!PW || typeof p !== 'string') return false;
  const a = crypto.createHash('sha256').update(p).digest();
  const b = crypto.createHash('sha256').update(PW).digest();
  return crypto.timingSafeEqual(a, b);
}
export function isAdmin(req) {
  if (!PW) return false;
  const c = req.cookies.get(COOKIE)?.value || '';
  const s = sig();
  return c.length === s.length && crypto.timingSafeEqual(Buffer.from(c), Buffer.from(s));
}
export const sessionValue = sig;
export const ipOf = (req) => (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
