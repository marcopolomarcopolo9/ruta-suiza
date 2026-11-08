'use client';

import { useRef, useState } from 'react';

const TX = {
  es: {
    file: 'Foto o PDF de tu carta', pick: 'Hacer una foto o elegir un archivo', change: 'Cambiar', name: 'Nombre', email: 'Correo electrónico',
    note: '¿Algo que debamos saber? (opcional)', notePh: 'Ej.: la recibí el 3 de noviembre, no entiendo si tengo que pagar…',
    consent: 'Acepto que Ruta Suiza use mi carta solo para responderme y la borre después (ver privacidad).',
    send: 'Enviar mi carta', sending: 'Enviando…', okT: '¡Carta recibida!', okP: 'Te respondemos por correo en 48 h como máximo, en español.',
    errors: { fields: 'Completa tu nombre, tu correo y acepta la casilla.', used: 'Ya usaste tu carta gratis con este correo. Únete al Club para enviar hasta 3 cartas al mes.', file_required: 'Añade la foto o el PDF de tu carta.', file_type: 'Formato no aceptado: usa una foto (JPG, PNG) o un PDF.', file_big: 'El archivo es demasiado grande. Haz una foto en lugar de un PDF, o un PDF de menos de 700 KB.', file_bad: 'No pudimos leer el archivo. Prueba con una foto.', quota: 'Ya enviaste tus 3 cartas este mes. Se renuevan el día 1.', not_member: 'Tu sesión expiró: vuelve a entrar.', too_many: 'Demasiados envíos. Inténtalo mañana.', default: 'No se pudo enviar. Inténtalo de nuevo en unos minutos.' },
    hint: 'Una foto clara con el móvil es suficiente. Puedes tapar tus datos sensibles (número AVS, IBAN).',
  },
  fr: {
    file: 'Photo ou PDF de ton courrier', pick: 'Prendre une photo ou choisir un fichier', change: 'Changer', name: 'Prénom', email: 'E-mail',
    note: 'Quelque chose à savoir ? (facultatif)', notePh: 'Ex. : reçu le 3 novembre, je ne comprends pas si je dois payer…',
    consent: 'J’accepte que Ruta Suiza utilise mon courrier uniquement pour me répondre et l’efface ensuite (voir confidentialité).',
    send: 'Envoyer mon courrier', sending: 'Envoi…', okT: 'Courrier reçu !', okP: 'On te répond par e-mail en 48 h au maximum.',
    errors: { fields: 'Indique ton prénom, ton e-mail et coche la case.', used: 'Tu as déjà utilisé ton courrier gratuit avec cet e-mail. Rejoins le Club pour envoyer jusqu’à 3 courriers par mois.', file_required: 'Ajoute la photo ou le PDF de ton courrier.', file_type: 'Format refusé : utilise une photo (JPG, PNG) ou un PDF.', file_big: 'Le fichier est trop lourd. Prends une photo plutôt qu’un PDF, ou un PDF de moins de 700 Ko.', file_bad: 'Impossible de lire le fichier. Essaie avec une photo.', quota: 'Tu as déjà envoyé tes 3 courriers ce mois-ci. Ils se renouvellent le 1er.', not_member: 'Ta session a expiré : reconnecte-toi.', too_many: 'Trop d’envois. Réessaie demain.', default: 'L’envoi n’a pas fonctionné. Réessaie dans quelques minutes.' },
    hint: 'Une photo nette avec ton téléphone suffit. Tu peux cacher tes données sensibles (n° AVS, IBAN).',
  },
};

/** Shrinks a photo to max 1600 px JPEG (~200–400 KB) so it fits the store limit. */
async function prepare(file) {
  if (file.type === 'application/pdf') {
    const buf = await file.arrayBuffer();
    let bin = ''; const bytes = new Uint8Array(buf);
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return { type: 'application/pdf', name: file.name, data: btoa(bin), preview: null, size: bytes.length };
  }
  // data: URL rather than blob: (the site's CSP allows data: images only)
  const url = await new Promise((ok, ko) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = ko; r.readAsDataURL(file); });
  const img = await new Promise((ok, ko) => { const i = new Image(); i.onload = () => ok(i); i.onerror = ko; i.src = url; });
  let w = img.naturalWidth, h = img.naturalHeight; const max = 1600;
  if (Math.max(w, h) > max) { const r = max / Math.max(w, h); w = Math.round(w * r); h = Math.round(h * r); }
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
  let q = 0.8, out = c.toDataURL('image/jpeg', q);
  while (out.length * 0.75 > 650 * 1024 && q > 0.4) { q -= 0.1; out = c.toDataURL('image/jpeg', q); }
  return { type: 'image/jpeg', name: (file.name || 'carta').replace(/\.\w+$/, '') + '.jpg', data: out.split(',')[1], preview: out, size: Math.round(out.length * 0.75) };
}

export default function LetterUpload({ lang = 'es', mode = 'free', onSent }) {
  const t = TX[lang] || TX.es;
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);
  const input = useRef(null);
  const member = mode === 'member';

  const pick = async (e) => {
    const f = e.target.files && e.target.files[0]; setErr('');
    if (!f) return;
    try { setFile(await prepare(f)); } catch { setErr(t.errors.file_bad); }
  };
  const submit = async (e) => {
    e.preventDefault(); setErr('');
    const fd = new FormData(e.currentTarget);
    if (!file) { setErr(t.errors.file_required); return; }
    setBusy(true);
    try {
      const r = await fetch('/api/letter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, lang, name: fd.get('name'), email: fd.get('email'), note: fd.get('note'), consent: fd.get('consent') === 'on', website: fd.get('website'), file: { type: file.type, name: file.name, data: file.data } }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) { setErr(t.errors[j.error] || t.errors.default); return; }
      setDone(true); setFile(null); onSent && onSent(j);
    } catch { setErr(t.errors.default); } finally { setBusy(false); }
  };

  if (done) return (
    <div className="lu-ok panel" role="status"><b>✅ {t.okT}</b><p>{t.okP}</p>{member && <button type="button" className="btn ghost sm" onClick={() => setDone(false)}>{lang === 'fr' ? 'Envoyer un autre courrier' : 'Enviar otra carta'}</button>}</div>
  );
  return (
    <form className="lu panel" onSubmit={submit} noValidate>
      <div className="lu-file">
        <span className="lu-l">{t.file}</span>
        <input ref={input} type="file" accept="image/*,application/pdf" onChange={pick} hidden />
        {file ? (
          <div className="lu-prev">{file.preview ? <img src={file.preview} alt="" /> : <span className="lu-pdf">PDF</span>}<span>{file.name}<small>{Math.round(file.size / 1024)} KB</small></span><button type="button" className="btn ghost sm" onClick={() => input.current.click()}>{t.change}</button></div>
        ) : (
          <button type="button" className="lu-drop" onClick={() => input.current.click()}><span aria-hidden="true">📷</span>{t.pick}</button>
        )}
        <small className="muted">{t.hint}</small>
      </div>
      {!member && (<div className="lu-row">
        <label>{t.name}<input name="name" required autoComplete="given-name" /></label>
        <label>{t.email}<input name="email" type="email" required autoComplete="email" /></label>
      </div>)}
      <label>{t.note}<textarea name="note" rows={3} maxLength={1500} placeholder={t.notePh} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {!member && <label className="check"><input type="checkbox" name="consent" required /> <span>{t.consent} <a href={`/${lang}/privacidad`}>→</a></span></label>}
      {err && <p className="lerr" role="alert">{err}</p>}
      <button type="submit" className="btn btn-ok" disabled={busy}>{busy ? t.sending : t.send}</button>
    </form>
  );
}
