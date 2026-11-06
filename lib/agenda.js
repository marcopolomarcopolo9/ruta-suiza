// Internal booking calendar (1-hour slots, Europe/Zurich), stored in Upstash Redis.
// Weekly template + per-slot overrides + bookings. Server-only.
import crypto from 'crypto';
import { storeReady, addLead } from './store';

const BASE = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
async function cmd(...args) {
  const r = await fetch(BASE, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(args.map(String)), cache: 'no-store' });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || `redis ${r.status}`);
  return j.result;
}

export const HOURS = Array.from({ length: 15 }, (_, i) => 7 + i); // 7h → 21h
export const DAYS_AHEAD = 14;
const MIN_NOTICE_H = 3; // no booking less than 3 hours ahead
// Default: Monday–Friday, 9–12 and 14–17
export const DEFAULT_TEMPLATE = { 1: [9, 10, 11, 14, 15, 16], 2: [9, 10, 11, 14, 15, 16], 3: [9, 10, 11, 14, 15, 16], 4: [9, 10, 11, 14, 15, 16], 5: [9, 10, 11, 14, 15, 16], 6: [], 7: [] };

/** Current date and hour in Zurich. */
export function zurichNow() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((p) => [p.type, p.value]));
  return { date: `${parts.year}-${parts.month}-${parts.day}`, hour: Number(parts.hour) };
}
export function addDays(date, n) {
  const [y, m, d] = date.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return t.toISOString().slice(0, 10);
}
export const weekday = (date) => { const [y, m, d] = date.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay() || 7; };
const validDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);
const validHour = (h) => Number.isInteger(h) && HOURS.includes(h);
const slotScore = (date, hour) => Number(date.replace(/-/g, '')) * 100 + hour;

export async function getTemplate() {
  const v = await cmd('GET', 'cal:tpl');
  return v ? JSON.parse(v) : DEFAULT_TEMPLATE;
}
export async function setTemplate(tpl) {
  const clean = {};
  for (let d = 1; d <= 7; d += 1) clean[d] = [...new Set((tpl[d] || []).map(Number).filter(validHour))].sort((a, b) => a - b);
  await cmd('SET', 'cal:tpl', JSON.stringify(clean));
  return clean;
}
async function getOverrides(dates) {
  if (!dates.length) return {};
  const fields = dates.flatMap((d) => HOURS.map((h) => `${d}:${h}`));
  const vals = await cmd('HMGET', 'cal:ovr', ...fields);
  const out = {};
  fields.forEach((f, i) => { if (vals[i]) out[f] = vals[i]; });
  return out;
}
async function getBookedMap(dates) {
  if (!dates.length) return {};
  const keys = dates.flatMap((d) => HOURS.map((h) => `slot:${d}:${h}`));
  const vals = await cmd('MGET', ...keys);
  const out = {};
  keys.forEach((k, i) => { if (vals[i]) out[k.slice(5)] = vals[i]; });
  return out;
}

/** Template + overrides → is this slot open (ignoring bookings and time)? */
function isOpen(tpl, ovr, date, hour) {
  const o = ovr[`${date}:${hour}`];
  if (o === 'open') return true;
  if (o === 'closed') return false;
  return (tpl[weekday(date)] || []).includes(hour);
}

/** Public availability for the next DAYS_AHEAD days. */
export async function availability() {
  const now = zurichNow();
  const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(now.date, i));
  const [tpl, ovr, booked] = await Promise.all([getTemplate(), getOverrides(dates), getBookedMap(dates)]);
  return dates.map((date, i) => ({
    date,
    hours: HOURS.filter((h) => isOpen(tpl, ovr, date, h) && !booked[`${date}:${h}`] && (i > 0 || h >= now.hour + MIN_NOTICE_H)),
  }));
}

export async function slotAvailable(date, hour) {
  if (!validDate(date) || !validHour(hour)) return false;
  const now = zurichNow();
  const last = addDays(now.date, DAYS_AHEAD - 1);
  if (date < now.date || date > last) return false;
  if (date === now.date && hour < now.hour + MIN_NOTICE_H) return false;
  const [tpl, ovr] = await Promise.all([getTemplate(), getOverrides([date])]);
  if (!isOpen(tpl, ovr, date, hour)) return false;
  return !(await cmd('GET', `slot:${date}:${hour}`));
}

/** Books a slot for a paid session. Returns { booking } or { error }. */
export async function book({ date, hour, sessionId, name, email, phone, lang, test }) {
  if (!storeReady()) return { error: 'no_store' };
  const existing = await cmd('GET', `bk:session:${sessionId}`);
  if (existing) { const b = await cmd('GET', `bk:${existing}`); return { booking: b ? JSON.parse(b) : null, already: true }; }
  if (!(await slotAvailable(date, hour))) return { error: 'taken' };
  const id = Date.now().toString(36) + crypto.randomBytes(3).toString('hex');
  const got = await cmd('SET', `slot:${date}:${hour}`, id, 'NX');
  if (got !== 'OK') return { error: 'taken' };
  const lock = await cmd('SET', `bk:session:${sessionId}`, id, 'NX');
  if (lock !== 'OK') { await cmd('DEL', `slot:${date}:${hour}`); return { error: 'already' }; }
  const booking = { id, date, hour, name: name || '', email: email || '', phone: phone || '', lang: lang || 'es', session: sessionId, test: Boolean(test), createdAt: new Date().toISOString() };
  await cmd('SET', `bk:${id}`, JSON.stringify(booking));
  await cmd('ZADD', 'bks', slotScore(date, hour), id);
  const [firstName, ...rest] = String(name || '').trim().split(/\s+/);
  try {
    await addLead({ kind: 'rdv', first: firstName || '', last: rest.join(' '), email: email || '', phone: phone || '', country: '', lang: lang || 'es', page: 'reserva', consent: true,
      message: `Rendez-vous le ${date.split('-').reverse().join('.')} à ${hour}h00${test ? ' (TEST admin)' : ''}`, booking: id });
  } catch { /* the agenda still has it */ }
  return { booking };
}

export async function bookingForSession(sessionId) {
  const id = await cmd('GET', `bk:session:${sessionId}`);
  if (!id) return null;
  const b = await cmd('GET', `bk:${id}`);
  return b ? JSON.parse(b) : null;
}

/** Admin: everything needed to draw a week grid. */
export async function adminWeek(startDate) {
  const dates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  const [tpl, ovr, booked] = await Promise.all([getTemplate(), getOverrides(dates), getBookedMap(dates)]);
  const ids = [...new Set(Object.values(booked))];
  const bookings = {};
  if (ids.length) {
    const vals = await cmd('MGET', ...ids.map((i) => `bk:${i}`));
    vals.forEach((v) => { if (v) { const b = JSON.parse(v); bookings[`${b.date}:${b.hour}`] = b; } });
  }
  const cells = {};
  for (const d of dates) for (const h of HOURS) cells[`${d}:${h}`] = bookings[`${d}:${h}`] ? 'booked' : isOpen(tpl, ovr, d, h) ? 'open' : 'closed';
  return { dates, hours: HOURS, cells, bookings, template: tpl, today: zurichNow() };
}

export async function toggleSlot(date, hour) {
  if (!validDate(date) || !validHour(hour)) return null;
  if (await cmd('GET', `slot:${date}:${hour}`)) return 'booked';
  const [tpl, ovr] = await Promise.all([getTemplate(), getOverrides([date])]);
  const next = isOpen(tpl, ovr, date, hour) ? 'closed' : 'open';
  const base = (tpl[weekday(date)] || []).includes(hour) ? 'open' : 'closed';
  if (next === base) await cmd('HDEL', 'cal:ovr', `${date}:${hour}`);
  else await cmd('HSET', 'cal:ovr', `${date}:${hour}`, next);
  return next;
}

export async function cancelBooking(id) {
  const v = await cmd('GET', `bk:${id}`);
  if (!v) return false;
  const b = JSON.parse(v);
  await cmd('DEL', `slot:${b.date}:${b.hour}`);
  await cmd('DEL', `bk:${id}`);
  await cmd('ZREM', 'bks', id);
  if (b.session) await cmd('DEL', `bk:session:${b.session}`);
  return true;
}

export async function upcoming(limit = 50) {
  const now = zurichNow();
  const ids = await cmd('ZRANGEBYSCORE', 'bks', slotScore(now.date, 0), '+inf', 'LIMIT', 0, limit);
  if (!ids.length) return [];
  const vals = await cmd('MGET', ...ids.map((i) => `bk:${i}`));
  return vals.filter(Boolean).map((v) => JSON.parse(v));
}

/** All bookings (most recent slot first). */
export async function listBookings(limit = 500) {
  const ids = await cmd('ZREVRANGE', 'bks', 0, limit - 1);
  if (!ids || !ids.length) return [];
  const vals = await cmd('MGET', ...ids.map((i) => `bk:${i}`));
  return vals.filter(Boolean).map((v) => JSON.parse(v));
}
