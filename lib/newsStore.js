// News written in the CMS (Upstash Redis). Merged with lib/news.js on the site. Server-only.
import crypto from 'crypto';
import { storeReady } from './store';
import { NCAT, NEWS_IMG } from './news';

const BASE = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
export const NEWS_TAG = 'cms-news';
// reads are cached (tag NEWS_TAG, refreshed on publish or every 5 min); writes are never cached
async function cmd(...args) {
  const read = ['HGETALL', 'HGET'].includes(args[0]);
  const r = await fetch(BASE, { method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(args.map(String)), ...(read ? { next: { revalidate: 300, tags: [NEWS_TAG] } } : { cache: 'no-store' }) });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || `redis ${r.status}`);
  return j.result;
}

export async function listCmsNews() {
  if (!storeReady()) return [];
  try {
    const flat = await cmd('HGETALL', 'news:items');
    const vals = Array.isArray(flat) ? flat.filter((_, i) => i % 2 === 1) : Object.values(flat || {});
    return vals.map((v) => JSON.parse(v)).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  } catch { return []; }
}

const str = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000b-\u001f]/g, '').trim().slice(0, max);
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pair = (v, max) => { const es = esc(str(v?.[0], max)); const fr = esc(str(v?.[1], max)); return [es, fr || es]; };
const slugify = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);

export async function saveCmsNews(input) {
  const t = pair(input.t, 160);
  if (!t[0]) throw new Error('title_required');
  const s = pair(input.s, 1500);
  if (!s[0]) throw new Error('summary_required');
  const existing = input.id ? await cmd('HGET', 'news:items', input.id) : null;
  const prev = existing ? JSON.parse(existing) : null;
  const id = prev ? prev.id : `${slugify(str(input.t?.[0], 160)) || 'noticia'}-${crypto.randomBytes(2).toString('hex')}`;
  const date = /^\d{2}\.\d{2}\.\d{4}$/.test(input.date) ? input.date : new Date().toLocaleDateString('fr-CH', { timeZone: 'Europe/Zurich', day: '2-digit', month: '2-digit', year: 'numeric' });
  const img = NEWS_IMG[input.img] ? input.img : '';
  const imgUrl = !img && /^https:\/\/[^\s"'<>]+$/.test(input.imgUrl || '') ? str(input.imgUrl, 500) : '';
  const item = {
    id, cms: true,
    cat: NCAT[input.cat] ? input.cat : 'inmigracion',
    k: pair(input.k, 40),
    t, s,
    you: pair(input.you, 800),
    date,
    top: Boolean(input.top),
    go: /^#[a-z0-9-]+$/.test(input.go || '') ? input.go : '',
    img, imgUrl, imgCredit: esc(str(input.imgCredit, 120)),
    src: (Array.isArray(input.src) ? input.src : []).map((x) => [esc(str(x?.[0], 60)), str(x?.[1], 500)]).filter((x) => x[0] && /^https?:\/\/[^\s"'<>]+$/.test(x[1])).slice(0, 5),
    createdAt: prev?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  if (!item.k[0]) item.k = NCAT[item.cat];
  if (!item.you[0]) item.you = ['', ''];
  if (item.top) {
    const all = await listCmsNews();
    for (const n of all) if (n.top && n.id !== id) { n.top = false; await cmd('HSET', 'news:items', n.id, JSON.stringify(n)); }
  }
  await cmd('HSET', 'news:items', id, JSON.stringify(item));
  return item;
}

export async function deleteCmsNews(id) {
  if (!storeReady()) return;
  await cmd('HDEL', 'news:items', id);
}
