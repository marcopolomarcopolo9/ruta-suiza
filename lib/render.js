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
  precios: () => site.vPrecios(),
  legal: (a) => site.vLegal(a),
};

/** Renders one view to HTML synchronously (the shared LANG never interleaves). */
export function renderView(lang, view, arg) {
  site.setLang(lang);
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
 <nav aria-label="${T(['Legal', 'Légal'])}"><b>${T(['Legal', 'Légal'])}</b>${a('aviso-legal', T(L['aviso-legal'].t))}${a('privacidad', T(L.privacidad.t))}${a('condiciones', T(L.condiciones.t))}${a('cookies', T(L.cookies.t))}</nav></div>
 <div class="fbot"><span>© ${new Date().getFullYear()} Ruta Suiza</span><span>${T(['Tus datos no se venden', 'Tes données ne sont pas vendues'])}</span></div>`;
}

export const PIN = '<svg class="pin" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 4 C29 4 14 20 14 40 C14 64 50 96 50 96 C50 96 86 64 86 40 C86 20 71 4 50 4 Z" fill="#d52b1e"/><rect x="44" y="24" width="12" height="32" rx="1" fill="#fff"/><rect x="34" y="34" width="32" height="12" rx="1" fill="#fff"/></svg>';

/** Every route of the site, for static generation and the sitemap. */
export function allPaths() {
  const out = [];
  for (const lang of LANGS) {
    out.push(`/${lang}`);
    for (const s of ['ruta', 'paises', 'guias', 'instalados', 'noticias', 'precios']) out.push(`/${lang}/${s}`);
    site.ORDER.forEach((k) => out.push(`/${lang}/paises/${k}`));
    site.GORDER.forEach((k) => out.push(`/${lang}/guias/${k}`));
    site.TABS.forEach((t) => out.push(`/${lang}/instalados/${t.k}`));
    Object.keys(site.LEGAL).forEach((k) => out.push(`/${lang}/${k}`));
  }
  return out;
}

const strip = (s) => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/** Title + description for a view, plus hreflang alternates. */
export function meta(lang, view, arg, path) {
  site.setLang(lang);
  let title, description;
  switch (view) {
    case 'inicio':
      title = T(['Ruta Suiza · Tu vida en Suiza, en español', 'Ruta Suiza · Ta vie en Suisse, en espagnol']);
      description = T(['Permisos, documentos, seguro médico, impuestos y cartas oficiales en Suiza romanda, explicados en español, con personas reales que te ayudan.', 'Permis, documents, assurance maladie, impôts et courriers officiels en Suisse romande, expliqués en espagnol, avec de vraies personnes pour t\'aider.']);
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
      title = T([`Documentos de ${T(c.n)} para Suiza: antecedentes, nacimiento, apostilla`, `Documents ${T(c.n)} pour la Suisse : casier, naissance, apostille`]);
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
    case 'precios':
      title = T(['Precios y acompañamiento privado', 'Tarifs et accompagnement privé']);
      description = T(['Guías gratis y una persona real que te ayuda con tu expediente.', 'Guides gratuits et une vraie personne qui t\'aide avec ton dossier.']);
      break;
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
    openGraph: { title: strip(title), description, url: `${SITE_URL}${path}`, siteName: 'Ruta Suiza', locale: lang === 'es' ? 'es_ES' : 'fr_CH', type: 'website' },
  };
}

export { site };
