import { SITE_URL } from '../lib/links';
export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/es/reserva', '/fr/reserva'] }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
