// Real testimonials, added by the admin in the CMS. Shown on the home and Club pages only when published.
import crypto from 'crypto';
import { storeReady, cmd, redis } from './redis';

export const TESTI_TAG = 'testimonials';
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max);
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function listTestimonials({ all = false } = {}) {
  if (!storeReady()) return [];
  try {
    const flat = all ? await cmd('HGETALL', 'testimonials') : await redis(['HGETALL', 'testimonials'], { tags: [TESTI_TAG], revalidate: 3600 });
    const vals = Array.isArray(flat) ? flat.filter((_, i) => i % 2 === 1) : Object.values(flat || {});
    return vals.map((v) => JSON.parse(v)).filter((x) => all || x.published).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  } catch { return []; }
}
export async function saveTestimonial(b) {
  const id = b.id && /^[a-z0-9]+$/.test(b.id) ? b.id : Date.now().toString(36) + crypto.randomBytes(2).toString('hex');
  const t = { id, name: esc(clean(b.name, 40)), country: esc(clean(b.country, 40)), text: [esc(clean(b.text_es, 500)), esc(clean(b.text_fr, 500))], service: ['club', 'asesoria', 'carta'].includes(b.service) ? b.service : 'club', published: Boolean(b.published), createdAt: b.createdAt || new Date().toISOString() };
  if (!t.name || !(t.text[0] || t.text[1])) throw new Error('fields');
  if (!t.text[0]) t.text[0] = t.text[1]; if (!t.text[1]) t.text[1] = t.text[0];
  await cmd('HSET', 'testimonials', id, JSON.stringify(t));
  return t;
}
export async function deleteTestimonial(id) { await cmd('HDEL', 'testimonials', String(id)); }
