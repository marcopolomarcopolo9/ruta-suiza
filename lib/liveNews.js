// "Al minuto": latest Swiss headlines pulled automatically from public RSS feeds.
// Fetched on the server and cached 30 min, so the news page refreshes many times a day
// without anyone publishing in the CMS. Server-only.
import { logError } from './errors';
import { translateAll } from './translate';

export const LIVE_TAG = 'live-news';
const REVALIDATE = 1800; // 30 min

const gnews = (q, hl, gl, ceid) => `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${hl}&gl=${gl}&ceid=${ceid}`;

// Only the "Suisse" sections of 20 minutes and watson (French editions). For each source the
// direct RSS feeds are tried first; Google News restricted to that section is the fallback.
export const SOURCES = [
  { name: '20 minutes', home: 'https://www.20min.ch/fr/suisse', feeds: [
    'https://partner-feeds.20min.ch/rss/20minutes/suisse',
    'https://partner-feeds.20min.ch/rss/20minutes/suisse-romande',
  ], google: 'site:20min.ch/fr/suisse when:2d' },
  { name: 'watson', home: 'https://www.watson.ch/fr/suisse', linkMust: '/fr/', feeds: [
    'https://www.watson.ch/fr/api/2.0/rss/index.xml?tag=Suisse',
    'https://www.watson.ch/api/2.0/rss/index.xml?tag=Suisse',
  ], google: 'site:watson.ch/fr/suisse when:2d' },
];

// sport / celebrity noise we do not want for people preparing their move
const NOISE = /f[uú]tbol|football|tenis|tennis|hockey|nati\b|champions|eurocopa|mundial|ski alpin|esquí|f1\b|horóscopo|horoscope/i;

const CATS = [
  ['inmigracion', /inmigra|migra|asilo|refugiad|permiso|extranjer|nacionalidad|naturaliz|asile|réfugi|permis|étranger|frontalier|schengen|visa/i],
  ['politica', /votaci|refer[eé]ndum|iniciativa popular|elecci|parlamento|consejo federal|votation|initiative|élection|parlement|conseil fédéral|conseil d'état|grand conseil/i],
  ['salud', /salud|seguro (de )?enfermedad|prima|hospital|m[eé]dic|santé|assurance.maladie|lamal|primes|hôpital|pharma|virus|grippe|gripe/i],
  ['vivienda', /alquiler|vivienda|inmobili|loyer|logement|immobili|hypoth|hipotec/i],
  ['trabajo', /trabajo|empleo|paro|despido|salario|sindicat|huelga|emploi|chômage|travail|salaire|licenci|grève|syndicat|entreprise|empresa/i],
  ['transporte', /tren|m[ée]tro|bus |ferrocarril|aeropuerto|tráfico|carretera|vuelo|train|cff|sbb|aéroport|trafic|autoroute|vol |tl |tpg/i],
  ['dinero', /impuesto|precio|franco|banco|bns|inflaci|econom|pensi[oó]n|avs|impôt|prix|franc|banque|bns|inflation|économ|retraite|budget|presupuesto/i],
];
const CAT_IMG = { politica: ['votacion'], inmigracion: ['integracion'], salud: ['primas', 'vacunas'], vivienda: ['alquiler'], trabajo: ['paro'], transporte: ['cff', 'noviembre'], dinero: ['integracion', 'votacion'], general: ['alquiler', 'votacion', 'cff', 'integracion'] };
const EMERG = /accident|incendi|polic|muert|mort|herid|bless|ambulanc|secours|rescate|sauvetage/i;

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s) => String(s || '')
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') { const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)); return Number.isFinite(n) ? String.fromCodePoint(n) : m; }
    return ENT[e.toLowerCase()] ?? m;
  });
const strip = (s) => decode(decode(s)).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const tag = (xml, name) => { const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i')); return m ? m[1] : ''; };
const attr = (xml, re) => { const m = xml.match(re); return m ? decode(m[1]) : ''; };
const safeUrl = (u) => (/^https?:\/\/[^\s"'<>]+$/.test(u) ? u : '');
const hash = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim().slice(0, 70);

export function parseFeed(xml, feed) {
  const items = [];
  for (const m of String(xml).matchAll(/<item[\s>][\s\S]*?<\/item>/gi)) {
    const it = m[0];
    let title = strip(tag(it, 'title'));
    let source = strip(tag(it, 'source')) || feed.name || '';
    // Google News titles end with " - Source"
    if (feed.name && title.toLowerCase().endsWith(` - ${feed.name.toLowerCase()}`)) title = title.slice(0, -(feed.name.length + 3)).trim();
    if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3)).trim();
    const link = safeUrl(strip(tag(it, 'link')) || attr(it, /<guid[^>]*>(https?:[^<]+)<\/guid>/i));
    const date = new Date(strip(tag(it, 'pubDate')) || strip(tag(it, 'dc:date')));
    let desc = strip(tag(it, 'description'));
    if (desc.startsWith(title)) desc = desc.slice(title.length).trim();
    if (/^(https?:|google news)/i.test(desc) || desc.length < 30) desc = '';
    if (source && desc.endsWith(source)) desc = desc.slice(0, -source.length).trim();
    const img = safeUrl(attr(it, /<media:(?:content|thumbnail)[^>]*url="([^"]+)"/i) || attr(it, /<enclosure[^>]*url="([^"]+)"[^>]*type="image/i) || attr(it, /<enclosure[^>]*type="image[^"]*"[^>]*url="([^"]+)"/i) || attr(decode(tag(it, 'description')), /<img[^>]*src="([^"]+)"/i));
    if (!title || !link || Number.isNaN(date.getTime())) continue;
    items.push({ title, link, date, desc: desc.slice(0, 260), img: img.startsWith('https://') ? img : '', source });
  }
  return items;
}

function classify(text) {
  for (const [k, re] of CATS) if (re.test(text)) return k;
  return 'general';
}

async function fetchFeed(feed) {
  const r = await fetch(feed.url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RutaSuizaNews/1.0; +https://www.rutasuiza.com)', Accept: 'application/rss+xml, application/xml, text/xml' },
    next: { revalidate: REVALIDATE, tags: [LIVE_TAG] },
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`feed ${r.status}`);
  return parseFeed(await r.text(), feed);
}

async function fromSource(src) {
  let err;
  for (const url of src.feeds) {
    try {
      const v = (await fetchFeed({ url, name: src.name })).filter((x) => !src.linkMust || x.link.includes(src.linkMust));
      if (v.length >= 3) return v;
    } catch (e) { err = e; }
  }
  try { return await fetchFeed({ url: gnews(src.google, 'fr', 'CH', 'CH:fr'), name: src.name }); } catch (e) { throw err || e; }
}

/** Up to `max` recent Swiss headlines (20 minutes + watson), newest first. Never throws. */
export async function getLiveNews(lang, max = 14) {
  const res = await Promise.allSettled(SOURCES.map(fromSource));
  const now = Date.now();
  const seen = new Set();
  const out = [];
  res.forEach((r, i) => {
    if (r.status !== 'fulfilled') return;
    for (const x of r.value) {
      const text = `${x.title} ${x.desc}`;
      if (NOISE.test(text)) continue;
      const age = now - x.date.getTime();
      if (age > 3 * 864e5 || age < -36e5) continue;
      const key = norm(x.title);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      const cat = classify(text);
      const pics = EMERG.test(text) ? ['centrale'] : CAT_IMG[cat];
      out.push({
        id: `live-${hash(x.link).toString(36)}`,
        t: esc(x.title), raw: x.title, s: esc(x.desc), url: x.link, src: esc(SOURCES[i].name),
        at: x.date.toISOString(), cat, imgUrl: x.img, img: pics[hash(x.title) % pics.length],
      });
    }
  });
  for (const [i, r] of res.entries()) if (r.status === 'rejected') await logError('live-news', r.reason, { url: SOURCES[i].name });
  const list = out.sort((a, b) => b.at.localeCompare(a.at)).slice(0, max);
  if (lang === 'es' && list.length) {
    const tr = await translateAll(list.map((n) => n.raw));
    const failed = tr.filter((x) => !x).length;
    tr.forEach((x, i) => { if (x) { list[i].t = esc(x); list[i].tr = true; } });
    if (failed) await logError('translate', new Error(`${failed} titre(s) non traduit(s)`));
  }
  list.forEach((n) => { delete n.raw; });
  return list;
}
