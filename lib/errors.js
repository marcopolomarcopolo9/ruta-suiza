// Lightweight error log (last 100 errors) in Redis, shown in the CMS. Server-only.
import { storeReady, cmd } from './redis';

const clip = (v, n) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').slice(0, n);

export async function logError(source, err, extra = {}) {
  try {
    console.error(`[${source}]`, err?.message || err);
    if (!storeReady()) return;
    const entry = { at: new Date().toISOString(), source: clip(source, 40), message: clip(err?.message || err, 300), stack: clip(err?.stack, 800), url: clip(extra.url, 200), ua: clip(extra.ua, 160) };
    await cmd('LPUSH', 'errors', JSON.stringify(entry));
    await cmd('LTRIM', 'errors', 0, 99);
  } catch { /* never throw from the logger */ }
}

export async function listErrors() {
  if (!storeReady()) return [];
  try { return (await cmd('LRANGE', 'errors', 0, 99)).map((v) => JSON.parse(v)); } catch { return []; }
}
export async function clearErrors() { if (storeReady()) await cmd('DEL', 'errors'); }
