'use client';

import { useEffect, useState } from 'react';

// 20 steps when arriving in Switzerland, in order. Deadlines checked 8.11.2026.
const STEPS = [
  { g: ['Antes de venir', 'Avant de venir'], items: [
    [['Pasaporte válido', 'Passeport valable'], ['Al menos 3 meses más allá de tu estancia prevista.', 'Au moins 3 mois au-delà du séjour prévu.'], 'paises'],
    [['Actas de nacimiento y matrimonio', 'Actes de naissance et de mariage'], ['Apostilladas y traducidas al idioma de tu cantón.', 'Apostillés et traduits dans la langue de ton canton.'], 'guias/apostilla'],
    [['Tu motivo: contrato, estudios o familia', 'Ton motif : contrat, études ou famille'], ['Sin motivo concreto no hay permiso (salvo pasaporte UE).', 'Sans motif précis, pas de permis (sauf passeport UE).'], 'ruta'],
    [['Visado D (fuera de la UE)', 'Visa D (hors UE)'], ['Se pide cuando el cantón ha aprobado tu permiso.', 'À demander une fois le permis approuvé par le canton.'], 'guias/visa'],
    [['Presupuesto y alojamiento temporal', 'Budget et logement temporaire'], ['Calcula cuánto necesitas al mes en tu ciudad.', 'Calcule combien il te faut par mois dans ta ville.'], 'herramientas/presupuesto'],
  ] },
  { g: ['Las 2 primeras semanas', 'Les 2 premières semaines'], items: [
    [['Anunciarte en tu comuna', 'T\'annoncer à ta commune'], ['En los 14 días siguientes a tu llegada.', 'Dans les 14 jours suivant ton arrivée.'], 'guias/comuna'],
    [['Datos biométricos (fuera de la UE)', 'Données biométriques (hors UE)'], ['El cantón te convoca para la foto y las huellas.', 'Le canton te convoque pour la photo et les empreintes.'], 'blog/permiso-b-suiza'],
    [['Abrir una cuenta bancaria', 'Ouvrir un compte bancaire'], ['Para cobrar tu salario y pagar el alquiler.', 'Pour recevoir ton salaire et payer le loyer.'], null],
    [['Número de móvil suizo', 'Numéro de portable suisse'], ['Lo piden casi todos los formularios.', 'Presque tous les formulaires le demandent.'], null],
    [['Seguro de hogar y responsabilidad civil', 'Assurance ménage et RC'], ['Muchas agencias lo exigen para alquilar.', 'Beaucoup de régies l\'exigent pour louer.'], 'blog/encontrar-piso-ginebra-lausana'],
  ] },
  { g: ['Los 3 primeros meses', 'Les 3 premiers mois'], items: [
    [['Seguro médico (LAMal)', 'Assurance maladie (LAMal)'], ['Obligatorio, en los 3 meses: así te cubre desde el primer día.', 'Obligatoire, dans les 3 mois : tu es alors couvert dès le premier jour.'], 'blog/seguro-medico-suiza'],
    [['Pedir el subsidio del seguro médico', 'Demander le subside d\'assurance maladie'], ['Si tus ingresos son modestos.', 'Si tes revenus sont modestes.'], 'guias/subsidio'],
    [['Inscribir a tus hijos en la escuela', 'Inscrire tes enfants à l\'école'], ['En tu comuna, en cuanto llegues.', 'À ta commune, dès ton arrivée.'], 'instalados/familia'],
    [['Abono de transporte', 'Abonnement de transports'], ['Mensual o anual, más barato que los billetes.', 'Mensuel ou annuel, moins cher que les billets.'], 'instalados/transporte'],
    [['Buscar tu piso definitivo', 'Chercher ton logement définitif'], ['Con el dosier completo y el extracto de deudas.', 'Avec le dossier complet et l\'extrait des poursuites.'], 'blog/encontrar-piso-ginebra-lausana'],
  ] },
  { g: ['El primer año', 'La première année'], items: [
    [['Cambiar tu permiso de conducir', 'Échanger ton permis de conduire'], ['Tu permiso extranjero vale 12 meses desde tu llegada.', 'Ton permis étranger est valable 12 mois depuis ton arrivée.'], 'herramientas/plazos'],
    [['Impuestos: declaración o impuesto en la fuente', 'Impôts : déclaration ou impôt à la source'], ['Vaud 15 de marzo, Ginebra 31 de marzo. Corrección en la fuente: 31 de marzo.', 'Vaud 15 mars, Genève 31 mars. Rectification à la source : 31 mars.'], 'blog/carta-de-impuestos-suiza'],
    [['Asignaciones familiares', 'Allocations familiales'], ['Se piden a través de tu empleador.', 'Elles se demandent via ton employeur.'], 'guias/asignaciones'],
    [['Curso de francés', 'Cours de français'], ['Para el día a día, el trabajo y renovar tu permiso.', 'Pour le quotidien, le travail et renouveler ton permis.'], null],
    [['Revisar tu seguro antes del 30 de noviembre', 'Revoir ton assurance avant le 30 novembre'], ['Para cambiar de caja o de franquicia el 1 de enero.', 'Pour changer de caisse ou de franchise au 1er janvier.'], 'herramientas/franquicia'],
  ] },
];

const TX = {
  es: { gateH: 'Recibe tu checklist gratis', gateP: 'Deja tu correo y te mostramos al instante la lista completa (y te la enviamos por correo para que la tengas siempre).', email: 'Correo electrónico', consent: 'Acepto la política de privacidad y recibir de vez en cuando consejos de Ruta Suiza.', btn: 'Ver mi checklist', err: 'Indica un correo válido y acepta la casilla.', print: 'Imprimir o guardar en PDF', done: (n) => `${n} de 20 hechos`, guide: 'Ver cómo' },
  fr: { gateH: 'Reçois ta checklist gratuite', gateP: 'Laisse ton e-mail et on t’affiche tout de suite la liste complète (et on te l’envoie par e-mail pour l’avoir toujours).', email: 'E-mail', consent: 'J’accepte la politique de confidentialité et de recevoir parfois des conseils de Ruta Suiza.', btn: 'Voir ma checklist', err: 'Indique un e-mail valable et coche la case.', print: 'Imprimer ou enregistrer en PDF', done: (n) => `${n} sur 20 faits`, guide: 'Voir comment' },
};

export default function Checklist({ lang = 'es' }) {
  const t = TX[lang] || TX.es; const i = lang === 'fr' ? 1 : 0;
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState({});
  useEffect(() => {
    try { if (new URLSearchParams(location.search).get('ok') === '1' || localStorage.getItem('rs-checklist') === '1') setOpen(true); setDone(JSON.parse(localStorage.getItem('rs-checklist-done') || '{}')); } catch { /* ignore */ }
  }, []);
  const toggle = (k) => setDone((d) => { const n = { ...d, [k]: !d[k] }; try { localStorage.setItem('rs-checklist-done', JSON.stringify(n)); } catch { /* ignore */ } return n; });
  const submit = async (e) => {
    e.preventDefault(); const fd = new FormData(e.currentTarget); setErr('');
    const email = String(fd.get('email') || ''); if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || fd.get('consent') !== 'on') { setErr(t.err); return; }
    setBusy(true);
    await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'checklist', email, consent: true, lang, page: location.pathname, website: fd.get('website') }) }).catch(() => null);
    try { localStorage.setItem('rs-checklist', '1'); } catch { /* ignore */ }
    setBusy(false); setOpen(true);
  };
  const n = Object.values(done).filter(Boolean).length;
  return (
    <div className="ck">
      {!open && (
        <form className="ck-gate panel" onSubmit={submit} noValidate>
          <h2>{t.gateH}</h2><p>{t.gateP}</p>
          <label>{t.email}<input name="email" type="email" required autoComplete="email" /></label>
          <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          <label className="check"><input type="checkbox" name="consent" required /> <span>{t.consent} <a href={`/${lang}/privacidad`}>→</a></span></label>
          {err && <p className="lerr" role="alert">{err}</p>}
          <button className="btn btn-ok" type="submit" disabled={busy}>{t.btn}</button>
        </form>
      )}
      <div className={`ck-list${open ? '' : ' ck-locked'}`} aria-hidden={!open}>
        {open && <div className="ck-top"><b>{t.done(n)}</b><button type="button" className="btn ghost sm" onClick={() => window.print()}>🖨 {t.print}</button></div>}
        {STEPS.map((g, gi) => (
          <section key={gi} className="ck-g"><h2>{g.g[i]}</h2><ol>{g.items.map((it, k) => { const key = `${gi}-${k}`; return (
            <li key={key} className={done[key] ? 'ok' : ''}><label><input type="checkbox" checked={!!done[key]} onChange={() => toggle(key)} disabled={!open} /><span><b>{it[0][i]}</b><small>{it[1][i]}</small></span></label>{it[2] && open && <a href={`/${lang}/${it[2]}`}>{t.guide} →</a>}</li>); })}</ol></section>
        ))}
      </div>
    </div>
  );
}
