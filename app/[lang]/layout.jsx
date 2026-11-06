import '@fontsource/figtree/400.css';
import '@fontsource/figtree/600.css';
import '@fontsource/figtree/700.css';
import '@fontsource/bricolage-grotesque/600.css';
import '@fontsource/bricolage-grotesque/700.css';
import '@fontsource/bricolage-grotesque/800.css';
import '@fontsource/manrope/800.css';
import '../globals.css';
import '../extra.css';
import '../mobile.css';
import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import MobileNav from '../../components/MobileNav';
import { navItems, footerHTML, site } from '../../lib/render';
import { LANGS, SITE_URL } from '../../lib/links';

export const revalidate = 86400; // refresh dates and news daily
export function generateStaticParams() { return LANGS.map((lang) => ({ lang })); }

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Ruta Suiza', template: '%s · Ruta Suiza' },
  applicationName: 'Ruta Suiza',
};
export const viewport = { themeColor: '#d52b1e', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function LangLayout({ children, params }) {
  const { lang } = params;
  if (!LANGS.includes(lang)) notFound();
  const nav = navItems(lang);
  site.setLang(lang);
  const menu = site.T(['Menú', 'Menu']);
  const foot = footerHTML(lang);
  return (
    <html lang={lang}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          { '@context': 'https://schema.org', '@type': 'Organization', name: 'Ruta Suiza', url: SITE_URL, logo: `${SITE_URL}/icon.svg`, areaServed: 'CH', knowsLanguage: ['es', 'fr'] },
          { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Ruta Suiza', url: `${SITE_URL}/${lang}`, inLanguage: lang },
        ]) }} />
        <a className="skip" href="#main">{lang === 'es' ? 'Ir al contenido' : 'Aller au contenu'}</a>
        <Header lang={lang} nav={nav} menuLabel={menu} />
        <main className="wrap" id="main">{children}</main>
        <MobileNav lang={lang} />
        <footer><div className="wrap" id="foot" dangerouslySetInnerHTML={{ __html: foot }} /></footer>
        <div className="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mtitle">
          <div className="mbox">
            <button className="mx" id="mx" type="button" aria-label={lang === 'es' ? 'Cerrar' : 'Fermer'}>×</button>
            <h2 id="mtitle" style={{ fontSize: 24 }} />
            <p id="msub" style={{ margin: 0 }} className="muted" />
            <form className="lform" id="mform" noValidate />
            <div className="lok" id="mok" hidden />
          </div>
        </div>
      </body>
    </html>
  );
}
