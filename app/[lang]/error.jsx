'use client';

import { useEffect } from 'react';

/** Shown instead of a blank page when something crashes; the error is reported to the CMS. */
export default function PageError({ error, reset }) {
  useEffect(() => {
    try {
      fetch('/api/log-error', { method: 'POST', keepalive: true, body: JSON.stringify({ message: error?.message, stack: error?.stack, url: location.href }) });
    } catch (e) { /* ignore */ }
  }, [error]);
  return (
    <section className="article">
      <div className="eyebrow">Ruta Suiza</div>
      <h1>Algo ha fallado · Un problème est survenu</h1>
      <p className="lead">Ya estamos avisados. Vuelve a intentarlo en un momento. Nous sommes prévenus, réessaie dans un instant.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" className="btn" onClick={() => reset()}>Reintentar · Réessayer</button>
        <a className="btn ghost" href="/es">Inicio · Accueil</a>
      </div>
    </section>
  );
}
