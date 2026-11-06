// Internal booking calendar (30-minute slots, Europe/Zurich), stored in Upstash Redis.
// Weekly template + per-slot overrides + bookings. Server-only.
// A slot is identified by its date (YYYY-MM-DD) and its start time in minutes after midnight (e.g. 1050 = 17:30).
import crypto from 'crypto';
import { addLead } from './store';
import { notifyAdmin, bookingEmail } from './mail';
import { storeReady, cmd } from './redis';

export const SLOT_MIN = 30;
export const SLOTS = Array.from({ length: 30 }, (_, i) => 7 * 60 + i * SLOT_MIN); // 07:00 → 21:30
export const DAYS_AHEAD = 14;
const MIN_NOTICE_MIN = 3 * 60; // no booking less than 3 hours ahead
const range = (from, to) => SLOTS.filter((m) => m >= from * 60 && m < to * 60);
// Default: weekdays 17:00–20:00, weekends 09:00–20:00
export const DEFAULT_TEMPLATE = { 1: range(17, 20), 2: range(17, 20), 3: range(17, 20), 4: range(17, 20), 5: range(17, 20), 6: range(9, 20), 7: range(9, 20) };
export const fmtMin = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

/** Current date and time (minutes) in Zurich. */
export function zurichNow() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date()).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, min: Number(p.hour) * 60 + Number(p.minute), hour: Number(p.hour) };
}
export function addDays(date, n) {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}
export const weekday = (date) => { const [y, m, d] = date.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).getUTCDay() || 7; };
const validDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);
const validMin = (m) => Number.isInteger(m) && SLOTS.includes(m);
const slotScore = (date, min) => Number(date.replace(/-/g, '')) * 10000 + min;

// v2 keys (30-minute slots)
const K = { tpl: 'cal2:tpl', ovr: 'cal2:ovr', slot: (d, m) => `slot2:${d}:${m}` };

export async function getTemplate() {
  const v = await cmd('GET', K.tpl);
  return v ? JSON.parse(v) : DEFAULT_TEMPLATE;
}
export async function setTemplate(tpl) {
  const clean = {};
  for (let d = 1; d <= 7; d += 1) clean[d] = [...new Set((tpl[d] || []).map(Number).filter(validMin))].sort((a, b) => a - b);
  await cmd('SET', K.tpl, JSON.stringify(clean));
  return clean;
}
async function getOverrides(dates) {
  if (!dates.length) return {};
  const fields = dates.flatMap((d) => SLOTS.map((m) => `${d}:${m}`));
  const vals = await cmd('HMGET', K.ovr, ...fields);
  const out = {};
  fields.forEach((f, i) => { if (vals[i]) out[f] = vals[i]; });
  return out;
}
async function getBookedMap(dates) {
  if (!dates.length) return {};
  const keys = dates.flatMap((d) => SLOTS.map((m) => K.slot(d, m)));
  const vals = await cmd('MGET', ...keys);
  const out = {};
  keys.forEach((k, i) => { if (vals[i]) out[k.slice(6)] = vals[i]; });
  return out;
}
function isOpen(tpl, ovr, date, min) {
  const o = ovr[`${date}:${min}`];
  if (o === 'open') return true;
  if (o === 'closed') return false;
  return (tpl[weekday(date)] || []).includes(min);
}

/** Public availability for the next DAYS_AHEAD days: [{ date, slots: [minutes] }]. */
export async function availability() {
  const now = zurichNow();
  const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(now.date, i));
  const [tpl, ovr, booked] = await Promise.all([getTemplate(), getOverrides(dates), getBookedMap(dates)]);
  return dates.map((date, i) => ({
    date,
    slots: SLOTS.filter((m) => isOpen(tpl, ovr, date, m) && !booked[`${date}:${m}`] && (i > 0 || m >= now.min + MIN_NOTICE_MIN)),
  }));
}

export async function slotAvailable(date, min) {
  if (!validDate(date) || !validMin(min)) return false;
  const now = zurichNow();
  if (date < now.date || date > addDays(now.date, DAYS_AHEAD - 1)) return false;
  if (date === now.date && min < now.min + MIN_NOTICE_MIN) return false;
  const [tpl, ovr] = await Promise.all([getTemplate(), getOverrides([date])]);
  if (!isOpen(tpl, ovr, date, min)) return false;
  return !(await cmd('GET', K.slot(date, min)));
}

/** Books a slot for a paid session. Returns { booking } or { error }. */
export async function book({ date, min, sessionId, name, email, phone, lang, tz, test }) {
  if (!storeReady()) return { error: 'no_store' };
  const existing = await cmd('GET', `bk:session:${sessionId}`);
  if (existing) { const b = await cmd('GET', `bk:${existing}`); return { booking: b ? JSON.parse(b) : null, already: true }; }
  if (!(await slotAvailable(date, min))) return { error: 'taken' };
  const id = Date.now().toString(36) + crypto.randomBytes(3).toString('hex');
  if ((await cmd('SET', K.slot(date, min), id, 'NX')) !== 'OK') return { error: 'taken' };
  if ((await cmd('SET', `bk:session:${sessionId}`, id, 'NX')) !== 'OK') { await cmd('DEL', K.slot(date, min)); return { error: 'already' }; }
  const safeTz = /^[A-Za-z_]+(\/[A-Za-z_+\-0-9]+){0,2}$/.test(tz || '') ? tz : '';
  const booking = { id, date, min, duration: SLOT_MIN, name: name || '', email: email || '', phone: phone || '', lang: lang || 'es', tz: safeTz, session: sessionId, test: Boolean(test), createdAt: new Date().toISOString() };
  await cmd('SET', `bk:${id}`, JSON.stringify(booking));
  await cmd('ZADD', 'bks', slotScore(date, min), id);
  const [firstName, ...rest] = String(name || '').trim().split(/\s+/);
  let rdvLead = null;
  try {
    rdvLead = await addLead({ kind: 'rdv', first: firstName || '', last: rest.join(' '), email: email || '', phone: phone || '', country: '', lang: lang || 'es', page: 'reserva', consent: true,
      message: `Rendez-vous le ${date.split('-').reverse().join('.')} à ${fmtMin(min)} (heure suisse)${safeTz && safeTz !== 'Europe/Zurich' ? ` · client à ${safeTz.split('/').pop().replace(/_/g, ' ')}` : ''}${test ? ' (TEST admin)' : ''}`, booking: id });
  } catch { /* the agenda still has it */ }
  if (!test) {
    try { if (rdvLead) await notifyAdmin(rdvLead); await bookingEmail(booking); } catch (e) { console.error('booking e-mail failed', e.message); }
  }
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
    vals.forEach((v) => { if (v) { const b = JSON.parse(v); bookings[`${b.date}:${b.min}`] = b; } });
  }
  const cells = {};
  for (const d of dates) for (const m of SLOTS) cells[`${d}:${m}`] = bookings[`${d}:${m}`] ? 'booked' : isOpen(tpl, ovr, d, m) ? 'open' : 'closed';
  return { dates, slots: SLOTS, cells, bookings, template: tpl, today: zurichNow() };
}

export async function toggleSlot(date, min) {
  if (!validDate(date) || !validMin(min)) return null;
  if (await cmd('GET', K.slot(date, min))) return 'booked';
  const [tpl, ovr] = await Promise.all([getTemplate(), getOverrides([date])]);
  const next = isOpen(tpl, ovr, date, min) ? 'closed' : 'open';
  const base = (tpl[weekday(date)] || []).includes(min) ? 'open' : 'closed';
  if (next === base) await cmd('HDEL', K.ovr, `${date}:${min}`);
  else await cmd('HSET', K.ovr, `${date}:${min}`, next);
  return next;
}

export async function cancelBooking(id) {
  const v = await cmd('GET', `bk:${id}`);
  if (!v) return false;
  const b = JSON.parse(v);
  if (b.min !== undefined) await cmd('DEL', K.slot(b.date, b.min));
  else if (b.hour !== undefined) await cmd('DEL', `slot:${b.date}:${b.hour}`); // legacy 1-hour booking
  await cmd('DEL', `bk:${id}`);
  await cmd('ZREM', 'bks', id);
  if (b.session) await cmd('DEL', `bk:session:${b.session}`);
  return true;
}

/** All bookings (most recent slot first). Legacy 1-hour bookings get a `min` field. */
export async function listBookings(limit = 500) {
  const ids = await cmd('ZREVRANGE', 'bks', 0, limit - 1);
  if (!ids || !ids.length) return [];
  const vals = await cmd('MGET', ...ids.map((i) => `bk:${i}`));
  return vals.filter(Boolean).map((v) => { const b = JSON.parse(v); if (b.min === undefined && b.hour !== undefined) b.min = b.hour * 60; return b; });
}

/** Bookings of a given day (for the day-before reminder). */
export async function bookingsOn(date) {
  const lo = Number(date.replace(/-/g, '')) * 10000;
  const ids = await cmd('ZRANGEBYSCORE', 'bks', lo, lo + 9999);
  if (!ids.length) return [];
  const vals = await cmd('MGET', ...ids.map((i) => `bk:${i}`));
  return vals.filter(Boolean).map((v) => JSON.parse(v)).filter((b) => b.min !== undefined && !b.test);
}
