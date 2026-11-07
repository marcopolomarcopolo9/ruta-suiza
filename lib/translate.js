// French → Spanish machine translation for the live headlines. No API key needed:
// 1) DeepL if DEEPL_API_KEY is set, 2) MyMemory (free public API), 3) Google Translate web endpoint.
// Each headline is its own GET/POST cached 7 days by Next's data cache, so it is translated once. Server-only.
const KEY = process.env.DEEPL_API_KEY || '';
const DEEPL = KEY.endsWith(':fx') ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate';
const CACHE = { revalidate: 7 * 86400, tags: ['translate'] };

export const canTranslate = () => true;

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s) => String(s || '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') { const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)); return Number.isFinite(n) ? String.fromCodePoint(n) : m; }
  return ENT[e.toLowerCase()] ?? m;
});
const ok = (src, out) => {
  const t = decode(out).trim();
  if (!t || /MYMEMORY WARNING|QUERY LENGTH LIMIT|INVALID|PLEASE SELECT/i.test(t)) throw new Error('bad translation');
  if (t.toLowerCase() === src.toLowerCase() && /[a-zà-ÿ]{4}/i.test(src)) throw new Error('untranslated');
  return t;
};

async function deepl(text, target) {
  const r = await fetch(DEEPL, {
    method: 'POST',
    headers: { Authorization: `DeepL-Auth-Key ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: [text], source_lang: 'FR', target_lang: target.toUpperCase() }),
    next: CACHE, signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`deepl ${r.status}`);
  return ok(text, (await r.json())?.translations?.[0]?.text);
}

async function mymemory(text, target) {
  const u = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|${target.toLowerCase()}`;
  const r = await fetch(u, { next: CACHE, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error(`mymemory ${r.status}`);
  const j = await r.json();
  if (Number(j?.responseStatus) !== 200) throw new Error(`mymemory ${j?.responseStatus}`);
  return ok(text, j?.responseData?.translatedText);
}

async function google(text, target) {
  const u = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=${target.toLowerCase()}&dt=t&q=${encodeURIComponent(text)}`;
  const r = await fetch(u, { next: CACHE, signal: AbortSignal.timeout(8000), headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!r.ok) throw new Error(`google ${r.status}`);
  const j = await r.json();
  return ok(text, (j?.[0] || []).map((p) => p?.[0] || '').join(''));
}

export async function translateOne(text, target = 'ES') {
  const chain = [...(KEY ? [deepl] : []), mymemory, google];
  let err;
  for (const fn of chain) {
    try { return await fn(text, target); } catch (e) { err = e; }
  }
  throw err;
}

/** Translates each text; an entry stays null if every service failed for it. */
export async function translateAll(texts, target = 'ES') {
  if (!texts.length) return [];
  const res = await Promise.allSettled(texts.map((t) => translateOne(t, target)));
  return res.map((r) => (r.status === 'fulfilled' ? r.value : null));
}
