import * as site from './site';
import { linkify, hrefFor, LANGS, SITE_URL } from './links';

const { T } = site;

const VIEWS = {
  inicio: () => site.vInicio(),
  ruta: () => site.vRuta(),
  paises: () => site.vPaises(),
  pais: (a) => site.vPais(a),
  guias: () => site.vGuias(),
  guia: (a) => site.vGuia(a),
  instalados: (a) => site.vInstalados(a),
  noticias: () => site.vNews(),
  noticia: (a) => site.vNoticia(a),
  precios: () => site.vPrecios(),
  club: () => site.vClub(),
  blog: () => site.vBlog(),
  post: (a) => site.vPost(a),
  vivir: () => site.vVivir(),
  legal: (a) => site.vLegal(a),
  herramientas: () => site.vHerramientas(),
  herramienta: (a) => site.vHerramienta(a),
};

/** Renders one view to HTML synchronously (the shared LANG never interleaves). */
export function renderView(lang, view, arg, extra) {
  site.setLang(lang);
  site.setExtraNews(extra || []);
  return linkify(VIEWS[view](arg), lang);
}

export function navItems(lang) {
  site.setLang(lang);
  return site.UI.nav.map(([k, l]) => ({ key: k, label: T(l), href: hrefFor(k, lang) }));
}

export function footerHTML(lang) {
  site.setLang(lang);
  const L = site.LEGAL;
  const a = (k, t) => `<a href="${hrefFor(k, lang)}">${t}</a>`;
  return `<div class="fcols"><div><div class="logo" style="font-size:20px">${PIN}<span class="wm">ruta<b>suiza</b></span></div><p>${T(['Servicio privado e independiente. No somos una autoridad. Información general, no asesoramiento jurídico.', 'Service privé et indépendant. Nous ne sommes pas une autorité. Information générale, pas un conseil juridique.'])}</p></div>
 <nav aria-label="${T(['Empresa', 'Entreprise'])}"><b>${T(['Empresa', 'Entreprise'])}</b>${a('nosotros', T(L.nosotros.t))}${a('contacto', T(L.contacto.t))}${a('precios', T(['Precios', 'Tarifs']))}</nav>
 <nav aria-label="${T(['Recursos', 'Ressources'])}"><b>${T(['Recursos', 'Ressources'])}</b>${a('vivir-en-suiza', T(['Vivir en Suiza', 'Vivre en Suisse']))}${a('herramientas', T(['Herramientas', 'Outils']))}${a('blog', 'Blog')}${a('noticias', 'Suiza News')}${a('guias', T(['Guías', 'Guides']))}${a('club', 'Club')}</nav>
 <nav aria-label="${T(['Legal', 'Légal'])}"><b>${T(['Legal', 'Légal'])}</b>${a('aviso-legal', T(L['aviso-legal'].t))}${a('privacidad', T(L.privacidad.t))}${a('condiciones', T(L.condiciones.t))}${a('cookies', T(L.cookies.t))}</nav></div>
 <div class="fbot"><span>© ${new Date().getFullYear()} Ruta Suiza</span><span>${T(['Tus datos no se venden', 'Tes données ne sont pas vendues'])}</span></div>`;
}

export const PIN = '<svg class="pin" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 C29 4 14 20 14 40 C14 64 50 96 50 96 C50 96 86 64 86 40 C86 20 71 4 50 4 Z" fill="#d52b1e"/><rect x="44" y="24" width="12" height="32" rx="1" fill="#fff"/><rect x="34" y="34" width="32" height="12" rx="1" fill="#fff"/></svg>';

/** Every route of the site, for static generation and the sitemap. */
export function allPaths() {
  const out = [];
  for (const lang of LANGS) {
    out.push(`/${lang}`);
    for (const s of ['ruta', 'paises', 'guias', 'instalados', 'noticias', 'precios', 'club', 'blog', 'vivir-en-suiza', 'herramientas']) out.push(`/${lang}/${s}`);
    site.TOOLS.forEach((t) => out.push(`/${lang}/herramientas/${t.k}`));
    site.ORDER.forEach((k) => out.push(`/${lang}/paises/${k}`));
    site.GORDER.forEach((k) => out.push(`/${lang}/guias/${k}`));
    site.TABS.forEach((t) => out.push(`/${lang}/instalados/${t.k}`));
    site.NEWS.forEach((n) => out.push(`/${lang}/noticias/${n.id}`));
    site.POSTS.forEach((p) => out.push(`/${lang}/blog/${p.slug}`));
    Object.keys(site.LEGAL).forEach((k) => out.push(`/${lang}/${k}`));
  }
  return out;
}

const strip = (s) => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

/** Title + description for a view, plus hreflang alternates. */
export function meta(lang, view, arg, path, extraNews) {
  site.setLang(lang);
  let title, description;
  switch (view) {
    case 'inicio':
      title = T(['Vivir en Suiza en español: permisos, trabajo y trámites · Ruta Suiza', 'Vivre en Suisse : permis, travail et démarches en espagnol · Ruta Suiza']);
      description = T(['Todo para vivir en Suiza en español: permisos, documentos, seguro médico, impuestos y cartas oficiales en la Suiza romanda, con personas reales que te ayudan.', 'Permis, documents, assurance maladie, impôts et courriers officiels en Suisse romande, expliqués en espagnol, avec de vraies personnes pour t\'aider.']);
      break;
    case 'ruta':
      title = T(['Calcula tu ruta a Suiza: permiso y documentos', 'Calcule ton parcours vers la Suisse : permis et documents']);
      description = T(['Elige tu país, tu motivo y tu cantón y ve gratis tus pasos, tu permiso y tus documentos.', 'Choisis ton pays, ton motif et ton canton et vois gratuitement tes étapes, ton permis et tes documents.']);
      break;
    case 'paises':
      title = T(['Documentos por país para vivir en Suiza', 'Documents par pays pour vivre en Suisse']);
      description = T(['Antecedentes penales, acta de nacimiento, apostilla y traducción para cada país.', 'Casier judiciaire, acte de naissance, apostille et traduction pour chaque pays.']);
      break;
    case 'pais': {
      const c = site.C[arg];
      title = T([`Documentos de ${T(c.n)} para Suiza`, `Documents de ${T(c.n)} pour la Suisse`]);
      description = strip(T(c.docs[0].what));
      break;
    }
    case 'guias':
      title = T(['Guías para vivir en Suiza, en español', 'Guides pour vivre en Suisse']);
      description = T(['Apostilla, visa D, comuna, seguro médico, permisos, impuestos y más.', 'Apostille, visa D, commune, assurance maladie, permis, impôts et plus.']);
      break;
    case 'guia':
      title = T(site.G[arg].t);
      description = T(site.G[arg].d);
      break;
    case 'instalados': {
      const t = site.TABS.find((x) => x.k === arg) || site.TABS[0];
      title = `${T(t.h)} · ${T(['Ya vivo en Suiza', 'Je vis déjà en Suisse'])}`;
      description = T(t.ess).join(' ');
      break;
    }
    case 'noticias':
      title = T(['Suiza News: la actualidad suiza explicada', 'Suiza News : l\'actualité suisse expliquée']);
      description = T(['Las noticias que cambian algo en tu vida en Suiza, resumidas en español.', 'Les actualités qui changent quelque chose dans ta vie en Suisse, résumées en espagnol.']);
      break;
    case 'noticia': {
      const n = (extraNews || []).find((x) => x.id === arg) || site.NEWS.find((x) => x.id === arg);
      title = strip(T(n.t));
      description = strip(T(n.s)).slice(0, 180);
      break;
    }
    case 'blog':
      title = T(['Blog: vivir en Suiza, consejos en español', 'Blog : vivre en Suisse, conseils pratiques']);
      description = T(['Consejos prácticos para vivir en Suiza: costo de vida, trabajo, permisos, seguro médico y trámites en la Suiza romanda.', 'Conseils pratiques pour vivre en Suisse : coût de la vie, travail, permis, assurance maladie et démarches en Suisse romande.']);
      break;
    case 'post': {
      const p = site.POSTS.find((x) => x.slug === arg);
      title = T(p.st || p.t); description = T(p.d);
      break;
    }
    case 'vivir':
      title = T(site.PILLAR.t); description = T(site.PILLAR.d);
      break;
    case 'club':
      title = T(['Club Ruta Suiza: tus cartas explicadas por una persona', 'Club Ruta Suiza : tes courriers expliqués par une personne']);
      description = T(['Club privado para hispanohablantes en Suiza romanda: cartas oficiales explicadas por una persona que trabaja en la administración suiza, grupo privado y eventos, por CHF 9.99 al mes.', 'Club privé pour hispanophones en Suisse romande : courriers officiels expliqués par une personne qui travaille dans l\'administration suisse, groupe privé et événements, pour CHF 9.99 par mois.']);
      break;
    case 'precios':
      title = T(['Precios y acompañamiento privado', 'Tarifs et accompagnement privé']);
      description = T(['Guías gratis y una persona real que te ayuda con tu expediente.', 'Guides gratuits et une vraie personne qui t\'aide avec ton dossier.']);
      break;
    case 'herramientas':
      title = T(['Herramientas gratis para vivir en Suiza: presupuesto, seguro, plazos', 'Outils gratuits pour vivre en Suisse : budget, assurance, délais']);
      description = T(['Calculadoras gratis con cifras oficiales: presupuesto en Ginebra y Lausana, franquicia LAMal, plazos al llegar y alquiler según tu salario.', 'Calculateurs gratuits avec chiffres officiels : budget à Genève et Lausanne, franchise LAMal, délais à l\'arrivée et loyer selon ton salaire.']);
      break;
    case 'herramienta': {
      const x = site.TOOLS.find((t) => t.k === arg);
      title = T(x.st); description = T(x.d);
      break;
    }
    case 'legal':
      title = T(site.LEGAL[arg].t);
      description = `${T(site.LEGAL[arg].t)} · Ruta Suiza`;
      break;
  }
  const rest = path.replace(/^\/(es|fr)/, '');
  return {
    title: title.includes('Ruta Suiza') ? { absolute: title } : title,
    description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: { es: `${SITE_URL}/es${rest}`, fr: `${SITE_URL}/fr${rest}`, 'x-default': `${SITE_URL}/es${rest}` },
    },
    openGraph: { title: strip(title), description, url: `${SITE_URL}${path}`, siteName: 'Ruta Suiza', locale: lang === 'es' ? 'es_ES' : 'fr_CH', type: 'website', images: ['/news/votacion.jpg'] },
    twitter: { card: 'summary_large_image' },
  };
}

export { site };
