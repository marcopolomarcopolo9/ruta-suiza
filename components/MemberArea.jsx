'use client';

import { useCallback, useEffect, useState } from 'react';
import LetterUpload from './LetterUpload';

const TX = {
  es: {
    h: 'Mi espacio del Club', loginH: 'Entrar en mi espacio', loginP: 'Escribe el correo con el que pagaste el Club: te enviamos un enlace para entrar, sin contraseña.',
    email: 'Correo electrónico', sendLink: 'Recibir mi enlace', sent: 'Si este correo corresponde a un miembro activo, acabas de recibir un enlace (revisa también el correo no deseado). Vale 20 minutos.',
    notMember: 'No encontramos un Club activo con este correo.', join: 'Unirme al Club · CHF 9.99/mes', badLink: 'El enlace ya no es válido o ha caducado. Pide uno nuevo.',
    quota: (u, q) => `Cartas este mes: ${u} de ${q}`, left: (n) => n > 0 ? `Te quedan ${n}. Se renuevan el día 1 de cada mes.` : 'Ya usaste tus cartas de este mes. Se renuevan el día 1; si es urgente, reserva una asesoría privada (CHF 39).',
    send: 'Enviar una carta', mine: 'Mis cartas y respuestas', none: 'Todavía no has enviado ninguna carta.', waiting: 'En curso: te respondemos en 48 h como máximo.',
    answer: 'Nuestra respuesta', models: 'Modelos de cartas en francés', modelsP: 'Copia el modelo, completa lo que está entre [corchetes] y envíalo. Si dudas, mándanos tu borrador.',
    copy: 'Copiar', copied: 'Copiado ✓', wa: 'Tus preguntas por WhatsApp: escríbenos al número que recibiste en tu correo de bienvenida.', logout: 'Salir', loading: 'Cargando…', error: 'No se pudo cargar tu espacio. Inténtalo de nuevo.',
  },
  fr: {
    h: 'Mon espace Club', loginH: 'Entrer dans mon espace', loginP: 'Indique l’e-mail avec lequel tu as payé le Club : on t’envoie un lien pour entrer, sans mot de passe.',
    email: 'E-mail', sendLink: 'Recevoir mon lien', sent: 'Si cet e-mail correspond à un membre actif, tu viens de recevoir un lien (regarde aussi dans les indésirables). Il est valable 20 minutes.',
    notMember: 'Aucun Club actif trouvé avec cet e-mail.', join: 'Rejoindre le Club · CHF 9.99/mois', badLink: 'Le lien n’est plus valable ou a expiré. Demande-en un nouveau.',
    quota: (u, q) => `Courriers ce mois-ci : ${u} sur ${q}`, left: (n) => n > 0 ? `Il t’en reste ${n}. Ils se renouvellent le 1er de chaque mois.` : 'Tu as utilisé tes courriers du mois. Ils se renouvellent le 1er ; si c’est urgent, réserve un accompagnement privé (CHF 39).',
    send: 'Envoyer un courrier', mine: 'Mes courriers et réponses', none: 'Tu n’as encore envoyé aucun courrier.', waiting: 'En cours : on te répond en 48 h au maximum.',
    answer: 'Notre réponse', models: 'Modèles de lettres en français', modelsP: 'Copie le modèle, complète ce qui est entre [crochets] et envoie-le. En cas de doute, envoie-nous ton brouillon.',
    copy: 'Copier', copied: 'Copié ✓', wa: 'Tes questions par WhatsApp : écris-nous au numéro reçu dans ton e-mail de bienvenue.', logout: 'Se déconnecter', loading: 'Chargement…', error: 'Impossible de charger ton espace. Réessaie.',
  },
};
const fmt = (iso, lang) => new Date(iso).toLocaleDateString(lang === 'fr' ? 'fr-CH' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

export default function MemberArea({ lang = 'es' }) {
  const t = TX[lang] || TX.es;
  const L = (x) => (Array.isArray(x) ? x[lang === 'fr' ? 1 : 0] : x);
  const [st, setSt] = useState({ s: 'loading' });
  const [msg, setMsg] = useState('');
  const [copied, setCopied] = useState('');
  const load = useCallback(async () => {
    try {
      const r = await fetch('/api/member/me', { cache: 'no-store' });
      const j = await r.json().catch(() => ({}));
      if (r.status === 401) setSt({ s: 'login' }); else if (r.status === 403) setSt({ s: 'notmember' }); else if (j.ok) setSt({ s: 'ok', ...j }); else setSt({ s: 'error' });
    } catch { setSt({ s: 'error' }); }
  }, []);
  useEffect(() => { load(); if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('e') === 'link') setMsg(t.badLink); }, [load, t.badLink]);

  const login = async (e) => {
    e.preventDefault(); const email = new FormData(e.currentTarget).get('email');
    const r = await fetch('/api/member/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, lang }) }).catch(() => null);
    setMsg(r && r.ok ? t.sent : t.error);
  };
  const logout = async () => { await fetch('/api/member/logout', { method: 'POST' }); setSt({ s: 'login' }); setMsg(''); };
  const copy = async (k, text) => { try { await navigator.clipboard.writeText(text); setCopied(k); setTimeout(() => setCopied(''), 2000); } catch { /* ignore */ } };

  if (st.s === 'loading') return <p className="muted">{t.loading}</p>;
  if (st.s === 'error') return <p className="lerr">{t.error}</p>;
  if (st.s === 'login' || st.s === 'notmember') return (
    <div className="ma-login panel">
      <h2>{t.loginH}</h2><p>{t.loginP}</p>
      {st.s === 'notmember' && <p className="lerr">{t.notMember}</p>}
      <form onSubmit={login} className="ma-lform"><label>{t.email}<input name="email" type="email" required autoComplete="email" /></label><button className="btn btn-ok" type="submit">{t.sendLink}</button></form>
      {msg && <p className="ma-msg" role="status">{msg}</p>}
      <p className="muted small">{lang === 'fr' ? 'Pas encore membre ?' : '¿Todavía no eres miembro?'} <a href={`/${lang}/club`}>{t.join}</a></p>
    </div>
  );
  const left = Math.max(0, st.quota - st.used);
  return (
    <div className="ma">
      <div className="ma-top"><div><b>{st.email}</b></div><button type="button" className="btn ghost sm" onClick={logout}>{t.logout}</button></div>
      <section className="ma-quota panel"><b>{t.quota(st.used, st.quota)}</b><div className="ma-bar" aria-hidden="true"><span style={{ width: `${Math.min(100, (st.used / st.quota) * 100)}%` }} /></div><p className="muted">{t.left(left)}</p></section>
      <section><h2>{t.send}</h2>{left > 0 ? <LetterUpload lang={lang} mode="member" onSent={load} /> : <a className="btn ghost" href={`/${lang}/precios`}>{lang === 'fr' ? 'Réserver un accompagnement (CHF 39)' : 'Reservar una asesoría (CHF 39)'}</a>}<p className="muted small">💬 {t.wa}</p></section>
      <section><h2>{t.mine}</h2>{st.letters.length ? st.letters.map((l) => (
        <details key={l.id} className="ma-letter" open={l.status === 'answered' && st.letters[0].id === l.id}>
          <summary><span>{fmt(l.createdAt, lang)} · {l.fname}</span><span className={`ma-st ${l.status}`}>{l.status === 'answered' ? (lang === 'fr' ? 'Répondu' : 'Respondida') : (lang === 'fr' ? 'En cours' : 'En curso')}</span></summary>
          {l.note && <p className="muted">{l.note}</p>}
          {l.status === 'answered' ? <div className="ma-reply"><b>{t.answer}</b><p>{l.reply}</p></div> : <p className="muted">{t.waiting}</p>}
        </details>)) : <p className="muted">{t.none}</p>}</section>
      <section><h2>{t.models}</h2><p className="muted">{t.modelsP}</p>{st.templates.map((m) => (
        <details key={m.k} className="ma-tpl"><summary>{L(m.t)}</summary><p className="ma-when">{L(m.when)}</p><pre lang="fr">{m.body}</pre><button type="button" className="btn ghost sm" onClick={() => copy(m.k, m.body)}>{copied === m.k ? t.copied : t.copy}</button></details>))}</section>
    </div>
  );
}
