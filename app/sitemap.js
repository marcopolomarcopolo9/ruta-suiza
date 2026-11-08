import { allPaths, site } from '../lib/render';
import { SITE_URL } from '../lib/links';
import { listCmsNews } from '../lib/newsStore';

export const revalidate = 3600;
export default async function sitemap() {
  const now = new Date();
  const cmsList = await listCmsNews();
  const cms = cmsList.flatMap((n) => [`/es/noticias/${n.id}`, `/fr/noticias/${n.id}`]);
  // real modification dates: posts and news use their own date, the rest the last content review
  const SITE_DATE = new Date('2026-11-08T08:00:00Z');
  const postDate = Object.fromEntries(site.POSTS.map((x) => [x.slug, new Date(`${x.date}T08:00:00Z`)]));
  const newsDate = Object.fromEntries([...site.NEWS, ...cmsList].map((n) => [n.id, n.updatedAt ? new Date(n.updatedAt) : new Date(String(n.date).split('.').reverse().join('-') + 'T08:00:00Z')]));
  const dateOf = (p) => {
    const m = p.match(/\/(blog|noticias)\/([^/]+)$/);
    const d = m ? (m[1] === 'blog' ? postDate[m[2]] : newsDate[m[2]]) : null;
    if (d && !Number.isNaN(d.getTime())) return d;
    if (/\/noticias$/.test(p)) return now;
    return SITE_DATE;
  };
  return [...allPaths(), ...cms].map((p) => {
    const rest = p.replace(/^\/(es|fr)/, '');
    return {
      url: `${SITE_URL}${p}`,
      lastModified: dateOf(p),
      changeFrequency: p.includes('noticias') ? 'daily' : 'weekly',
      priority: rest === '' ? 1 : rest.split('/').length === 2 ? 0.8 : 0.6,
      alternates: { languages: { es: `${SITE_URL}/es${rest}`, fr: `${SITE_URL}/fr${rest}` } },
    };
  });
}
