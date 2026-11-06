'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const KIND = { llamada: ['Rappel', 'k-call'], pregunta: ['Question', 'k-ask'], club: ['Club', 'k-club'] };
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
          <button type="button" onClick={load}>Actualiser</button>
          <button type="button" onClick={() => csv(shown)}>Exporter CSV</button>
          <button type="button" onClick={logout}>Déconnexion</button>
        </div>
      </header>
      <section className="adm-stats">
        <div><b>{fresh}</b><span>nouvelles</span></div>
        <div><b>{count('llamada')}</b><span>rappels</span></div>
        <div><b>{count('pregunta')}</b><span>questions</span></div>
        <div className="adm-club"><b>{count('club')}</b><span>intéressés Club</span></div>
      </section>
      <section className="adm-filters">
        <div className="adm-seg">{[['all', 'Tout'], ['llamada', 'Rappels'], ['pregunta', 'Questions'], ['club', 'Club']].map(([k, v]) => (
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
