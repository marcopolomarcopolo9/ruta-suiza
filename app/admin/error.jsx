'use client';

import { useEffect } from 'react';

/** Instead of "Application error": a clear message, a reload button, and the error is logged for the CMS. */
export default function AdminError({ error }) {
  useEffect(() => {
    try { fetch('/api/log-error', { method: 'POST', keepalive: true, body: JSON.stringify({ message: `[CMS] ${error?.message}`, stack: error?.stack, url: location.href }) }); } catch (e) { /* ignore */ }
  }, [error]);
  return (
    <main className="login">
      <div className="card login-card">
        <div className="brand">ruta<b>suiza</b> <span>CMS</span></div>
        <p><b>Le CMS doit être rechargé.</b></p>
        <p className="muted small">Le site vient sans doute d’être mis à jour pendant que cette page était ouverte. Recharge-la pour obtenir la dernière version. Si le problème revient, l’erreur a été enregistrée dans Réglages → Erreurs récentes.</p>
        <button type="button" className="btn" onClick={() => location.reload()}>Recharger le CMS</button>
      </div>
    </main>
  );
}
