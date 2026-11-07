// Privacy-friendly visit statistics: no cookies, no stored IP. A visitor is counted through a
// one-way hash of (daily salt + IP + browser) that changes every day, so nobody can be tracked
// over time and no consent banner is needed. Data is kept 400 days. Server-only.
import crypto from 'crypto';
import { storeReady, pipeline } from './redis';

const TTL = 400 * 86400;
const SALT = process.env.ANALYTICS_SALT || process.env.ADMIN_PASSWORD || 'ruta-suiza';
const day = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich' }).format(d); // YYYY-MM-DD
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|pingdom|uptime|curl|wget|python|axios/i;

const SOURCES = [
  [/instagram/, 'instagram'], [/tiktok/, 'tiktok'], [/(^|\.)google\./, 'google'], [/facebook|fb\.com|fb\.me/, 'facebook'],
  [/whatsapp|wa\.me/, 'whatsapp'], [/youtube|youtu\.be/, 'youtube'], [/bing\./, 'bing'], [/(^|\.)t\.co$|twitter|x\.com/, 'x'],
  [/linkedin/, 'linkedin'], [/duckduckgo/, 'duckduckgo'], [/chatgpt|openai|perplexity|claude\.ai|gemini/, 'ia'],
];
export function sourceOf(utm, referrer, host) {
  const u = String(utm || '').toLowerCase().trim();
  if (u) { for (const [re, name] of SOURCES) if (re.test(u)) return name; return u.replace(/[^a-z0-9._-]/g, '').slice(0, 30) || 'direct'; }
  let h = '';
  try { h = new URL(referrer).hostname.replace(/^www\./, ''); } catch { return 'direct'; }
  if (!h || (host && h === String(host).replace(/^www\./, ''))) return 'direct';
  for (const [re, name] of SOURCES) if (re.test(h)) return name;
  return h.slice(0, 40);
}

export async function trackHit({ path, referrer, utm, newVisit }, req) {
  if (!storeReady()) return;
  const ua = req.headers.get('user-agent') || '';
  if (!ua || BOT.test(ua)) return;
  const d = day();
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  const visitor = crypto.createHash('sha256').update(`${SALT}|${d}|${ip}|${ua}`).digest('hex').slice(0, 16);
  const p = String(path || '/').split('?')[0].slice(0, 120);
  if (p.startsWith('/admin') || p.startsWith('/api')) return;
  const k = (name) => `st:${d}:${name}`;
  const cmds = [['INCR', k('pv')], ['EXPIRE', k('pv'), TTL], ['PFADD', k('uv'), visitor], ['EXPIRE', k('uv'), TTL], ['HINCRBY', k('page'), p, 1], ['EXPIRE', k('page'), TTL]];
  if (newVisit) {
    const country = (req.headers.get('x-vercel-ip-country') || '').toUpperCase().slice(0, 2) || '??';
    let city = '';
    try { city = decodeURIComponent(req.headers.get('x-vercel-ip-city') || ''); } catch { city = ''; }
    const device = /mobile|iphone|android(?!.*tablet)/i.test(ua) ? 'mobile' : /ipad|tablet/i.test(ua) ? 'tablette' : 'ordinateur';
    const src = sourceOf(utm, referrer, req.headers.get('host'));
    cmds.push(['INCR', k('visits')], ['EXPIRE', k('visits'), TTL],
      ['HINCRBY', k('src'), src, 1], ['EXPIRE', k('src'), TTL],
      ['HINCRBY', k('country'), country, 1], ['EXPIRE', k('country'), TTL],
      ['HINCRBY', k('dev'), device, 1], ['EXPIRE', k('dev'), TTL]);
    if (city) cmds.push(['HINCRBY', k('city'), `${city.slice(0, 40)}|${country}`, 1], ['EXPIRE', k('city'), TTL]);
  }
  await pipeline(cmds);
}

const toObj = (flat) => { const o = {}; if (Array.isArray(flat)) for (let i = 0; i < flat.length; i += 2) o[flat[i]] = Number(flat[i + 1]); else if (flat && typeof flat === 'object') for (const [a, b] of Object.entries(flat)) o[a] = Number(b); return o; };
const add = (acc, o) => { for (const [a, b] of Object.entries(o)) acc[a] = (acc[a] || 0) + b; return acc; };
const top = (o, n = 12) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);

/** Aggregates the last `days` days (today included). */
export async function getStats(days = 30) {
  if (!storeReady()) return null;
  const dates = Array.from({ length: days }, (_, i) => day(new Date(Date.now() - (days - 1 - i) * 86400000)));
  const names = ['pv', 'visits', 'src', 'country', 'city', 'page', 'dev'];
  const cmds = [];
  for (const d of dates) {
    cmds.push(['GET', `st:${d}:pv`], ['GET', `st:${d}:visits`], ['PFCOUNT', `st:${d}:uv`]);
    for (const nm of names.slice(2)) cmds.push(['HGETALL', `st:${d}:${nm}`]);
  }
  cmds.push(['PFCOUNT', ...dates.map((d) => `st:${d}:uv`)]); // unique visitors over the whole period (per-day hash)
  const res = await pipeline(cmds);
  const per = 3 + names.length - 2;
  const series = []; const agg = { src: {}, country: {}, city: {}, page: {}, dev: {} };
  dates.forEach((d, i) => {
    const r = res.slice(i * per, (i + 1) * per);
    series.push({ date: d, pv: Number(r[0] || 0), visits: Number(r[1] || 0), uv: Number(r[2] || 0) });
    names.slice(2).forEach((nm, j) => add(agg[nm], toObj(r[3 + j])));
  });
  const sum = (key) => series.reduce((s, x) => s + x[key], 0);
  return {
    days, series,
    totals: { pv: sum('pv'), visits: sum('visits'), uv: sum('uv') },
    sources: top(agg.src), countries: top(agg.country), cities: top(agg.city), pages: top(agg.page, 15), devices: top(agg.dev, 3),
  };
}
