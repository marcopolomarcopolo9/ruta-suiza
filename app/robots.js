import { SITE_URL } from '../lib/links';
export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/es/reserva', '/fr/reserva', '/es/club/bienvenida', '/fr/club/bienvenida', '/es/miembros', '/fr/miembros'] }], sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
