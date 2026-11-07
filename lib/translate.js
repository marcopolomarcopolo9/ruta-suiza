// French → Spanish machine translation with DeepL (DEEPL_API_KEY in Vercel; free keys end in ":fx").
// Each text is its own request, cached 7 days by Next's data cache, so a headline is translated
// only once however often the page refreshes. Returns null when unavailable. Server-only.
const KEY = process.env.DEEPL_API_KEY || '';
const API = KEY.endsWith(':fx') ? 'https://api-free.deepl.com/v2/translate' : 'https://api.deepl.com/v2/translate';

export const canTranslate = () => Boolean(KEY);

async function one(text, target) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `DeepL-Auth-Key ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: [text], source_lang: 'FR', target_lang: target }),
    next: { revalidate: 7 * 86400, tags: ['translate'] },
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`deepl ${r.status}`);
  const j = await r.json();
  const out = j?.translations?.[0]?.text;
  if (!out) throw new Error('deepl empty');
  return out;
}

/** Translates each text; an entry stays null if its translation failed. */
export async function translateAll(texts, target = 'ES') {
  if (!KEY || !texts.length) return texts.map(() => null);
  const res = await Promise.allSettled(texts.map((t) => one(t, target)));
  return res.map((r) => (r.status === 'fulfilled' ? r.value : null));
}
