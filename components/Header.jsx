'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { switchLangPath } from '../lib/links';

const PIN = (
  <svg className="pin" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M50 4 C29 4 14 20 14 40 C14 64 50 96 50 96 C50 96 86 64 86 40 C86 20 71 4 50 4 Z" fill="#d52b1e" />
    <rect x="44" y="24" width="12" height="32" rx="1" fill="#fff" />
    <rect x="34" y="34" width="32" height="12" rx="1" fill="#fff" />
  </svg>
);

export default function Header({ lang, nav, proto, menuLabel }) {
  const pathname = usePathname() || `/${lang}`;
  const isActive = (href) => (href === `/${lang}` ? pathname === href : pathname.startsWith(href));
  return (
    <>
      {proto ? <div className="proto">{proto}</div> : null}
      <header className="top">
        <div className="wrap bar">
          <Link className="logo" href={`/${lang}`} aria-label="Ruta Suiza">
            {PIN}
            <span className="wm">ruta<b>suiza</b></span>
          </Link>
          <nav className="main" aria-label={menuLabel}>
            {nav.map((n) => (
              <Link key={n.key} href={n.href} aria-current={isActive(n.href) ? 'page' : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="lang" role="group" aria-label="Idioma / Langue">
            <Link href={switchLangPath(pathname, 'es')} aria-pressed={lang === 'es'} hrefLang="es" className="lb">ES</Link>
            <Link href={switchLangPath(pathname, 'fr')} aria-pressed={lang === 'fr'} hrefLang="fr" className="lb">FR</Link>
          </div>
        </div>
      </header>
    </>
  );
}
