import { LEGAL } from './site';

export const LANGS = ['es', 'fr'];
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rutasuiza.com').replace(/\/$/, '');

const SECTIONS = ['ruta', 'paises', 'guias', 'instalados', 'noticias', 'precios', 'club', 'blog', 'vivir-en-suiza', 'herramientas'];

/** Maps a prototype hash key (e.g. "pais-co", "guia-visa", "instalados-seguro") to a real path. */
export function hrefFor(key, lang) {
  const L = `/${lang}`;
  if (!key || key === 'inicio') return L;
  if (SECTIONS.includes(key)) return `${L}/${key}`;
  if (key.startsWith('pais-')) return `${L}/paises/${key.slice(5)}`;
  if (key.startsWith('guia-')) return `${L}/guias/${key.slice(5)}`;
  if (key.startsWith('blog-')) return `${L}/blog/${key.slice(5)}`;
  if (key.startsWith('herramienta-')) return `${L}/herramientas/${key.slice(12)}`;
  if (key.startsWith('noticia-')) return `${L}/noticias/${key.slice(8)}`;
  if (key.startsWith('instalados-')) return `${L}/instalados/${key.slice(11)}`;
  if (LEGAL[key]) return `${L}/${key}`;
  return null; // in-page anchor: leave as is
}

/** Rewrites href="#key" links in an HTML string to real paths. */
export function linkify(html, lang) {
  return html.replace(/href="#([a-z0-9-]*)"/g, (m, key) => {
    const h = hrefFor(key, lang);
    return h ? `href="${h}"` : m;
  });
}

/** Same, on live DOM nodes (used after client-side re-renders). */
export function linkifyDom(root, lang) {
  root.querySelectorAll('a[href^="#"]').forEach((a) => {
    const h = hrefFor(a.getAttribute('href').slice(1), lang);
    if (h) a.setAttribute('href', h);
  });
}

/** Path of the same page in the other language. */
export function switchLangPath(pathname, to) {
  const parts = (pathname || '/').split('/');
  if (LANGS.includes(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join('/') || `/${to}`;
}
