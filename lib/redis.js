// Single Upstash Redis REST client (no SDK). Server-only.
// Vercel → Storage → Upstash Redis sets KV_REST_API_URL / KV_REST_API_TOKEN.
const BASE = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const storeReady = () => Boolean(BASE && TOKEN);

/**
 * Runs one Redis command. By default never cached; pass { tags, revalidate } to let
 * Next.js cache a read (used by public pages that are regenerated on demand).
 */
export async function redis(args, { tags, revalidate } = {}) {
  const r = await fetch(BASE, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args.map(String)),
    ...(tags ? { next: { tags, revalidate: revalidate ?? 300 } } : { cache: 'no-store' }),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || `redis ${r.status}`);
  return j.result;
}

/** Shortcut: cmd('GET', 'key') */
export const cmd = (...args) => redis(args);

/** Runs several commands in one HTTP request (Upstash pipeline). Returns the results in order. */
export async function pipeline(cmds) {
  if (!cmds.length) return [];
  const r = await fetch(`${BASE}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds.map((c) => c.map(String))),
    cache: 'no-store',
  });
  const j = await r.json();
  if (!r.ok || !Array.isArray(j)) throw new Error(`redis pipeline ${r.status}`);
  return j.map((x) => x.result);
}
