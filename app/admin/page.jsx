'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const KIND = { llamada: ['Rappel', 'k-call'], pregunta: ['Question', 'k-ask'], club: ['Club', 'k-club'], pago: ['Payé CHF 39', 'k-pay'], club_pago: ['Membre Club 9.99', 'k-member'] };
const STATUS = { nuevo: 'Nouveau', contactado: 'Contacté', cerrado: 'Terminé' };
const fmt = (iso) => new Date(iso).toLocaleString('fr-CH', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
const wa = (p) => `https://wa.me/${String(p).replace(/[^\d]/g, '').replace(/^0(?=7)/, '41')}`;

function csv(rows) {
  const cols = ['createdAt', 'kind', 'status', 'first', 'last', 'phone', 'email', 'country', 'canton', 'message', 'note', 'lang', 'page'];
  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const body = [cols.join(';'), ...rows.map((r) => cols.map((c) => q(r[c])).join(';'))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + body], { type: 'text/csv;charset=utf-8' }));
  a.download = `ruta-suiza-demandes-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}

function checks(st) {
  const c = [];
  const add = (lvl, txt) => c.push([lvl, txt]);
  add(st.store ? 'ok' : 'ko', st.store ? 'Base de données connectée.' : 'Base de données non connectée (Vercel → Storage → Upstash).');
  if (!st.stripeKey) add('ko', 'Clé Stripe absente : ajoute STRIPE_SECRET_KEY dans Vercel puis redéploie.');
  else if (st.stripeKey === 'publishable') add('ko', 'Tu as mis la clé PUBLIQUE (pk_…). Il faut la clé SECRÈTE qui commence par sk_.');
  else if (st.stripeKey === 'restricted') add('warn', 'Clé restreinte (rk_…) : elle doit autoriser Checkout Sessions en écriture.');
  else if (st.stripeKey === 'unknown') add('ko', 'La clé Stripe ne ressemble pas à une clé secrète (sk_test_… ou sk_live_…). Vérifie le copier-coller.');
  else add(st.stripeKey === 'live' ? 'ok' : 'warn', st.stripeKey === 'live' ? 'Clé Stripe réelle (live) reçue.' : 'Clé Stripe de TEST : les paiements sont fictifs (carte 4242 4242 4242 4242).');
  if (st.accountError) add('ko', `Stripe refuse la clé : ${st.accountError}`);
  if (st.account) {
    add(st.account.chargesEnabled ? 'ok' : 'ko', st.account.chargesEnabled ? 'Ton compte Stripe peut encaisser.' : 'Ton compte Stripe ne peut pas encore encaisser : termine l’activation dans Stripe (infos de l’activité, identité, IBAN).');
    if (st.account.country !== 'CH') add('ko', `Ton compte Stripe est enregistré dans le pays « ${st.account.country} ». TWINT n’est proposé qu’aux comptes suisses (CH).`);
  }
  if (st.twint) {
    if (!st.twint.available) add('ko', 'TWINT n’est pas disponible sur ton compte Stripe (compte non suisse ou activation pas terminée).');
    else if (st.twint.preference !== 'on') add('ko', 'TWINT est désactivé : Stripe → ⚙️ Settings → Payment methods → TWINT → Turn on. En mode test, active-le aussi dans les réglages du mode test.');
    else add('ok', 'TWINT est activé.');
  }
  if (st.twintCheckError) add('warn', `Impossible de vérifier TWINT : ${st.twintCheckError}`);
  if (st.lastTwintError) add('warn', `Dernier refus de TWINT par Stripe (${fmt(st.lastTwintError.at)}) : ${st.lastTwintError.value}`);
  if (st.lastCheckoutError) add('ko', `Dernière erreur de paiement (${fmt(st.lastCheckoutError.at)}) : ${st.lastCheckoutError.value}`);
  add(st.webhook ? 'ok' : 'warn', st.webhook ? 'Webhook Stripe configuré.' : 'Webhook Stripe absent (STRIPE_WEBHOOK_SECRET) : les paiements ne sont enregistrés que si le client revient sur le site.');
  add(st.clubGroup ? 'ok' : 'warn', st.clubGroup ? 'Lien du groupe WhatsApp du Club configuré.' : 'Lien du groupe WhatsApp du Club absent (NEXT_PUBLIC_CLUB_WHATSAPP) : les nouveaux membres verront « accès par e-mail sous 24 h ».');
  add(st.cal ? 'ok' : 'warn', st.cal ? `Calendrier Cal.com : ${st.cal}` : 'Calendrier absent (NEXT_PUBLIC_CAL_LINK) : après paiement, le client verra « on te contacte ».');
  return c;
}

function Status() {
  const [st, setSt] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => { fetch('/api/admin/status', { cache: 'no-store' }).then((r) => r.json()).then(setSt).catch(() => setSt({ fail: true })); }, []);
  if (!st) return null;
  if (st.fail) return <section className="adm-status"><b>État de la configuration</b><p className="adm-muted">Impossible de lire l’état.</p></section>;
  const list = checks(st);
  const bad = list.filter((x) => x[0] === 'ko').length;
  return (
    <section className={`adm-status ${bad ? 'has-ko' : ''}`}>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
        <b>État de la configuration</b> <span>{bad ? `${bad} problème${bad > 1 ? 's' : ''} à régler` : 'tout est en ordre'}</span> <i>{open ? '▲' : '▼'}</i>
      </button>
      {(open || bad > 0) && <ul>{list.map(([lvl, txt], i) => <li key={i} className={`lv-${lvl}`}>{lvl === 'ok' ? '✅' : lvl === 'warn' ? '⚠️' : '❌'} {txt}</li>)}</ul>}
    </section>
  );
}

function Login({ onOk }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setErr('');
    const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) });
    if (r.ok) onOk();
    else setErr(r.status === 429 ? 'Trop d’essais, réessaie dans 15 minutes.' : r.status === 503 ? 'ADMIN_PASSWORD n’est pas configuré dans Vercel.' : 'Mot de passe incorrect.');
  };
  return (
    <main className="adm-login">
      <form onSubmit={submit} className="adm-card">
        <div className="adm-logo">ruta<b>suiza</b> <span>admin</span></div>
        <label>Mot de passe<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus autoComplete="current-password" /></label>
        {err && <p className="adm-err">{err}</p>}
        <button className="btn" type="submit">Se connecter</button>
      </form>
    </main>
  );
}

function Lead({ l, onPatch, onDelete }) {
  const [note, setNote] = useState(l.note || '');
  useEffect(() => setNote(l.note || ''), [l.note]);
  const [label, cls] = KIND[l.kind] || [l.kind, ''];
  return (
    <article className={`adm-lead st-${l.status}`}>
      <header>
        <span className={`adm-kind ${cls}`}>{label}</span>
        <b>{l.first || l.last ? `${l.first} ${l.last}` : l.email}</b>
        <span className="adm-muted">{[l.country, l.canton, l.lang?.toUpperCase()].filter(Boolean).join(' · ')}</span>
        <time className="adm-muted">{fmt(l.createdAt)}</time>
      </header>
      {l.message && <p className="adm-msg">{l.message}</p>}
      <div className="adm-contact">
        {l.phone && <a href={wa(l.phone)} target="_blank" rel="noopener" className="adm-wa">WhatsApp {l.phone}</a>}
        <a href={`mailto:${l.email}`}>{l.email}</a>
        {l.phone && <a href={`tel:${l.phone}`}>Appeler</a>}
      </div>
      <div className="adm-actions">
        <select value={l.status} onChange={(e) => onPatch(l.id, { status: e.target.value })} aria-label="Statut">
          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <textarea rows={1} placeholder="Note interne…" value={note} onChange={(e) => setNote(e.target.value)} onBlur={() => note !== (l.note || '') && onPatch(l.id, { note })} />
        <button type="button" className="adm-del" onClick={() => confirm(`Supprimer la demande de ${l.first || l.email} ?`) && onDelete(l.id)}>Supprimer</button>
      </div>
      {l.page && <small className="adm-muted">Depuis {l.page}</small>}
    </article>
  );
}

export default function Admin() {
  const [state, setState] = useState('loading'); // loading | login | nostore | ok
  const [leads, setLeads] = useState([]);
  const [kind, setKind] = useState('all');
  const [status, setStatus] = useState('open');
  const [q, setQ] = useState('');

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/leads', { cache: 'no-store' });
    if (r.status === 401) return setState('login');
    if (r.status === 503) return setState('nostore');
    const j = await r.json(); setLeads(j.leads || []); setState('ok');
  }, []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (state !== 'ok') return undefined; const t = setInterval(load, 60000); return () => clearInterval(t); }, [state, load]);

  const patch = async (id, p) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, ...p } : l)));
    await fetch('/api/admin/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...p }) });
  };
  const del = async (id) => {
    setLeads((ls) => ls.filter((l) => l.id !== id));
    await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  };
  const logout = async () => { await fetch('/api/admin/login', { method: 'DELETE' }); setState('login'); };

  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return leads.filter((l) => (kind === 'all' || l.kind === kind)
      && (status === 'all' || (status === 'open' ? l.status !== 'cerrado' : l.status === status))
      && (!s || [l.first, l.last, l.email, l.phone, l.country, l.canton, l.message, l.note].join(' ').toLowerCase().includes(s)));
  }, [leads, kind, status, q]);

  if (state === 'loading') return <main className="adm-login"><p className="adm-muted">Chargement…</p></main>;
  if (state === 'login') return <Login onOk={load} />;
  if (state === 'nostore') return (
    <main className="adm-login"><div className="adm-card"><div className="adm-logo">ruta<b>suiza</b> <span>admin</span></div>
      <p>La base de données n’est pas encore connectée. Dans Vercel : <b>Storage → Create → Upstash Redis</b> (région Frankfurt), connecte-la au projet, puis redéploie.</p></div></main>
  );

  const count = (k) => leads.filter((l) => l.kind === k).length;
  const fresh = leads.filter((l) => l.status === 'nuevo').length;
  return (
    <main className="adm-wrap">
      <header className="adm-top">
        <div className="adm-logo">ruta<b>suiza</b> <span>admin</span></div>
        <div className="adm-topbtns">
          <a href="/es/reserva?preview=1" target="_blank" rel="noopener">Aperçu après paiement 39.-</a>
          <a href="/es/club/bienvenida?preview=1" target="_blank" rel="noopener">Aperçu bienvenue Club</a>
          <button type="button" onClick={load}>Actualiser</button>
          <button type="button" onClick={() => csv(shown)}>Exporter CSV</button>
          <button type="button" onClick={logout}>Déconnexion</button>
        </div>
      </header>
      <Status />
      <section className="adm-stats">
        <div><b>{fresh}</b><span>nouvelles</span></div>
        <div className="adm-member"><b>{count('club_pago')}</b><span>membres Club</span></div>
        <div className="adm-paid"><b>{count('pago')}</b><span>consultations payées</span></div>
        <div><b>{count('llamada')}</b><span>rappels</span></div>
        <div><b>{count('pregunta')}</b><span>questions</span></div>
        <div className="adm-club"><b>{count('club')}</b><span>intéressés Club</span></div>
      </section>
      <section className="adm-filters">
        <div className="adm-seg">{[['all', 'Tout'], ['club_pago', 'Membres'], ['pago', 'Payés'], ['llamada', 'Rappels'], ['pregunta', 'Questions'], ['club', 'Club']].map(([k, v]) => (
          <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>{v}</button>))}</div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filtrer par statut">
          <option value="open">À traiter</option><option value="all">Tous les statuts</option>
          {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <input type="search" placeholder="Rechercher un nom, un e-mail, un pays…" value={q} onChange={(e) => setQ(e.target.value)} />
      </section>
      {shown.length === 0 ? <p className="adm-empty">Aucune demande ici pour l’instant.</p> : (
        <div className="adm-list">{shown.map((l) => <Lead key={l.id} l={l} onPatch={patch} onDelete={del} />)}</div>
      )}
    </main>
  );
}
