// Letters sent by visitors (1 free letter per e-mail) and by Club members (3 per month).
// Meta in Redis for 1 year, the file itself for 30 days only (privacy). Server-only.
import crypto from 'crypto';
import { storeReady, cmd } from './redis';

export const MEMBER_QUOTA = 3;
export const FILE_TTL = 30 * 86400;
const META_TTL = 365 * 86400;
export const MAX_FILE = 700 * 1024; // bytes after client-side compression (Upstash request limit is 1 MB)
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max);
export const normEmail = (e) => String(e || '').trim().toLowerCase();
export const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const ehash = (e) => crypto.createHash('sha256').update(normEmail(e)).digest('hex').slice(0, 32);
export const monthKey = (d = new Date()) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'Europe/Zurich' }).slice(0, 7);

/** Validates a base64 upload. Returns { mime, data, size } or throws. */
export function checkFile(f) {
  if (!f || typeof f.data !== 'string') throw new Error('file_required');
  const mime = String(f.type || '');
  if (!TYPES.includes(mime)) throw new Error('file_type');
  const data = f.data.replace(/^data:[^,]+,/, '');
  if (!/^[A-Za-z0-9+/=]+$/.test(data)) throw new Error('file_bad');
  const size = Math.floor((data.length * 3) / 4);
  if (size > MAX_FILE) throw new Error('file_big');
  const head = Buffer.from(data.slice(0, 16), 'base64');
  const magic = { 'image/jpeg': [0xff, 0xd8], 'image/png': [0x89, 0x50], 'image/webp': [0x52, 0x49], 'application/pdf': [0x25, 0x50] }[mime];
  if (head[0] !== magic[0] || head[1] !== magic[1]) throw new Error('file_bad');
  return { mime, data, size, name: clean(f.name, 80) || 'carta' };
}

export async function freeLetterUsed(email) {
  return Boolean(await cmd('GET', `freeletter:${ehash(email)}`));
}

export async function addLetter({ kind, name, email, lang, note, file }) {
  const id = Date.now().toString(36) + crypto.randomBytes(3).toString('hex');
  const rec = { id, kind: kind === 'member' ? 'member' : 'free', name: clean(name, 80), email: normEmail(email), lang: lang === 'fr' ? 'fr' : 'es', note: clean(note, 1500), mime: file.mime, size: file.size, fname: file.name, status: 'new', reply: '', createdAt: new Date().toISOString() };
  await cmd('SET', `letterfile:${id}`, file.data, 'EX', FILE_TTL);
  await cmd('SET', `letter:${id}`, JSON.stringify(rec), 'EX', META_TTL);
  await cmd('ZADD', 'letters', Date.now(), id);
  if (rec.kind === 'free') await cmd('SET', `freeletter:${ehash(email)}`, '1', 'EX', META_TTL);
  if (rec.kind === 'member') await cmd('HINCRBY', `lcount:${monthKey()}`, rec.email, 1);
  return rec;
}

export async function listLetters(limit = 300) {
  if (!storeReady()) return [];
  const ids = await cmd('ZREVRANGE', 'letters', 0, limit - 1);
  if (!ids || !ids.length) return [];
  const vals = await cmd('MGET', ...ids.map((i) => `letter:${i}`));
  const out = [];
  for (let i = 0; i < ids.length; i++) { if (vals[i]) out.push(JSON.parse(vals[i])); else await cmd('ZREM', 'letters', ids[i]); }
  return out;
}

export async function getLetter(id) {
  const v = await cmd('GET', `letter:${String(id).replace(/[^a-z0-9]/g, '')}`);
  return v ? JSON.parse(v) : null;
}
export async function getLetterFile(id) {
  return cmd('GET', `letterfile:${String(id).replace(/[^a-z0-9]/g, '')}`);
}

export async function replyLetter(id, reply) {
  const rec = await getLetter(id);
  if (!rec) return null;
  rec.reply = clean(reply, 8000);
  rec.status = rec.reply ? 'answered' : 'new';
  rec.repliedAt = new Date().toISOString();
  await cmd('SET', `letter:${rec.id}`, JSON.stringify(rec), 'EX', META_TTL);
  return rec;
}

export async function deleteLetter(id) {
  const k = String(id).replace(/[^a-z0-9]/g, '');
  await cmd('DEL', `letter:${k}`); await cmd('DEL', `letterfile:${k}`); await cmd('ZREM', 'letters', k);
}

/** Letters used this month by a member e-mail (sent through the site + manual adjustments from the CMS). */
export async function lettersUsed(email, month = monthKey()) {
  return Number((await cmd('HGET', `lcount:${month}`, normEmail(email))) || 0);
}
export async function allCounts(month = monthKey()) {
  const flat = (await cmd('HGETALL', `lcount:${month}`)) || [];
  const o = {};
  if (Array.isArray(flat)) for (let i = 0; i < flat.length; i += 2) o[flat[i]] = Number(flat[i + 1]);
  else Object.assign(o, flat);
  return o;
}
export async function adjustCount(email, delta, month = monthKey()) {
  const e = normEmail(email);
  const n = await cmd('HINCRBY', `lcount:${month}`, e, delta > 0 ? 1 : -1);
  if (n < 0) { await cmd('HSET', `lcount:${month}`, e, 0); return 0; }
  return n;
}
