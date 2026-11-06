'use client';

import { useEffect } from 'react';
import * as site from '../lib/site';
import { linkifyDom, hrefFor } from '../lib/links';

const { T, S } = site;

function setHdr() {
  const h = document.querySelector('header.top');
  if (h) document.documentElement.style.setProperty('--hdr', `${h.offsetHeight}px`);
}

export function openModal(lang, kind) {
  const ask = kind === 'ask';
  const modal = document.getElementById('modal');
  if (!modal) return;
  document.getElementById('mtitle').textContent = ask ? T(['Tu primera pregunta es gratis', 'Ta première question est gratuite']) : T(['Pasa a la acción', "Passe à l'action"]);
  document.getElementById('msub').textContent = ask
    ? T(['Escríbenos por WhatsApp en español o francés: una persona del equipo te responde en 24–48 h.', "Écris-nous sur WhatsApp en espagnol ou en français : une personne de l'équipe te répond en 24–48 h."])
    : T(['Asesoría privada: CHF 39, pago único, con garantía. Eliges tu horario y una persona del equipo te llama.', "Accompagnement privé : CHF 39, paiement unique, avec garantie. Tu choisis ton créneau et une personne de l'équipe t'appelle."]);
  const cg = hrefFor('condiciones', lang), pv = hrefFor('privacidad', lang);
  document.getElementById('mnote').innerHTML = ask
    ? T(['El enlace de WhatsApp se activará con el número profesional.', 'Le lien WhatsApp sera activé avec le numéro professionnel.'])
    : T([`Al continuar aceptas las <a href="${cg}">condiciones generales</a> y la <a href="${pv}">política de privacidad</a>. El pago en línea se activará pronto.`, `En continuant, tu acceptes les <a href="${cg}">conditions générales</a> et la <a href="${pv}">politique de confidentialité</a>. Le paiement en ligne sera bientôt activé.`]);
  document.getElementById('mclose').textContent = T(['Seguir mirando', 'Continuer à explorer']);
  const go = document.getElementById('mgo');
  go.textContent = T(['Ver los planes', 'Voir les offres']);
  go.setAttribute('href', hrefFor('precios', lang));
  modal.dataset.open = 'true';
  document.getElementById('mclose').focus();
}

function bindUnlockFor(lang) {
  return () => {
    document.querySelectorAll('.unlock,.buy').forEach((b) => { b.onclick = () => openModal(lang); });
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

export default function Enhance({ lang, view, arg }) {
  useEffect(() => {
    site.setLang(lang);
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
    if (view === 'legal') site.bindContact();
    bindUnlock();
    linkifyDom(main, lang);
    setHdr();
    window.addEventListener('resize', setHdr);

    const modal = document.getElementById('modal');
    const close = () => { if (modal) modal.dataset.open = 'false'; };
    const onModal = (e) => { if (e.target === modal || e.target.closest('a') || e.target.id === 'mclose') close(); };
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
