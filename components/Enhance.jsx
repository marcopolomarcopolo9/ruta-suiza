'use client';

import { useEffect } from 'react';
import * as site from '../lib/site';
import { linkifyDom, hrefFor } from '../lib/links';

const { T, S } = site;

function setHdr() {
  const h = document.querySelector('header.top');
  if (h) document.documentElement.style.setProperty('--hdr', `${h.offsetHeight}px`);
}

const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export async function startCheckout(lang, btn, product) {
  if (btn) btn.disabled = true;
  try {
    const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ lang, product }) });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.url) { location.href = j.url; return true; }
  } catch (e) { /* fall through */ }
  if (btn) btn.disabled = false;
  return false;
}

function payUnavailable() {
  const f = document.getElementById('mform');
  if (!f) return;
  ['#mpay', '.paynote', '.lor'].forEach((q) => { const el = f.querySelector(q); if (el) el.hidden = true; });
  if (!f.querySelector('.paydown')) f.insertAdjacentHTML('afterbegin', `<p class="note paydown">${T(['El pago en línea no está disponible en este momento. Déjanos tus datos y te contactamos para fijar tu cita.', 'Le paiement en ligne n\'est pas disponible pour le moment. Laisse tes coordonnées et on te contacte pour fixer ton rendez-vous.'])}</p>`);
}

export function openModal(lang, kind) {
  const ask = kind === 'ask';
  const modal = document.getElementById('modal');
  if (!modal) return;
  site.setLang(lang);
  document.getElementById('mtitle').textContent = ask ? T(['Tu primera pregunta es gratis', 'Ta première question est gratuite']) : T(['Habla con una persona del equipo', "Parle à une personne de l'équipe"]);
  document.getElementById('msub').textContent = ask
    ? T(['Déjanos tus datos y tu pregunta: una persona del equipo te responde en 24–48 h, en español o en francés.', "Laisse-nous tes coordonnées et ta question : une personne de l'équipe te répond en 24–48 h, en espagnol ou en français."])
    : T(['Déjanos tus datos y te llamamos para ver tu caso. Asesoría privada: CHF 39, pago único, con garantía.', "Laisse-nous tes coordonnées et on t'appelle pour voir ton cas. Accompagnement privé : CHF 39, paiement unique, avec garantie."]);
  const pv = hrefFor('privacidad', lang);
  const countries = site.ORDER.map((k) => T(site.C[k].n));
  const f = document.getElementById('mform');
  const ok = document.getElementById('mok');
  ok.hidden = true; f.hidden = false;
  f.innerHTML = `${ask ? '' : `<button type="button" class="btn lpay" id="mpay">${T(['Pagar CHF 39 y elegir mi cita', 'Payer CHF 39 et choisir mon rendez-vous'])}</button><small class="paynote">${T(['Tarjeta, Apple Pay o Google Pay · pago seguro con Stripe', 'Carte, Apple Pay ou Google Pay · paiement sécurisé par Stripe'])}</small><div class="lor"><span>${T(['o déjanos tus datos y te llamamos', 'ou laisse tes coordonnées et on t\'appelle'])}</span></div>`}
    <div class="lrow"><label>${T(['Nombre', 'Prénom'])}<input name="first" required autocomplete="given-name"></label>
    <label>${T(['Apellido', 'Nom'])}<input name="last" required autocomplete="family-name"></label></div>
    <label>${T(['Teléfono (WhatsApp)', 'Téléphone (WhatsApp)'])}<input name="phone" type="tel" required autocomplete="tel" placeholder="+41 79 123 45 67"></label>
    <label>${T(['Correo electrónico', 'E-mail'])}<input name="email" type="email" required autocomplete="email"></label>
    <label>${T(['País de origen', "Pays d'origine"])}<select name="country" required><option value="">${T(['Elige tu país', 'Choisis ton pays'])}</option>${countries.map((c) => `<option>${esc(c)}</option>`).join('')}<option>${T(['Otro', 'Autre'])}</option></select></label>
    <label>${ask ? T(['Tu pregunta', 'Ta question']) : T(['Tu situación en pocas palabras (opcional)', 'Ta situation en quelques mots (facultatif)'])}<textarea name="message" rows="3" ${ask ? 'required' : ''}></textarea></label>
    <input name="website" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
    <label class="check"><input type="checkbox" name="consent" required> <span>${T([`Acepto la <a href="${pv}">política de privacidad</a> y que me contacten para responderme.`, `J'accepte la <a href="${pv}">politique de confidentialité</a> et d'être contacté·e pour une réponse.`])}</span></label>
    <p class="lerr" id="lerr" hidden></p>
    <div class="lbtns"><button class="btn ghost" type="button" id="mclose">${T(['Cancelar', 'Annuler'])}</button><button class="btn" type="submit">${ask ? T(['Enviar mi pregunta', 'Envoyer ma question']) : T(['Quiero que me llamen', 'Je veux être rappelé·e'])}</button></div>`;
  const pay = document.getElementById('mpay');
  if (pay) pay.onclick = async () => { if (!(await startCheckout(lang, pay))) payUnavailable(); };
  f.onsubmit = async (e) => {
    e.preventDefault();
    const err = document.getElementById('lerr');
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(f).entries());
    data.kind = ask ? 'pregunta' : 'llamada'; data.lang = lang; data.page = location.pathname;
    const btn = f.querySelector('button[type=submit]'); btn.disabled = true; err.hidden = true;
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error(String(r.status));
      f.hidden = true; ok.hidden = false;
      ok.innerHTML = `<b>${T(['¡Gracias, ', 'Merci, '])}${esc(data.first)}!</b><p>${T(['Hemos recibido tu mensaje. Te contactamos en 24–48 h por WhatsApp o por correo.', "Nous avons bien reçu ton message. On te contacte dans les 24–48 h par WhatsApp ou par e-mail."])}</p><button class="btn" type="button" id="mclose">${T(['Cerrar', 'Fermer'])}</button>`;
    } catch (x) {
      err.hidden = false;
      err.textContent = T(['No se pudo enviar. Inténtalo de nuevo en unos minutos.', "L'envoi n'a pas fonctionné. Réessaie dans quelques minutes."]);
    } finally { btn.disabled = false; }
  };
  modal.dataset.open = 'true';
  setTimeout(() => f.querySelector('input')?.focus(), 50);
}

function bindClub(lang) {
  const f = document.getElementById('clubform');
  if (!f) return;
  const ok = document.getElementById('clubok');
  const err = f.querySelector('.lerr');
  f.onsubmit = async (e) => {
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const data = Object.fromEntries(new FormData(f).entries());
    data.kind = 'club'; data.lang = lang; data.page = location.pathname;
    const btn = f.querySelector('button[type=submit]'); btn.disabled = true; err.hidden = true;
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error(String(r.status));
      f.hidden = true; ok.hidden = false;
      ok.innerHTML = `<b>${T(['¡Gracias!', 'Merci !'])}</b><p>${T(['Te avisaremos en cuanto abra el Club.', 'On te préviendra dès l\'ouverture du Club.'])}</p>`;
    } catch (x) {
      err.hidden = false;
      err.textContent = T(['No se pudo enviar. Inténtalo de nuevo en unos minutos.', "L'envoi n'a pas fonctionné. Réessaie dans quelques minutes."]);
    } finally { btn.disabled = false; }
  };
}

function bindUnlockFor(lang) {
  return () => {
    document.querySelectorAll('.unlock').forEach((b) => { b.onclick = () => openModal(lang); });
    document.querySelectorAll('.buy-club').forEach((b) => { b.onclick = async () => {
      if (await startCheckout(lang, b, 'club')) return;
      const box = b.parentElement; if (box && !box.querySelector('.paydown')) box.insertAdjacentHTML('beforeend', `<p class="note paydown">${T(['El pago en línea no está disponible en este momento. Déjanos tu correo más abajo y te escribimos.', 'Le paiement en ligne n\'est pas disponible pour le moment. Laisse ton e-mail plus bas et on t\'écrit.'])}</p>`);
    }; });
    document.querySelectorAll('.buy').forEach((b) => { b.onclick = async () => { if (!(await startCheckout(lang, b))) { openModal(lang); payUnavailable(); } }; });
    document.querySelectorAll('.ask').forEach((b) => { b.onclick = () => openModal(lang, 'ask'); });
  };
}

function bindTool() {
  const view = document.getElementById('v-ruta');
  if (!view) return;
  const on = (id, key) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', (e) => {
      const b = e.target.closest('.chip');
      if (!b) return;
      S[key] = b.dataset.v;
      if (key === 'country' && b.dataset.v === 'es') S.dual = false;
      view.innerHTML = site.vRuta();
      bindTool();
      site.renderResult();
    });
  };
  on('t-c', 'country'); on('t-m', 'motive'); on('t-k', 'canton');
  const d = document.getElementById('dual');
  if (d) d.addEventListener('change', (e) => { S.dual = e.target.checked; site.renderResult(); });
}

// report visitors' JavaScript errors to the CMS (once per page load, max 5)
let reporting = false;
function reportErrors() {
  if (reporting || typeof window === 'undefined') return;
  reporting = true;
  let sent = 0;
  const send = (message, stack) => {
    if (sent >= 5 || !message) return; sent += 1;
    try { fetch('/api/log-error', { method: 'POST', keepalive: true, body: JSON.stringify({ message: String(message).slice(0, 300), stack: String(stack || '').slice(0, 800), url: location.href }) }); } catch (e) { /* ignore */ }
  };
  window.addEventListener('error', (e) => { if (e.filename && !e.filename.startsWith(location.origin)) return; send(e.message, e.error?.stack); });
  window.addEventListener('unhandledrejection', (e) => send(e.reason?.message || e.reason, e.reason?.stack));
}

// anonymous page view (no cookie): one beacon per page; "v" marks the first page of a visit
function trackView() {
  try {
    let first = false;
    try { first = !sessionStorage.getItem('rs-v'); sessionStorage.setItem('rs-v', '1'); } catch (e) { first = true; }
    const q = new URLSearchParams(location.search);
    const body = JSON.stringify({ p: location.pathname, r: first ? document.referrer : '', u: first ? (q.get('utm_source') || q.get('ref') || '') : '', v: first ? 1 : 0 });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([body], { type: 'text/plain' }));
    else fetch('/api/track', { method: 'POST', body, keepalive: true });
  } catch (e) { /* ignore */ }
}

export default function Enhance({ lang, view, arg, extra }) {
  useEffect(() => {
    reportErrors();
    trackView();
    site.setLang(lang);
    if (extra) site.setExtraNews(extra);
    const bindUnlock = bindUnlockFor(lang);
    site.setBindUnlock(bindUnlock);
    const main = document.querySelector('main');

    // keep links real after client-side re-renders
    const mo = new MutationObserver(() => linkifyDom(main, lang));
    mo.observe(main, { childList: true, subtree: true });

    // remember a preset chosen on the home page cards
    const onPreset = (e) => {
      const a = e.target.closest('[data-preset]');
      if (a) try { sessionStorage.setItem('rs-preset', a.dataset.preset); } catch (err) { /* ignore */ }
    };
    document.addEventListener('click', onPreset);

    if (view === 'ruta') {
      try {
        const p = sessionStorage.getItem('rs-preset');
        if (p) {
          sessionStorage.removeItem('rs-preset');
          if (p === 'vivo') S.motive = 'vivo';
          else if (site.C[p]) { S.country = p; if (S.motive === 'vivo') S.motive = 'trabajo'; }
        }
      } catch (err) { /* ignore */ }
      document.getElementById('v-ruta').innerHTML = site.vRuta(); // fresh dates
      bindTool();
    }
    let onTab = null, onPop = null;
    if (view === 'instalados') {
      const box = document.getElementById('v-instalados');
      const show = (tab) => { box.innerHTML = site.vInstalados(tab || undefined); site.bindHub(); bindUnlockFor(lang)(); };
      show(arg); // fresh countdown
      // switch tabs without a full page load and without jumping to the top
      const re = new RegExp(`^/${lang}/instalados/([a-z0-9]+)$`);
      onTab = (e) => {
        const a = e.target.closest('a[href]');
        if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button > 0) return;
        const m = a.getAttribute('href').match(re);
        if (!m) return;
        e.preventDefault();
        history.pushState({ tab: m[1] }, '', a.getAttribute('href'));
        show(m[1]);
        const tb = box.querySelector('.tabsbar');
        if (tb) {
          const hdr = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr'), 10) || 61;
          const y = tb.getBoundingClientRect().top + window.scrollY - hdr;
          window.scrollTo(0, Math.min(window.scrollY, y));
        }
        const t = box.querySelector('[aria-selected=true]'); if (t) t.focus({ preventScroll: true });
      };
      onPop = () => { const m = location.pathname.match(re); show(m ? m[1] : undefined); };
      box.addEventListener('click', onTab);
      window.addEventListener('popstate', onPop);
    }
    if (view === 'noticias') site.bindNews();
    if (view === 'blog') site.bindBlog();
    if (view === 'herramienta') site.bindTool(arg);
    if (view === 'club') bindClub(lang);
    if (view === 'legal') site.bindContact();
    bindUnlock();
    linkifyDom(main, lang);
    setHdr();
    window.addEventListener('resize', setHdr);

    const modal = document.getElementById('modal');
    const close = () => { if (modal) modal.dataset.open = 'false'; };
    const onModal = (e) => { if (e.target === modal || e.target.closest('a') || e.target.id === 'mclose' || e.target.id === 'mx') close(); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    modal && modal.addEventListener('click', onModal);
    document.addEventListener('keydown', onKey);

    return () => {
      mo.disconnect();
      if (onTab) document.getElementById('v-instalados')?.removeEventListener('click', onTab);
      if (onPop) window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onPreset);
      window.removeEventListener('resize', setHdr);
      modal && modal.removeEventListener('click', onModal);
      document.removeEventListener('keydown', onKey);
    };
  }, [lang, view, arg]);
  return null;
}
