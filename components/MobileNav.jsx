'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { switchLangPath } from '../lib/links';
import { openModal } from './Enhance';

const ico = (d) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const I = {
  home: ico(<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h5v-6h4v6h5V9.5" /></>),
  route: ico(<><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" /></>),
  globe: ico(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" /></>),
  key: ico(<><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9" /><path d="m17 6 3 3" /><path d="m14 9 2 2" /></>),
  more: ico(<><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>),
  news: ico(<><path d="M4 5h13v14H6a2 2 0 0 1-2-2z" /><path d="M17 9h3v8a2 2 0 0 1-2 2" /><path d="M8 9h5M8 13h5" /></>),
  book: ico(<><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /><path d="M9 7h6" /></>),
  tag: ico(<><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.5" /></>),
  chat: ico(<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1.1-4.6A8 8 0 1 1 21 12z" />),
  x: ico(<path d="M6 6l12 12M18 6 6 18" />),
};

const TXT = {
  es: { tabs: ['Inicio', 'Mi ruta', 'Países', 'Vivo aquí', 'Más'], more: 'Explorar más', news: ['Suiza News', 'Lo que cambia esta semana'], guias: ['Guías', 'Paso a paso, sin jerga'], precios: ['Precios', 'Gratis para empezar'], ask: 'Hablar con una persona', lang: 'Idioma', close: 'Cerrar', nav: 'Navegación principal' },
  fr: { tabs: ['Accueil', 'Parcours', 'Pays', 'Installé', 'Plus'], more: 'Explorer plus', news: ['Suiza News', 'Ce qui change cette semaine'], guias: ['Guides', 'Pas à pas, sans jargon'], precios: ['Tarifs', 'Gratuit pour commencer'], ask: 'Parler à une personne', lang: 'Langue', close: 'Fermer', nav: 'Navigation principale' },
};

const buzz = () => { try { navigator.vibrate && navigator.vibrate(6); } catch (e) { /* ignore */ } };

/** Turns wide tables into labelled cards on small screens. */
function stackTables(root) {
  root.querySelectorAll('.tbl:not(.stack)').forEach((box) => {
    const heads = [...box.querySelectorAll('thead th')].map((th) => th.textContent.trim());
    if (!heads.length) return;
    box.querySelectorAll('tbody tr').forEach((tr) => {
      [...tr.children].forEach((td, i) => { if (heads[i]) td.setAttribute('data-label', heads[i]); });
    });
    box.classList.add('stack');
  });
}

/** Gentle fade-up of cards as they scroll into view. */
function reveal(root, io) {
  root.querySelectorAll('.card,.flag,.panel,.heroCard .row,.sec > h2,.faq,.tbl').forEach((el) => {
    if (el.dataset.rv) return;
    el.dataset.rv = '1';
    el.classList.add('rv');
    io.observe(el);
  });
}

export default function MobileNav({ lang }) {
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);
  const t = TXT[lang] || TXT.es;
  const L = `/${lang}`;
  const seg = pathname.split('/')[2] || '';
  const tabs = [
    { k: '', href: L, icon: I.home },
    { k: 'ruta', href: `${L}/ruta`, icon: I.route },
    { k: 'paises', href: `${L}/paises`, icon: I.globe },
    { k: 'instalados', href: `${L}/instalados`, icon: I.key },
  ];
  let active = tabs.findIndex((x) => x.k === seg);
  if (active < 0) active = 4;

  // close the sheet on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('sheet-open', open);
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // scroll progress, table stacking, reveal animations
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return undefined;
    const bar = document.getElementById('rs-progress');
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, h.scrollTop / max) : 0})`;
      document.documentElement.classList.toggle('scrolled', h.scrollTop > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = reduce || !('IntersectionObserver' in window) ? null : new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    const run = () => { stackTables(main); if (io) reveal(main, io); };
    run();
    let raf = 0;
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(run); });
    mo.observe(main, { childList: true, subtree: true });
    return () => { window.removeEventListener('scroll', onScroll); mo.disconnect(); io && io.disconnect(); cancelAnimationFrame(raf); };
  }, [pathname]);

  return (
    <>
      <div id="rs-progress" aria-hidden="true" />
      <nav className="tabbar" aria-label={t.nav} style={{ '--i': active }}>
        <span className="tb-pill" aria-hidden="true" />
        {tabs.map((x, i) => (
          <Link key={x.k || 'home'} href={x.href} onClick={buzz} aria-current={active === i ? 'page' : undefined}>
            {x.icon}<span>{t.tabs[i]}</span>
          </Link>
        ))}
        <button type="button" onClick={() => { buzz(); setOpen((o) => !o); }} aria-expanded={open} aria-controls="rs-sheet" aria-current={active === 4 ? 'page' : undefined}>
          {open ? I.x : I.more}<span>{t.tabs[4]}</span>
        </button>
      </nav>

      <div className="sheet-bg" data-open={open} onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="sheet" id="rs-sheet" data-open={open} role="dialog" aria-modal="true" aria-label={t.more} inert={open ? undefined : ''}>
        <div className="sheet-grab" aria-hidden="true" />
        <div className="sheet-h">
          <b>{t.more}</b>
          <button type="button" className="sheet-x" onClick={() => setOpen(false)} aria-label={t.close}>{I.x}</button>
        </div>
        <div className="sheet-grid">
          {[['noticias', I.news, t.news, 'c1'], ['guias', I.book, t.guias, 'c2'], ['precios', I.tag, t.precios, 'c3']].map(([k, icon, [title, sub], c]) => (
            <Link key={k} href={`${L}/${k}`} className={`sheet-card ${c}`} aria-current={seg === k ? 'page' : undefined}>
              <span className="sc-ico">{icon}</span>
              <span><b>{title}</b><small>{sub}</small></span>
            </Link>
          ))}
        </div>
        <button type="button" className="btn sheet-ask" onClick={() => { setOpen(false); openModal(lang, 'ask'); }}>{I.chat}{t.ask}</button>
        <div className="sheet-lang">
          <span>{t.lang}</span>
          <div className="seg">
            <Link href={switchLangPath(pathname, 'es')} hrefLang="es" aria-pressed={lang === 'es'}>Español</Link>
            <Link href={switchLangPath(pathname, 'fr')} hrefLang="fr" aria-pressed={lang === 'fr'}>Français</Link>
          </div>
        </div>
      </div>
    </>
  );
}
