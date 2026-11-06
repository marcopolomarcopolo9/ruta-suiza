import { allPaths } from '../lib/render';
import { SITE_URL } from '../lib/links';
export default function sitemap() {
  const now = new Date();
  return allPaths().map((p) => {
    const rest = p.replace(/^\/(es|fr)/, '');
    return {
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: p.includes('noticias') ? 'daily' : 'weekly',
      priority: rest === '' ? 1 : rest.split('/').length === 2 ? 0.8 : 0.6,
      alternates: { languages: { es: `${SITE_URL}/es${rest}`, fr: `${SITE_URL}/fr${rest}` } },
    };
  });
}
