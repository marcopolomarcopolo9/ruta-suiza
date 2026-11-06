'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/* ---------- helpers ---------- */
const CHF = (n) => new Intl.NumberFormat('fr-CH', { style: 'currency', currency: 'CHF', minimumFractionDigits: 2 }).format(n || 0);
const dt = (t) => (t ? new Date(t).toLocaleString('fr-CH', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—');
const d = (t) => (t ? new Date(t).toLocaleDateString('fr-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—');
const pad = (n) => String(n).padStart(2, '0');
const hm = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
const bMin = (b) => (b.min ?? (b.hour || 0) * 60);
const slotLabel = (date, min) => `${new Date(`${date}T12:00:00Z`).toLocaleDateString('fr-CH', { timeZone: 'UTC', weekday: 'short', day: '2-digit', month: '2-digit' })} · ${hm(min)}`;
function tzOffset(tz, instant) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(instant).map((x) => [x.type, x.value]));
  return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - Math.floor(instant.getTime() / 60000) * 60000) / 60000;
}
/** Client's local time for a booking ("11:30 à Bogota"), or '' when the client is on Swiss time. */
function clientTime(b) {
  if (!b.tz || b.tz === 'Europe/Zurich') return '';
  try {
    const [y, m, d] = b.date.split('-').map(Number); const min = bMin(b);
    const guess = Date.UTC(y, m - 1, d, Math.floor(min / 60), min % 60);
    const inst = new Date(guess - tzOffset('Europe/Zurich', new Date(guess)) * 60000);
    if (tzOffset(b.tz, inst) === tzOffset('Europe/Zurich', inst)) return '';
    return `${inst.toLocaleTimeString('fr-CH', { timeZone: b.tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })} à ${b.tz.split('/').pop().replace(/_/g, ' ')}`;
  } catch (e) { return ''; }
}
const wa = (p) => `https://wa.me/${String(p || '').replace(/[^\d]/g, '').replace(/^0(?=7)/, '41')}`;
const KIND = { llamada: ['Rappel', 'k-call'], pregunta: ['Question', 'k-ask'], club: ['Intérêt Club', 'k-club'], pago: ['Consultation payée', 'k-pay'], club_pago: ['Membre Club', 'k-member'], rdv: ['Rendez-vous', 'k-rdv'], contacto: ['Contact', 'k-ask'], club_baja: ['Fin d’abonnement', 'k-call'], pago_fallido: ['Paiement échoué', 'k-rdv'] };
const LSTATUS = { nuevo: 'Nouveau', contactado: 'Contacté', cerrado: 'Terminé' };
const CSTATUS = { member: ['Membre', 'b-member'], member_ending: ['Membre (résilie)', 'b-ending'], ex_member: ['Ancien membre', 'b-ex'], customer: ['Client', 'b-customer'], prospect: ['Prospect', 'b-prospect'] };
const SSTATUS = { active: ['Actif', 'b-member'], trialing: ['Essai', 'b-member'], past_due: ['Paiement en retard', 'b-ending'], canceled: ['Résilié', 'b-ex'], unpaid: ['Impayé', 'b-ending'], incomplete: ['Incomplet', 'b-prospect'], incomplete_expired: ['Expiré', 'b-ex'] };
const PRODUCT = { club: 'Club (abonnement)', consultation: 'Consultation 39.-', autre: 'Autre' };
const METHOD = { card: 'Carte', twint: 'TWINT' };
const ACTIVE = ['active', 'trialing', 'past_due'];

function downloadCsv(name, cols, rows) {
  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const body = [cols.map((c) => c[0]).join(';'), ...rows.map((r) => cols.map((c) => q(c[1](r))).join(';'))].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + body], { type: 'text/csv;charset=utf-8' }));
  a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
}
const Badge = ({ map, k }) => { const [l, c] = map[k] || [k, '']; return <span className={`badge ${c}`}>{l}</span>; };
const Empty = ({ children }) => <p className="empty">{children}</p>;
const post = (url, body, method = 'POST') => fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

/* ---------- config status ---------- */
function checks(st) {
  const c = [];
  const add = (lvl, txt) => c.push([lvl, txt]);
  add(st.store ? 'ok' : 'ko', st.store ? 'Base de données connectée.' : 'Base de données non connectée (Vercel → Storage → Upstash).');
  if (!st.stripeKey) add('ko', 'Clé Stripe absente : ajoute STRIPE_SECRET_KEY dans Vercel puis redéploie.');
  else if (st.stripeKey === 'publishable') add('ko', 'Tu as mis la clé PUBLIQUE (pk_…). Il faut la clé SECRÈTE qui commence par sk_.');
  else if (st.stripeKey === 'restricted') add('warn', 'Clé restreinte (rk_…) : elle doit autoriser Checkout, Charges et Subscriptions.');
  else if (st.stripeKey === 'unknown') add('ko', 'La clé Stripe ne ressemble pas à une clé secrète (sk_test_… ou sk_live_…). Vérifie le copier-coller.');
  else add(st.stripeKey === 'live' ? 'ok' : 'warn', st.stripeKey === 'live' ? 'Clé Stripe réelle (live) reçue.' : 'Clé Stripe de TEST : les paiements sont fictifs (carte 4242 4242 4242 4242).');
  if (st.accountError) add('ko', `Stripe refuse la clé : ${st.accountError}`);
  if (st.account) {
    add(st.account.chargesEnabled ? 'ok' : 'ko', st.account.chargesEnabled ? 'Ton compte Stripe peut encaisser.' : 'Ton compte Stripe ne peut pas encore encaisser : termine l’activation dans Stripe (infos de l’activité, identité, IBAN).');
    if (st.account.country !== 'CH') add('ko', `Ton compte Stripe est enregistré dans le pays « ${st.account.country} ». TWINT n’est proposé qu’aux comptes suisses (CH).`);
  }
  if (st.twint) {
    if (!st.twint.available) add('ko', 'TWINT n’est pas disponible sur ton compte Stripe (compte non suisse ou activation pas terminée).');
    else if (st.twint.preference !== 'on') add('ko', 'TWINT est désactivé : Stripe → ⚙️ Settings → Payment methods → TWINT → Turn on.');
    else add('ok', 'TWINT est activé.');
  }
  if (st.twintCheckError) add('warn', `Impossible de vérifier TWINT : ${st.twintCheckError}`);
  if (st.lastTwintError) add('warn', `Dernier refus de TWINT par Stripe (${dt(st.lastTwintError.at)}) : ${st.lastTwintError.value}`);
  if (st.lastCheckoutError) add('ko', `Dernière erreur de paiement (${dt(st.lastCheckoutError.at)}) : ${st.lastCheckoutError.value}`);
  add(st.webhook ? 'ok' : 'warn', st.webhook ? 'Webhook Stripe configuré.' : 'Webhook Stripe absent (STRIPE_WEBHOOK_SECRET) : les paiements ne sont enregistrés que si le client revient sur le site.');
  add(st.mail ? 'ok' : 'warn', st.mail ? 'E-mails automatiques (Resend) configurés.' : 'E-mails automatiques désactivés : ajoute RESEND_API_KEY (Resend) dans Vercel.');
  add(st.adminEmail ? 'ok' : 'warn', st.adminEmail ? 'Alertes par e-mail activées (ADMIN_EMAIL).' : 'Pas d’alerte par e-mail pour toi : ajoute ADMIN_EMAIL dans Vercel.');
  add(st.cron ? 'ok' : 'warn', st.cron ? 'Rappel automatique la veille du rendez-vous activé.' : 'Rappel de la veille désactivé : ajoute CRON_SECRET dans Vercel.');
  add(st.whatsapp ? 'ok' : 'warn', st.whatsapp ? 'Numéro WhatsApp réservé aux clients configuré.' : 'Numéro WhatsApp absent : ajoute WHATSAPP_NUMBER dans Vercel (il ne s’affiche qu’aux clients qui ont payé).');
  add(st.clubGroup ? 'ok' : 'warn', st.clubGroup ? 'Lien du groupe WhatsApp du Club configuré.' : 'Lien du groupe WhatsApp du Club absent (NEXT_PUBLIC_CLUB_WHATSAPP).');
  return c;
}
function useStatus() {
  const [st, setSt] = useState(null);
  useEffect(() => { fetch('/api/admin/status', { cache: 'no-store' }).then((r) => r.json()).then(setSt).catch(() => setSt({ fail: true })); }, []);
  return st;
}
function StatusList({ st }) {
  if (!st) return <p className="muted">Vérification…</p>;
  if (st.fail) return <p className="muted">Impossible de lire l’état.</p>;
  return <ul className="checks">{checks(st).map(([lvl, txt], i) => <li key={i} className={`lv-${lvl}`}>{lvl === 'ok' ? '✅' : lvl === 'warn' ? '⚠️' : '❌'} {txt}</li>)}</ul>;
}

/* ---------- login ---------- */
function Login({ onOk }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const submit = async (e) => {
    e.preventDefault(); setErr('');
    const r = await post('/api/admin/login', { password: pw });
    if (r.ok) onOk();
    else setErr(r.status === 429 ? 'Trop d’essais, réessaie dans 15 minutes.' : r.status === 503 ? 'ADMIN_PASSWORD n’est pas configuré dans Vercel.' : 'Mot de passe incorrect.');
  };
  return (
    <main className="login">
      <form onSubmit={submit} className="card login-card">
        <div className="brand">ruta<b>suiza</b> <span>CMS</span></div>
        <label>Mot de passe<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus autoComplete="current-password" /></label>
        {err && <p className="err">{err}</p>}
        <button className="btn" type="submit">Se connecter</button>
      </form>
    </main>
  );
}

/* ---------- dashboard ---------- */
function Dashboard({ data, go, openClient, st }) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
  const net = (p) => p.amount - p.refunded;
  const month = data.payments.filter((p) => p.created >= monthStart).reduce((s, p) => s + net(p), 0);
  const prev = data.payments.filter((p) => p.created >= prevStart && p.created < monthStart).reduce((s, p) => s + net(p), 0);
  const active = data.subs.filter((s) => ACTIVE.includes(s.status));
  const mrr = active.filter((s) => !s.cancelAtEnd).reduce((s, x) => s + x.amount, 0);
  const todayKey = new Date().toISOString().slice(0, 10);
  const upcoming = data.bookings.filter((b) => b.date >= todayKey && !b.test).sort((a, b) => (a.date + String(bMin(a)).padStart(4, '0')).localeCompare(b.date + String(bMin(b)).padStart(4, '0')));
  const fresh = data.leads.filter((l) => l.status === 'nuevo');
  const bad = st && !st.fail ? checks(st).filter((x) => x[0] === 'ko').length : 0;
  return (
    <>
      {bad > 0 && <button type="button" className="alert" onClick={() => go('settings')}>⚠️ {bad} problème{bad > 1 ? 's' : ''} de configuration à régler → voir Réglages</button>}
      {data.stripeError && <div className="alert">Stripe : {data.stripeError}</div>}
      {data.recentErrors > 0 && <button type="button" className="alert" onClick={() => go('settings')}>🐞 {data.recentErrors} erreur{data.recentErrors > 1 ? 's' : ''} technique{data.recentErrors > 1 ? 's' : ''} ces dernières 24 h → voir Réglages</button>}
      <div className="quick"><span className="muted small">Aperçus client :</span><a className="ghost" href="/es/reserva?preview=1" target="_blank" rel="noopener">👀 Page après paiement 39.- (calendrier)</a><a className="ghost" href="/es/club/bienvenida?preview=1" target="_blank" rel="noopener">👀 Bienvenue Club</a></div>
      <section className="kpis">
        <div className="kpi"><span>Revenus ce mois</span><b>{CHF(month)}</b><small>mois dernier : {CHF(prev)}</small></div>
        <div className="kpi"><span>Membres Club actifs</span><b>{active.length}</b><small>revenu mensuel récurrent : {CHF(mrr)}</small></div>
        <div className="kpi"><span>Rendez-vous à venir</span><b>{upcoming.length}</b><small>{upcoming[0] ? `prochain : ${slotLabel(upcoming[0].date, bMin(upcoming[0]))}` : 'aucun'}</small></div>
        <div className="kpi"><span>Demandes à traiter</span><b>{fresh.length}</b><small>{data.leads.length} au total</small></div>
      </section>
      <div className="grid2">
        <section className="card">
          <header className="card-h"><h2>Prochains rendez-vous</h2><button type="button" className="link" onClick={() => go('agenda')}>Agenda →</button></header>
          {upcoming.length ? <ul className="rows">{upcoming.slice(0, 6).map((b) => (
            <li key={b.id}><b className="when">{slotLabel(b.date, bMin(b))}</b><span>{b.name || b.email}{clientTime(b) && <small className="muted"> · client : {clientTime(b)}</small>}</span>{b.phone && <a href={wa(b.phone)} target="_blank" rel="noopener" className="wa">WhatsApp</a>}</li>))}</ul> : <Empty>Aucun rendez-vous prévu.</Empty>}
        </section>
        <section className="card">
          <header className="card-h"><h2>Derniers paiements</h2><button type="button" className="link" onClick={() => go('payments')}>Tout voir →</button></header>
          {data.payments.length ? <ul className="rows">{data.payments.slice(0, 6).map((p) => (
            <li key={p.id}><b className="amount">{CHF(p.amount)}</b><span>{p.name || p.email}</span><small className="muted">{PRODUCT[p.product]} · {d(p.created)}</small></li>))}</ul> : <Empty>Aucun paiement pour l’instant.</Empty>}
        </section>
        <section className="card">
          <header className="card-h"><h2>Demandes à traiter</h2><button type="button" className="link" onClick={() => go('leads')}>Tout voir →</button></header>
          {fresh.length ? <ul className="rows">{fresh.slice(0, 6).map((l) => (
            <li key={l.id}><Badge map={KIND} k={l.kind} /><span>{[l.first, l.last].filter(Boolean).join(' ') || l.email}</span><small className="muted">{dt(l.createdAt)}</small></li>))}</ul> : <Empty>Tout est traité 🎉</Empty>}
        </section>
        <section className="card">
          <header className="card-h"><h2>Derniers clients</h2><button type="button" className="link" onClick={() => go('clients')}>Tout voir →</button></header>
          {data.clients.length ? <ul className="rows">{data.clients.slice(0, 6).map((c) => (
            <li key={c.key} className="clickable" onClick={() => openClient(c.key)}><Badge map={CSTATUS} k={c.status} /><span>{c.name || c.email}</span><small className="muted">{c.paid ? CHF(c.paid) : ''}</small></li>))}</ul> : <Empty>Aucun client pour l’instant.</Empty>}
        </section>
      </div>
    </>
  );
}

/* ---------- clients ---------- */
function Clients({ data, openClient }) {
  const [q, setQ] = useState('');
  const [f, setF] = useState('all');
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return data.clients.filter((c) => (f === 'all' || c.status === f || (f === 'member' && c.status === 'member_ending'))
      && (!s || [c.name, c.email, c.phone, c.country, c.note].join(' ').toLowerCase().includes(s)));
  }, [data.clients, q, f]);
  return (
    <section className="card">
      <header className="card-h"><h2>Clients <small>{list.length}</small></h2>
        <button type="button" className="ghost" onClick={() => downloadCsv('clients', [['Nom', (c) => c.name], ['E-mail', (c) => c.email], ['Téléphone', (c) => c.phone], ['Pays', (c) => c.country], ['Statut', (c) => (CSTATUS[c.status] || [])[0]], ['Total payé', (c) => c.paid.toFixed(2)], ['Premier contact', (c) => d(c.first)], ['Dernier contact', (c) => d(c.last)], ['Note', (c) => c.note]], list)}>Exporter CSV</button></header>
      <div className="toolbar">
        <div className="seg">{[['all', 'Tous'], ['member', 'Membres'], ['customer', 'Clients'], ['ex_member', 'Anciens membres'], ['prospect', 'Prospects']].map(([k, v]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{v}</button>)}</div>
        <input type="search" placeholder="Rechercher un nom, un e-mail, un téléphone…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {list.length ? (
        <div className="table-wrap"><table className="table">
          <thead><tr><th>Client</th><th>Statut</th><th>Téléphone</th><th>Pays</th><th className="num">Total payé</th><th>Dernière activité</th></tr></thead>
          <tbody>{list.map((c) => (
            <tr key={c.key} className="clickable" onClick={() => openClient(c.key)}>
              <td><b>{c.name || '—'}</b><div className="muted small">{c.email}</div></td>
              <td><Badge map={CSTATUS} k={c.status} /></td>
              <td className="small">{c.phone || '—'}</td>
              <td className="small">{c.country || '—'}</td>
              <td className="num">{c.paid ? CHF(c.paid) : '—'}</td>
              <td className="small">{d(c.last)}</td>
            </tr>))}</tbody>
        </table></div>
      ) : <Empty>Aucun client ne correspond.</Empty>}
    </section>
  );
}

function ClientDrawer({ c, onClose, onNote, onDeleted }) {
  const [note, setNote] = useState(c.note || '');
  const [saved, setSaved] = useState(false);
  useEffect(() => { setNote(c.note || ''); setSaved(false); }, [c.key, c.note]);
  useEffect(() => { const k = (e) => e.key === 'Escape' && onClose(); document.addEventListener('keydown', k); return () => document.removeEventListener('keydown', k); }, [onClose]);
  const timeline = [
    ...c.payments.map((p) => ({ t: p.created, icon: '💳', txt: `${PRODUCT[p.product]} · ${CHF(p.amount)}${p.refunded ? ` (remboursé ${CHF(p.refunded)})` : ''}${p.method ? ` · ${METHOD[p.method] || p.method}` : ''}`, link: p.link })),
    ...c.subs.map((s) => ({ t: s.created, icon: '⭐', txt: `Abonnement Club ${CHF(s.amount)}/mois · ${(SSTATUS[s.status] || [s.status])[0]}${s.cancelAtEnd ? ' · résiliation à la fin de la période' : ''}`, link: s.link })),
    ...c.bookings.map((b) => ({ t: Date.parse(b.createdAt), icon: '📅', txt: `Rendez-vous réservé pour le ${slotLabel(b.date, bMin(b))} (heure suisse)${clientTime(b) ? ` · ${clientTime(b)}` : ''}` })),
    ...c.leads.map((l) => ({ t: Date.parse(l.createdAt), icon: '✉️', txt: `${(KIND[l.kind] || [l.kind])[0]}${l.message ? ` : « ${l.message} »` : ''}` })),
  ].sort((a, b) => b.t - a.t);
  const activeSub = c.subs.find((s) => ACTIVE.includes(s.status));
  return (
    <div className="drawer-bg" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`Fiche ${c.name || c.email}`}>
        <button type="button" className="x" onClick={onClose} aria-label="Fermer">×</button>
        <div className="drawer-h">
          <div className="avatar">{(c.name || c.email || '?').slice(0, 1).toUpperCase()}</div>
          <div><h2>{c.name || c.email}</h2><Badge map={CSTATUS} k={c.status} /></div>
        </div>
        <div className="actions">
          {c.phone && <a className="btn wa-btn" href={wa(c.phone)} target="_blank" rel="noopener">WhatsApp</a>}
          {c.email && <a className="btn ghost" href={`mailto:${c.email}`}>E-mail</a>}
          {c.phone && <a className="btn ghost" href={`tel:${c.phone}`}>Appeler</a>}
        </div>
        <dl className="facts">
          <dt>E-mail</dt><dd>{c.email || '—'}</dd>
          <dt>Téléphone</dt><dd>{c.phone || '—'}</dd>
          <dt>Pays</dt><dd>{c.country || '—'}</dd>
          <dt>Total payé</dt><dd><b>{CHF(c.paid)}</b></dd>
          <dt>Abonnement</dt><dd>{activeSub ? `Actif · renouvellement le ${d(activeSub.renews)}${activeSub.cancelAtEnd ? ' (résilie)' : ''}` : c.subs.length ? 'Terminé' : '—'}</dd>
          <dt>Client depuis</dt><dd>{d(c.first)}</dd>
        </dl>
        <label className="note-l">Note privée
          <textarea rows={3} value={note} onChange={(e) => { setNote(e.target.value); setSaved(false); }} placeholder="Ex. : permis B, cherche un appartement à Lausanne, rappeler en janvier…" />
        </label>
        <button type="button" className="btn small-btn" onClick={async () => { await onNote(c.key, note); setSaved(true); }}>{saved ? 'Enregistré ✓' : 'Enregistrer la note'}</button>
        <h3>Historique</h3>
        <ol className="timeline">{timeline.map((e, i) => (
          <li key={i}><span className="ti">{e.icon}</span><div><div>{e.txt}</div><small className="muted">{dt(e.t)}{e.link && <> · <a href={e.link} target="_blank" rel="noopener">voir dans Stripe ↗</a></>}</small></div></li>))}</ol>
        <div className="danger-zone">
          <b>Protection des données</b>
          <p className="muted small">Si ce client te demande d’effacer ses données : supprime ici ses demandes, rendez-vous et ta note. Ses paiements restent dans Stripe (obligation comptable), tu peux y supprimer le client séparément.</p>
          <button type="button" className="ghost danger-t" onClick={async () => {
            if (!confirm(`Supprimer définitivement toutes les données de ${c.name || c.email || 'ce client'} enregistrées sur le site ?`)) return;
            await fetch('/api/admin/client', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: c.key, email: c.email, phone: c.phone }) });
            onDeleted();
          }}>Supprimer toutes les données de ce client</button>
        </div>
      </aside>
    </div>
  );
}

/* ---------- payments ---------- */
function Payments({ data }) {
  const [f, setF] = useState('all');
  const list = data.payments.filter((p) => f === 'all' || p.product === f);
  const total = list.reduce((s, p) => s + p.amount - p.refunded, 0);
  return (
    <section className="card">
      <header className="card-h"><h2>Paiements <small>{list.length} · {CHF(total)} net</small></h2>
        <button type="button" className="ghost" onClick={() => downloadCsv('paiements', [['Date', (p) => dt(p.created)], ['Client', (p) => p.name], ['E-mail', (p) => p.email], ['Produit', (p) => PRODUCT[p.product]], ['Montant', (p) => p.amount.toFixed(2)], ['Remboursé', (p) => p.refunded.toFixed(2)], ['Moyen', (p) => METHOD[p.method] || p.method], ['ID Stripe', (p) => p.id]], list)}>Exporter CSV</button></header>
      <div className="toolbar"><div className="seg">{[['all', 'Tous'], ['club', 'Club'], ['consultation', 'Consultations'], ['autre', 'Autres']].map(([k, v]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{v}</button>)}</div></div>
      {list.length ? (
        <div className="table-wrap"><table className="table">
          <thead><tr><th>Date</th><th>Client</th><th>Produit</th><th>Moyen</th><th className="num">Montant</th><th /></tr></thead>
          <tbody>{list.map((p) => (
            <tr key={p.id}>
              <td className="small">{dt(p.created)}</td>
              <td><b>{p.name || '—'}</b><div className="muted small">{p.email}</div></td>
              <td className="small">{PRODUCT[p.product]}</td>
              <td className="small">{METHOD[p.method] || p.method || '—'}</td>
              <td className="num">{CHF(p.amount)}{p.refunded ? <div className="small refund">−{CHF(p.refunded)} remboursé</div> : null}</td>
              <td><a href={p.link} target="_blank" rel="noopener" className="small">Stripe ↗</a></td>
            </tr>))}</tbody>
        </table></div>
      ) : <Empty>{data.stripeError ? `Stripe : ${data.stripeError}` : 'Aucun paiement pour l’instant.'}</Empty>}
    </section>
  );
}

/* ---------- members ---------- */
function Members({ data }) {
  const [f, setF] = useState('active');
  const list = data.subs.filter((s) => (f === 'active' ? ACTIVE.includes(s.status) : f === 'ended' ? !ACTIVE.includes(s.status) : true));
  return (
    <section className="card">
      <header className="card-h"><h2>Membres Club <small>{list.length}</small></h2></header>
      <div className="toolbar"><div className="seg">{[['active', 'Actifs'], ['ended', 'Terminés'], ['all', 'Tous']].map(([k, v]) => <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{v}</button>)}</div></div>
      {list.length ? (
        <div className="table-wrap"><table className="table">
          <thead><tr><th>Membre</th><th>Statut</th><th>Depuis</th><th>Renouvellement</th><th className="num">Prix</th><th /></tr></thead>
          <tbody>{list.map((s) => (
            <tr key={s.id}>
              <td><b>{s.name || '—'}</b><div className="muted small">{s.email}</div></td>
              <td><Badge map={SSTATUS} k={s.status} />{s.cancelAtEnd && <div className="small refund">résilie à la fin de la période</div>}</td>
              <td className="small">{d(s.created)}</td>
              <td className="small">{ACTIVE.includes(s.status) ? d(s.renews) : '—'}</td>
              <td className="num">{CHF(s.amount)}/mois</td>
              <td><a href={s.link} target="_blank" rel="noopener" className="small">Stripe ↗</a></td>
            </tr>))}</tbody>
        </table></div>
      ) : <Empty>Aucun membre dans cette liste.</Empty>}
    </section>
  );
}

/* ---------- agenda ---------- */
const WD = ['', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
function Agenda({ onChanged }) {
  const [week, setWeek] = useState(0);
  const [g, setG] = useState(null);
  const [tpl, setTpl] = useState(null);
  const [showTpl, setShowTpl] = useState(false);
  const [sel, setSel] = useState(null);
  const load = useCallback(() => fetch(`/api/admin/agenda?week=${week}`, { cache: 'no-store' }).then((r) => r.json()).then((j) => { setG(j.ok === false ? { error: j.error || 'accès refusé' } : j); setTpl(j.template || null); }).catch(() => setG({ error: 'réseau' })), [week]);
  useEffect(() => { load(); }, [load]);
  if (g && g.error) return <section className="card"><p className="err">L’agenda n’a pas pu être chargé ({g.error}). Recharge la page.</p></section>;
  if (!g || !Array.isArray(g.dates) || !Array.isArray(g.slots) || !g.today) return <section className="card"><p className="muted">Chargement de l’agenda…</p></section>;
  const toggle = async (date, min) => { await post('/api/admin/agenda', { action: 'toggle', date, min }); load(); };
  const cancel = async (b) => { if (!confirm(`Annuler le rendez-vous de ${b.name || b.email || 'ce client'} (${slotLabel(b.date, bMin(b))}) ? Pense à le prévenir.`)) return; await post('/api/admin/agenda', { action: 'cancel', id: b.id }); setSel(null); load(); onChanged(); };
  const saveTpl = async () => { await post('/api/admin/agenda', { action: 'template', template: tpl }); setShowTpl(false); load(); };
  const past = (date, min) => `${date}:${String(min).padStart(4, '0')}` < `${g.today.date}:${String(g.today.min).padStart(4, '0')}`;
  return (
    <>
      <section className="card">
        <header className="card-h">
          <h2>Semaine <small>du {d(Date.parse(g.dates[0]))} au {d(Date.parse(g.dates[6]))}</small></h2>
          <div className="row-btns">
            <button type="button" className="ghost" onClick={() => setWeek(week - 1)} aria-label="Semaine précédente">←</button>
            <button type="button" className="ghost" onClick={() => setWeek(0)} disabled={week === 0}>Aujourd’hui</button>
            <button type="button" className="ghost" onClick={() => setWeek(week + 1)} aria-label="Semaine suivante">→</button>
            <button type="button" className="btn" onClick={() => setShowTpl(!showTpl)}>Mes horaires habituels</button>
            <a className="ghost" href="/es/reserva?preview=1" target="_blank" rel="noopener">👀 Voir ce que voit le client</a>
          </div>
        </header>
        <p className="muted small legend">Clique sur une case pour l’ouvrir ou la fermer ce jour-là. <span className="lg lg-open">Libre</span><span className="lg lg-closed">Fermé</span><span className="lg lg-booked">Réservé</span> Heure suisse, créneaux de 30 minutes.</p>
        <div className="cal-wrap"><table className="cal">
          <thead><tr><th />{g.dates.map((dd) => <th key={dd} className={dd === g.today.date ? 'today' : ''}>{new Date(`${dd}T12:00:00Z`).toLocaleDateString('fr-CH', { timeZone: 'UTC', weekday: 'short', day: '2-digit', month: '2-digit' })}</th>)}</tr></thead>
          <tbody>{g.slots.map((h) => (
            <tr key={h} className={h % 60 ? 'half' : ''}><th>{hm(h)}</th>{g.dates.map((dd) => {
              const k = `${dd}:${h}`; const state = g.cells[k]; const b = g.bookings[k]; const isPast = past(dd, h);
              return (
                <td key={k} className={`c-${state} ${isPast ? 'past' : ''}`}>
                  {state === 'booked'
                    ? <button type="button" onClick={() => b && setSel(b)} title="Voir le rendez-vous">{!b ? 'Réservé' : b.test ? 'Test' : (b.name || b.email || 'Réservé').split(' ')[0]}</button>
                    : <button type="button" disabled={isPast} onClick={() => toggle(dd, h)} aria-label={`${dd} ${hm(h)} : ${state === 'open' ? 'libre, cliquer pour fermer' : 'fermé, cliquer pour ouvrir'}`}>{state === 'open' ? 'libre' : ''}</button>}
                </td>);
            })}</tr>))}</tbody>
        </table></div>
      </section>
      {showTpl && tpl && (
        <section className="card">
          <header className="card-h"><h2>Mes horaires habituels</h2><button type="button" className="btn" onClick={saveTpl}>Enregistrer</button></header>
          <p className="muted small">Coche les créneaux de 30 minutes où tu es disponible chaque semaine (ex. 17:00, 17:30… 19:30 pour être libre de 17h à 20h). Tu peux ensuite ouvrir ou fermer un créneau précis dans la grille.</p>
          <div className="tpl">{[1, 2, 3, 4, 5, 6, 7].map((wd) => (
            <div key={wd} className="tpl-row"><b>{WD[wd]}</b><div className="tpl-h">{g.slots.map((h) => {
              const on = (tpl[wd] || []).includes(h);
              return <button key={h} type="button" aria-pressed={on} onClick={() => setTpl({ ...tpl, [wd]: on ? tpl[wd].filter((x) => x !== h) : [...(tpl[wd] || []), h] })}>{hm(h)}</button>;
            })}</div></div>))}</div>
        </section>
      )}
      {sel && (
        <div className="drawer-bg" onClick={() => setSel(null)}>
          <aside className="drawer small-drawer" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="x" onClick={() => setSel(null)} aria-label="Fermer">×</button>
            <h2>📅 {slotLabel(sel.date, bMin(sel))}</h2>
            <dl className="facts"><dt>Client</dt><dd>{sel.name || '—'}{sel.test ? ' (test)' : ''}</dd><dt>E-mail</dt><dd>{sel.email || '—'}</dd><dt>Téléphone</dt><dd>{sel.phone || '—'}</dd><dt>Heure du client</dt><dd>{clientTime(sel) || 'heure suisse'}</dd><dt>Durée</dt><dd>{sel.duration || 60} minutes</dd><dt>Réservé le</dt><dd>{dt(sel.createdAt)}</dd></dl>
            <div className="actions">
              {sel.phone && <a className="btn wa-btn" href={wa(sel.phone)} target="_blank" rel="noopener">WhatsApp</a>}
              {sel.email && <a className="btn ghost" href={`mailto:${sel.email}`}>E-mail</a>}
              <button type="button" className="btn danger" onClick={() => cancel(sel)}>Annuler le rendez-vous</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

/* ---------- leads ---------- */
function LeadCard({ l, onPatch, onDelete }) {
  const [note, setNote] = useState(l.note || '');
  useEffect(() => setNote(l.note || ''), [l.note]);
  return (
    <article className={`lead st-${l.status}`}>
      <header>
        <Badge map={KIND} k={l.kind} />
        <b>{l.first || l.last ? `${l.first} ${l.last}` : l.email}</b>
        <span className="muted small">{[l.country, l.canton, l.lang?.toUpperCase()].filter(Boolean).join(' · ')}</span>
        <time className="muted small">{dt(l.createdAt)}</time>
      </header>
      {l.message && <p className="msg">{l.message}</p>}
      <div className="contact">
        {l.phone && <a href={wa(l.phone)} target="_blank" rel="noopener" className="wa">WhatsApp {l.phone}</a>}
        {l.email && <a href={`mailto:${l.email}`}>{l.email}</a>}
        {l.phone && <a href={`tel:${l.phone}`}>Appeler</a>}
      </div>
      <div className="lead-actions">
        <select value={l.status} onChange={(e) => onPatch(l.id, { status: e.target.value })} aria-label="Statut">{Object.entries(LSTATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <textarea rows={1} placeholder="Note interne…" value={note} onChange={(e) => setNote(e.target.value)} onBlur={() => note !== (l.note || '') && onPatch(l.id, { note })} />
        <button type="button" className="ghost danger-t" onClick={() => confirm('Supprimer cette demande ?') && onDelete(l.id)}>Supprimer</button>
      </div>
    </article>
  );
}
function Leads({ data, setData }) {
  const [kind, setKind] = useState('all');
  const [status, setStatus] = useState('open');
  const [q, setQ] = useState('');
  const patch = async (id, p) => { setData((x) => ({ ...x, leads: x.leads.map((l) => (l.id === id ? { ...l, ...p } : l)) })); await post('/api/admin/leads', { id, ...p }, 'PATCH'); };
  const del = async (id) => { setData((x) => ({ ...x, leads: x.leads.filter((l) => l.id !== id) })); await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); };
  const s = q.trim().toLowerCase();
  const list = data.leads.filter((l) => (kind === 'all' || l.kind === kind) && (status === 'all' || (status === 'open' ? l.status !== 'cerrado' : l.status === status))
    && (!s || [l.first, l.last, l.email, l.phone, l.country, l.message, l.note].join(' ').toLowerCase().includes(s)));
  return (
    <section className="card">
      <header className="card-h"><h2>Demandes <small>{list.length}</small></h2>
        <button type="button" className="ghost" onClick={() => downloadCsv('demandes', [['Date', (l) => dt(l.createdAt)], ['Type', (l) => (KIND[l.kind] || [l.kind])[0]], ['Statut', (l) => LSTATUS[l.status]], ['Prénom', (l) => l.first], ['Nom', (l) => l.last], ['Téléphone', (l) => l.phone], ['E-mail', (l) => l.email], ['Pays', (l) => l.country], ['Message', (l) => l.message], ['Note', (l) => l.note]], list)}>Exporter CSV</button></header>
      <div className="toolbar">
        <div className="seg">{[['all', 'Tout'], ['llamada', 'Rappels'], ['pregunta', 'Questions'], ['contacto', 'Contact'], ['rdv', 'Rendez-vous'], ['pago', 'Consultations'], ['club_pago', 'Membres'], ['club', 'Intérêt Club']].map(([k, v]) => <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>{v}</button>)}</div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Statut"><option value="open">À traiter</option><option value="all">Tous les statuts</option>{Object.entries(LSTATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <input type="search" placeholder="Rechercher…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {list.length ? <div className="leads">{list.map((l) => <LeadCard key={l.id} l={l} onPatch={patch} onDelete={del} />)}</div> : <Empty>Aucune demande ici.</Empty>}
    </section>
  );
}

/* ---------- news editor ---------- */
const todayCH = () => new Date().toLocaleDateString('fr-CH', { timeZone: 'Europe/Zurich', day: '2-digit', month: '2-digit', year: 'numeric' });
const blankNews = () => ({ id: '', cat: 'inmigracion', k: ['', ''], t: ['', ''], s: ['', ''], you: ['', ''], date: todayCH(), top: false, go: '', img: '', imgUrl: '', imgCredit: '', src: [['', ''], ['', '']] });
const unesc = (t) => String(t || '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const GUIDES = [['', 'Aucun'], ['#instalados-seguro', 'Seguro médico'], ['#instalados-subsidios', 'Subsidios'], ['#instalados-trabajo', 'Trabajo y paro'], ['#instalados-transporte', 'Transporte'], ['#instalados-impuestos', 'Impuestos'], ['#instalados-vivienda', 'Vivienda'], ['#instalados-familia', 'Familia'], ['#guia-permisos', 'Guía permisos'], ['#guia-visa', 'Guía visa D'], ['#vivir-en-suiza', 'Vivir en Suiza'], ['#club', 'Club']];
function Bi({ label, hint, v, set, rows, max }) {
  return (
    <div className="bi"><b>{label}</b>{hint && <small className="muted">{hint}</small>}
      <div className="bi-row">
        {[0, 1].map((i) => (rows
          ? <textarea key={i} rows={rows} maxLength={max} placeholder={i ? 'Français (facultatif)' : 'Español'} value={v[i]} onChange={(e) => { const n = [...v]; n[i] = e.target.value; set(n); }} />
          : <input key={i} maxLength={max} placeholder={i ? 'Français (facultatif)' : 'Español'} value={v[i]} onChange={(e) => { const n = [...v]; n[i] = e.target.value; set(n); }} />))}
      </div>
    </div>
  );
}
function NewsEditor({ init, meta, onDone }) {
  const [n, setN] = useState(init);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const up = (k) => (v) => setN((x) => ({ ...x, [k]: v }));
  const save = async () => {
    setBusy(true); setErr('');
    const body = { ...n, date: n.date.split('-').length === 3 ? n.date.split('-').reverse().join('.') : n.date, src: n.src.filter((x) => x[0] && x[1]) };
    const r = await post('/api/admin/news', body);
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) onDone(j.item); else setErr(j.error === 'title_required' ? 'Le titre en espagnol est obligatoire.' : j.error === 'summary_required' ? 'Le résumé en espagnol est obligatoire.' : 'Enregistrement impossible.');
  };
  const isoDate = /^\d{2}\.\d{2}\.\d{4}$/.test(n.date) ? n.date.split('.').reverse().join('-') : n.date;
  return (
    <section className="card news-ed">
      <header className="card-h"><h2>{n.id ? 'Modifier l’actualité' : 'Nouvelle actualité'}</h2><div className="row-btns"><button type="button" className="ghost" onClick={() => onDone(null)}>Annuler</button><button type="button" className="btn" disabled={busy} onClick={save}>{busy ? 'Publication…' : n.id ? 'Enregistrer' : 'Publier'}</button></div></header>
      {err && <p className="err">{err}</p>}
      <div className="ed-grid">
        <label>Catégorie<select value={n.cat} onChange={(e) => up('cat')(e.target.value)}>{Object.entries(meta.cats).map(([k, v]) => <option key={k} value={k}>{v[1]}</option>)}</select></label>
        <label>Date<input type="date" value={isoDate} onChange={(e) => up('date')(e.target.value)} /><small className="muted">Date future = apparaît dans « Prochaines dates ».</small></label>
        <label className="chk"><input type="checkbox" checked={n.top} onChange={(e) => up('top')(e.target.checked)} /> À la une (grande photo en haut)</label>
      </div>
      <Bi label="Surtitre" hint="1 à 3 mots, ex. « Seguro médico »" v={n.k} set={up('k')} max={40} />
      <Bi label="Titre *" v={n.t} set={up('t')} max={160} />
      <Bi label="Résumé *" hint="2 à 4 phrases : ce qui se passe, chiffres, date." v={n.s} set={up('s')} rows={4} max={1500} />
      <Bi label="Ce que ça change pour toi" hint="Le conseil concret pour tes lecteurs." v={n.you} set={up('you')} rows={3} max={800} />
      <label className="full">Lien vers une page du site (bouton « Voir le guide »)<select value={n.go} onChange={(e) => up('go')(e.target.value)}>{GUIDES.map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
      <div className="bi"><b>Photo</b><small className="muted">Choisis une photo de la bibliothèque, ou colle l’adresse (https://) d’une image libre de droits.</small>
        <div className="photos">
          <button type="button" aria-pressed={!n.img && !n.imgUrl} onClick={() => setN((x) => ({ ...x, img: '', imgUrl: '' }))} className="ph-none">Sans photo</button>
          {meta.photos.map((k) => <button key={k} type="button" aria-pressed={n.img === k} onClick={() => setN((x) => ({ ...x, img: k, imgUrl: '' }))}><img src={`/news/${k}-400.jpg`} alt={k} loading="lazy" /></button>)}
        </div>
        <div className="bi-row"><input placeholder="https://… (image externe, facultatif)" value={n.imgUrl} onChange={(e) => setN((x) => ({ ...x, imgUrl: e.target.value, img: '' }))} /><input placeholder="Crédit photo (auteur, licence)" value={n.imgCredit} onChange={(e) => up('imgCredit')(e.target.value)} /></div>
      </div>
      <div className="bi"><b>Sources</b><small className="muted">Nom de la source et lien de l’article officiel ou de presse.</small>
        {n.src.map((x, i) => (
          <div className="bi-row" key={i}><input placeholder="ex. admin.ch" value={x[0]} onChange={(e) => { const s2 = n.src.map((y) => [...y]); s2[i][0] = e.target.value; up('src')(s2); }} /><input placeholder="https://…" value={x[1]} onChange={(e) => { const s2 = n.src.map((y) => [...y]); s2[i][1] = e.target.value; up('src')(s2); }} /></div>
        ))}
        {n.src.length < 5 && <button type="button" className="link" onClick={() => up('src')([...n.src, ['', '']])}>+ Ajouter une source</button>}
      </div>
    </section>
  );
}
function NewsAdmin() {
  const [d, setD] = useState(null);
  const [edit, setEdit] = useState(null);
  const [flash, setFlash] = useState('');
  const load = useCallback(() => fetch('/api/admin/news', { cache: 'no-store' }).then((r) => r.json()).then(setD), []);
  useEffect(() => { load(); }, [load]);
  if (!d || !d.cats) return <section className="card"><p className="muted">Chargement…</p></section>;
  if (edit) return <NewsEditor init={edit} meta={d} onDone={(item) => { setEdit(null); if (item) setFlash(`« ${unesc(item.t[0])} » est en ligne.`); load(); }} />;
  const del = async (n) => { if (!confirm(`Supprimer « ${unesc(n.t[0])} » du site ?`)) return; await fetch(`/api/admin/news?id=${encodeURIComponent(n.id)}`, { method: 'DELETE' }); load(); };
  const open = (n) => setEdit({ ...blankNews(), ...n, k: n.k.map(unesc), t: n.t.map(unesc), s: n.s.map(unesc), you: (n.you || ['', '']).map(unesc), imgCredit: unesc(n.imgCredit), src: n.src.length ? n.src.map((x) => [unesc(x[0]), x[1]]) : [['', '']] });
  return (
    <>
      {flash && <div className="okmsg">✅ {flash} <a href="/es/noticias" target="_blank" rel="noopener">Voir Suiza News ↗</a></div>}
      <section className="card">
        <header className="card-h"><h2>Actualités publiées depuis le CMS <small>{d.cms.length}</small></h2><button type="button" className="btn" onClick={() => setEdit(blankNews())}>+ Nouvelle actualité</button></header>
        {d.cms.length ? (
          <div className="table-wrap"><table className="table">
            <thead><tr><th>Date</th><th>Titre</th><th>Catégorie</th><th /></tr></thead>
            <tbody>{d.cms.map((n) => (
              <tr key={n.id}>
                <td className="small">{n.date}{n.top && <div><span className="badge k-rdv">À la une</span></div>}</td>
                <td><b>{unesc(n.t[0])}</b><div className="muted small">Modifiée le {dt(n.updatedAt)}</div></td>
                <td className="small">{(d.cats[n.cat] || [])[1]}</td>
                <td className="row-btns"><a className="ghost" href={`/es/noticias/${n.id}`} target="_blank" rel="noopener">Voir</a><button type="button" className="ghost" onClick={() => open(n)}>Modifier</button><button type="button" className="ghost danger-t" onClick={() => del(n)}>Supprimer</button></td>
              </tr>))}</tbody>
          </table></div>
        ) : <Empty>Aucune actualité publiée depuis le CMS. Clique sur « Nouvelle actualité ».</Empty>}
      </section>
      <section className="card">
        <header className="card-h"><h2>Actualités de base <small>{d.file.length}</small></h2></header>
        <p className="muted small">Celles-ci sont dans le code du site (lib/news.js). Pour en modifier une, crée une nouvelle actualité ou demande-le-moi.</p>
        <ul className="rows">{d.file.map((n) => <li key={n.id}><span className="small muted" style={{ minWidth: 90, flex: 'none' }}>{n.date}</span><span>{n.t[0]}</span><a className="small" href={`/es/noticias/${n.id}`} target="_blank" rel="noopener">Voir ↗</a></li>)}</ul>
      </section>
    </>
  );
}

/* ---------- settings ---------- */
function EmailPreviews() {
  const [lang, setLang] = useState('es');
  const [list, setList] = useState(null);
  const [i, setI] = useState(0);
  useEffect(() => { setList(null); fetch(`/api/admin/email-preview?lang=${lang}`, { cache: 'no-store' }).then((r) => r.json()).then((j) => setList(j.emails || [])).catch(() => setList([])); }, [lang]);
  const cur = list && list[i];
  return (
    <section className="card">
      <header className="card-h"><h2>E-mails envoyés aux clients</h2><div className="seg">{[['es', 'Espagnol'], ['fr', 'Français']].map(([k, v]) => <button key={k} type="button" aria-pressed={lang === k} onClick={() => setLang(k)}>{v}</button>)}</div></header>
      <p className="muted small">Aperçu avec des données d’exemple. Rien n’est envoyé.</p>
      {!list ? <p className="muted">Chargement…</p> : (
        <div className="mails">
          <div className="mail-list">{list.map((m, k) => <button key={k} type="button" aria-pressed={k === i} onClick={() => setI(k)}>{m.label}</button>)}</div>
          {cur && <div className="mail-view"><div className="mail-meta"><b>Objet :</b> {cur.subject}<br /><b>À :</b> {cur.to}{cur.attachments && cur.attachments.length ? <><br /><b>Pièce jointe :</b> {cur.attachments.join(', ')}</> : null}</div><iframe title={cur.label} srcDoc={cur.html} sandbox="" /></div>}
        </div>
      )}
    </section>
  );
}

function ErrorsPanel() {
  const [list, setList] = useState(null);
  const load = useCallback(() => fetch('/api/admin/errors', { cache: 'no-store' }).then((r) => r.json()).then((j) => setList(j.errors || [])).catch(() => setList([])), []);
  useEffect(() => { load(); }, [load]);
  return (
    <section className="card">
      <header className="card-h"><h2>Erreurs récentes <small>{list ? list.length : ''}</small></h2>{list && list.length > 0 && <button type="button" className="ghost" onClick={async () => { await fetch('/api/admin/errors', { method: 'DELETE' }); load(); }}>Tout effacer</button>}</header>
      {!list ? <p className="muted">Chargement…</p> : list.length ? (
        <ul className="errs">{list.map((e, i) => (
          <li key={i}><div><span className="badge k-rdv">{e.source}</span> <b>{e.message}</b></div><small className="muted">{dt(e.at)}{e.url ? ` · ${e.url}` : ''}</small>{e.stack && <details><summary className="small">Détails techniques</summary><pre>{e.stack}</pre></details>}</li>))}</ul>
      ) : <Empty>Aucune erreur enregistrée 👍</Empty>}
    </section>
  );
}

function Settings({ st }) {
  return (
    <>
      <EmailPreviews />
      <ErrorsPanel />
      <section className="card"><header className="card-h"><h2>État de la configuration</h2></header><StatusList st={st} /></section>
      <section className="card"><header className="card-h"><h2>Aperçus (sans paiement)</h2></header>
        <p className="muted small">Voir exactement ce que voient tes clients après avoir payé. Une réservation faite en aperçu est marquée « test » : annule-la ensuite dans l’Agenda.</p>
        <div className="actions"><a className="btn ghost" href="/es/reserva?preview=1" target="_blank" rel="noopener">Page après consultation 39.- (calendrier)</a><a className="btn ghost" href="/es/club/bienvenida?preview=1" target="_blank" rel="noopener">Page de bienvenue Club</a></div>
      </section>
    </>
  );
}

/* ---------- shell ---------- */
const NAV = [['dash', 'Tableau de bord', '📊'], ['clients', 'Clients', '👥'], ['payments', 'Paiements', '💳'], ['members', 'Membres Club', '⭐'], ['agenda', 'Agenda', '📅'], ['leads', 'Demandes', '✉️'], ['news', 'Actualités', '📰'], ['settings', 'Réglages', '⚙️']];

function useErrorReporting() {
  useEffect(() => {
    let sent = 0;
    const send = (message, stack) => { if (sent >= 5 || !message) return; sent += 1; try { fetch('/api/log-error', { method: 'POST', keepalive: true, body: JSON.stringify({ message: `[CMS] ${String(message).slice(0, 280)}`, stack: String(stack || '').slice(0, 800), url: location.href }) }); } catch (e) { /* ignore */ } };
    const onErr = (e) => send(e.message, e.error?.stack);
    const onRej = (e) => send(e.reason?.message || e.reason, e.reason?.stack);
    window.addEventListener('error', onErr); window.addEventListener('unhandledrejection', onRej);
    return () => { window.removeEventListener('error', onErr); window.removeEventListener('unhandledrejection', onRej); };
  }, []);
}

export default function Admin() {
  useErrorReporting();
  const [state, setState] = useState('loading');
  const [data, setData] = useState(null);
  const [sec, setSec] = useState('dash');
  const [client, setClient] = useState(null);
  const st = useStatus();

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/overview', { cache: 'no-store' });
    if (r.status === 401) return setState('login');
    if (r.status === 503) return setState('nostore');
    setData(await r.json()); setState('ok');
    return undefined;
  }, []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => { try { const s = sessionStorage.getItem('rs-adm-sec'); if (s && NAV.some((n) => n[0] === s)) setSec(s); } catch (e) { /* ignore */ } }, []);
  useEffect(() => { try { sessionStorage.setItem('rs-adm-sec', sec); } catch (e) { /* ignore */ } window.scrollTo(0, 0); }, [sec]);
  useEffect(() => { if (state !== 'ok') return undefined; const t = setInterval(load, 60000); return () => clearInterval(t); }, [state, load]);

  const logout = async () => { await fetch('/api/admin/login', { method: 'DELETE' }); setState('login'); };
  const saveNote = async (key, note) => {
    await post('/api/admin/client', { key, note });
    setData((x) => ({ ...x, clients: x.clients.map((c) => (c.key === key ? { ...c, note } : c)) }));
  };

  if (state === 'loading') return <main className="login"><p className="muted">Chargement…</p></main>;
  if (state === 'login') return <Login onOk={load} />;
  if (state === 'nostore') return <main className="login"><div className="card login-card"><div className="brand">ruta<b>suiza</b> <span>CMS</span></div><p>La base de données n’est pas encore connectée. Dans Vercel : <b>Storage → Create → Upstash Redis</b> (région Frankfurt), connecte-la au projet, puis redéploie.</p></div></main>;

  const fresh = data.leads.filter((l) => l.status === 'nuevo').length;
  const cur = client && data.clients.find((c) => c.key === client);
  return (
    <div className="shell">
      <aside className="side">
        <div className="brand">ruta<b>suiza</b> <span>CMS</span></div>
        <nav>{NAV.map(([k, label, icon]) => (
          <button key={k} type="button" aria-current={sec === k ? 'page' : undefined} onClick={() => setSec(k)}>
            <span className="ni" aria-hidden="true">{icon}</span><span className="nl">{label}</span>{k === 'leads' && fresh > 0 && <i className="dotn">{fresh}</i>}
          </button>))}</nav>
        <div className="side-foot"><a href="/es" target="_blank" rel="noopener">Voir le site ↗</a><button type="button" onClick={logout}>Déconnexion</button></div>
      </aside>
      <main className="main">
        <header className="top">
          <h1>{NAV.find((n) => n[0] === sec)[1]}</h1>
          <div className="row-btns"><span className="muted small">Mis à jour à {new Date(data.now).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' })}</span><button type="button" className="ghost" onClick={load}>Actualiser</button></div>
        </header>
        {sec === 'dash' && <Dashboard data={data} go={setSec} openClient={setClient} st={st} />}
        {sec === 'clients' && <Clients data={data} openClient={setClient} />}
        {sec === 'payments' && <Payments data={data} />}
        {sec === 'members' && <Members data={data} />}
        {sec === 'agenda' && <Agenda onChanged={load} />}
        {sec === 'leads' && <Leads data={data} setData={setData} />}
        {sec === 'news' && <NewsAdmin />}
        {sec === 'settings' && <Settings st={st} />}
      </main>
      {cur && <ClientDrawer c={cur} onClose={() => setClient(null)} onNote={saveNote} onDeleted={() => { setClient(null); load(); }} />}
    </div>
  );
}
