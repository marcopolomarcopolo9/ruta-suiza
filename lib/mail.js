// Transactional e-mails through Resend (REST API, no SDK). Server-only.
// Env: RESEND_API_KEY, MAIL_FROM (default "Ruta Suiza <hola@rutasuiza.com>"), ADMIN_EMAIL (alerts).
import { WHATSAPP, WHATSAPP_LABEL } from './private';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rutasuiza.com').replace(/\/$/, '');
const FROM = process.env.MAIL_FROM || 'Ruta Suiza <hola@rutasuiza.com>';
const API = process.env.RESEND_API_BASE || 'https://api.resend.com';
export const mailReady = () => Boolean(process.env.RESEND_API_KEY);

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const hm = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
const L = (lang, es, fr) => (lang === 'fr' ? fr : es);

export async function sendMail({ to, subject, html, text, replyTo, attachments, preview }) {
  if (preview) return { to, subject, html, attachments: (attachments || []).map((a) => a.filename) };
  if (!mailReady() || !to) return { skipped: true };
  const r = await fetch(`${API}/emails`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: [to], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}), ...(attachments ? { attachments } : {}) }),
    cache: 'no-store',
  });
  if (!r.ok) throw new Error(`resend ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

/** Branded layout, inline styles (works in Gmail, Outlook, Apple Mail). */
function layout(lang, title, body, cta) {
  return `<!doctype html><html lang="${lang}"><body style="margin:0;background:#f2f4f7;font-family:Arial,Helvetica,sans-serif;color:#14233a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4f7;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="padding:20px 24px;border-bottom:1px solid #eaecf0;font-size:20px;font-weight:bold">ruta<span style="color:#d52b1e">suiza</span></td></tr>
<tr><td style="padding:24px"><h1 style="font-size:21px;margin:0 0 14px">${title}</h1><div style="font-size:15px;line-height:1.6">${body}</div>
${cta ? `<p style="margin:22px 0 0"><a href="${cta[1]}" style="display:inline-block;background:#d52b1e;color:#ffffff;text-decoration:none;font-weight:bold;padding:12px 18px;border-radius:10px">${cta[0]}</a></p>` : ''}</td></tr>
<tr><td style="padding:16px 24px;background:#f9fafb;font-size:12px;color:#667085">${L(lang, 'Ruta Suiza · Servicio privado e independiente, no somos una autoridad.', 'Ruta Suiza · Service privé et indépendant, nous ne sommes pas une autorité.')}<br><a href="${SITE}/${lang}" style="color:#667085">${SITE.replace(/^https?:\/\//, '')}</a></td></tr>
</table></td></tr></table></body></html>`;
}

function icsFile(b, lang) {
  const d = b.date.replace(/-/g, '');
  const end = b.min + (b.duration || 30);
  const t = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}${String(m % 60).padStart(2, '0')}00`;
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ruta Suiza//FR', 'METHOD:PUBLISH', 'BEGIN:VEVENT', `UID:${b.id}@rutasuiza`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Europe/Zurich:${d}T${t(b.min)}`, `DTEND;TZID=Europe/Zurich:${d}T${t(end)}`, `SUMMARY:${L(lang, 'Asesoría privada Ruta Suiza', 'Accompagnement privé Ruta Suiza')}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return { filename: 'cita-ruta-suiza.ics', content: Buffer.from(ics).toString('base64') };
}
function dateLabel(date, lang) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(lang === 'fr' ? 'fr-CH' : 'es-ES', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' });
}
function localLine(b, lang) {
  if (!b.tz || b.tz === 'Europe/Zurich') return '';
  try {
    const [y, m, d] = b.date.split('-').map(Number);
    const off = (tz, inst) => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(inst).map((x) => [x.type, x.value])); return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - Math.floor(inst.getTime() / 60000) * 60000) / 60000; };
    const guess = Date.UTC(y, m - 1, d, Math.floor(b.min / 60), b.min % 60);
    const inst = new Date(guess - off('Europe/Zurich', new Date(guess)) * 60000);
    if (off(b.tz, inst) === off('Europe/Zurich', inst)) return '';
    const city = b.tz.split('/').pop().replace(/_/g, ' ');
    return `${inst.toLocaleTimeString(lang === 'fr' ? 'fr-CH' : 'es-ES', { timeZone: b.tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })} ${L(lang, 'tu hora', 'ton heure')} (${city})`;
  } catch { return ''; }
}

const KINDS = { checklist: 'Checklist téléchargée', llamada: 'Demande de rappel', pregunta: 'Question gratuite', contacto: 'Message (page Contact)', club: 'Intérêt pour le Club', pago: 'Consultation payée CHF 39', club_pago: 'Nouveau membre Club', rdv: 'Nouveau rendez-vous', club_baja: 'Fin d’abonnement Club', pago_fallido: 'Paiement échoué' };

/** Alert for you (ADMIN_EMAIL) on every new lead / payment / booking. */
export async function notifyAdmin(lead, opts = {}) {
  const to = process.env.ADMIN_EMAIL || (opts.preview ? 'toi@rutasuiza.com' : '');
  if (!opts.preview && (!mailReady() || !to)) return undefined;
  const name = [lead.first, lead.last].filter(Boolean).join(' ') || lead.email || '—';
  const rows = [['Type', KINDS[lead.kind] || lead.kind], ['Nom', name], ['E-mail', lead.email], ['Téléphone', lead.phone], ['Pays', lead.country], ['Canton', lead.canton], ['Message', lead.message], ['Langue', (lead.lang || '').toUpperCase()]].filter((r) => r[1]);
  const body = `<table style="border-collapse:collapse;width:100%">${rows.map(([k, v]) => `<tr><td style="padding:6px 8px;color:#667085;width:110px;vertical-align:top">${k}</td><td style="padding:6px 8px">${esc(v)}</td></tr>`).join('')}</table>`;
  return sendMail({ preview: opts.preview, to, subject: `🔔 ${KINDS[lead.kind] || 'Nouvelle demande'} · ${name}`, html: layout('fr', KINDS[lead.kind] || 'Nouvelle demande', body, ['Ouvrir le CMS', `${SITE}/admin`]), replyTo: lead.email || undefined });
}

/** "We got your message" to the visitor. */
export async function confirmLead(lead, opts = {}) {
  if (!lead.email || !['llamada', 'pregunta', 'contacto', 'club', 'checklist'].includes(lead.kind)) return undefined;
  const lang = lead.lang === 'fr' ? 'fr' : 'es';
  const hi = lead.first ? L(lang, `Hola ${esc(lead.first)},`, `Bonjour ${esc(lead.first)},`) : L(lang, 'Hola,', 'Bonjour,');
  const map = {
    llamada: [L(lang, 'Te llamamos pronto', 'On t’appelle bientôt'), L(lang, 'Hemos recibido tu solicitud. Una persona del equipo te contactará en 24–48 h por WhatsApp o por teléfono.', 'Nous avons bien reçu ta demande. Une personne de l’équipe te contactera dans les 24–48 h par WhatsApp ou par téléphone.')],
    pregunta: [L(lang, 'Hemos recibido tu pregunta', 'Nous avons reçu ta question'), L(lang, 'Una persona del equipo te responde en 24–48 h, en español o en francés.', 'Une personne de l’équipe te répond dans les 24–48 h, en espagnol ou en français.')],
    contacto: [L(lang, 'Hemos recibido tu mensaje', 'Nous avons reçu ton message'), L(lang, 'Te respondemos en 24–48 h.', 'On te répond dans les 24–48 h.')],
    checklist: [L(lang, 'Tu checklist de llegada a Suiza', 'Ta checklist d’arrivée en Suisse'), L(lang, `Aquí tienes tu checklist con los 20 trámites al llegar a Suiza, en orden y con sus plazos: <a href="${SITE}/es/checklist?ok=1">abrir mi checklist</a>. Puedes imprimirla o guardarla en PDF. ¿Te llegó una carta que no entiendes? La primera te la explicamos gratis: <a href="${SITE}/es/carta-gratis">enviar mi carta</a>.`, `Voici ta checklist avec les 20 démarches à l’arrivée en Suisse, dans l’ordre et avec leurs délais : <a href="${SITE}/fr/checklist?ok=1">ouvrir ma checklist</a>. Tu peux l’imprimer ou l’enregistrer en PDF. Tu as reçu un courrier que tu ne comprends pas ? On t’explique le premier gratuitement : <a href="${SITE}/fr/carta-gratis">envoyer mon courrier</a>.`)],
    club: [L(lang, 'Gracias por tu interés en el Club', 'Merci pour ton intérêt pour le Club'), L(lang, 'Te escribiremos con toda la información del Club Ruta Suiza.', 'On t’écrira avec toutes les informations sur le Club Ruta Suiza.')],
  };
  const [title, txt] = map[lead.kind];
  const quote = lead.message ? `<p style="background:#f9fafb;border-radius:10px;padding:10px 12px;color:#475467">« ${esc(lead.message)} »</p>` : '';
  return sendMail({ preview: opts.preview, to: lead.email, replyTo: process.env.ADMIN_EMAIL || undefined, subject: `${title} · Ruta Suiza`, html: layout(lang, title, `<p>${hi}</p><p>${txt}</p>${quote}<p>${L(lang, 'Mientras tanto, puedes calcular gratis tu ruta y leer nuestras guías.', 'En attendant, tu peux calculer gratuitement ton parcours et lire nos guides.')}</p>`, [L(lang, 'Ver las guías', 'Voir les guides'), `${SITE}/${lang}/guias`]) });
}

/** Booking confirmation (client) — also used for the day-before reminder. */
export async function bookingEmail(b, { reminder = false, preview = false } = {}) {
  if (!b.email || (b.test && !preview)) return undefined;
  const lang = b.lang === 'fr' ? 'fr' : 'es';
  const when = `${dateLabel(b.date, lang)} · ${hm(b.min)} ${L(lang, '(hora de Suiza)', '(heure suisse)')}`;
  const loc = localLine(b, lang);
  const title = reminder ? L(lang, 'Mañana tienes tu cita', 'Demain, ton rendez-vous') : L(lang, 'Tu cita está confirmada', 'Ton rendez-vous est confirmé');
  const body = `<p>${b.name ? L(lang, `Hola ${esc(b.name.split(' ')[0])},`, `Bonjour ${esc(b.name.split(' ')[0])},`) : ''}</p>
<p style="font-size:18px;font-weight:bold;margin:12px 0 4px">${esc(when.charAt(0).toUpperCase() + when.slice(1))}</p>${loc ? `<p style="margin:0;color:#667085">${esc(loc)}</p>` : ''}
<p>${L(lang, 'Una persona del equipo te contactará a esa hora por videollamada o WhatsApp (30 minutos). Ten a mano tus documentos y tus preguntas.', 'Une personne de l’équipe te contactera à cette heure par visio ou WhatsApp (30 minutes). Garde tes documents et tes questions sous la main.')}</p>
<p style="color:#667085">${L(lang, '¿Necesitas cambiar la cita? Responde a este correo.', 'Besoin de changer le rendez-vous ? Réponds à cet e-mail.')}</p>`;
  return sendMail({ preview, to: b.email, subject: `${title} · ${hm(b.min)} · Ruta Suiza`, html: layout(lang, title, body), replyTo: process.env.ADMIN_EMAIL || undefined, attachments: reminder ? undefined : [icsFile(b, lang)] });
}

/** Welcome e-mail for a new Club member. */
export async function clubWelcome({ email, name, lang, preview }) {
  if (!email) return undefined;
  lang = lang === 'fr' ? 'fr' : 'es';
  const group = process.env.NEXT_PUBLIC_CLUB_WHATSAPP;
  const wa = WHATSAPP;
  const portal = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL;
  const items = [
    group ? `<li><a href="${group}">${L(lang, 'Únete a tu grupo privado', 'Rejoins ton groupe privé')}</a></li>` : `<li>${L(lang, 'Grupo privado: en creación, te enviaremos el enlace muy pronto.', 'Groupe privé : en cours de création, on t’enverra le lien très bientôt.')}</li>`,
    `<li>${L(lang, 'Incluido cada mes: 3 cartas explicadas en 48 h, tus preguntas por WhatsApp y nuestros modelos de cartas en francés.', 'Inclus chaque mois : 3 courriers expliqués en 48 h, tes questions par WhatsApp et nos modèles de lettres en français.')}</li>`,
    wa && `<li>${L(lang, 'Para tus cartas y preguntas: escríbenos por WhatsApp al', 'Pour tes courriers et questions : écris-nous par WhatsApp au')} <a href="https://wa.me/${wa.replace(/[^\d]/g, '')}">${WHATSAPP_LABEL}</a></li>`,
    `<li><a href="${SITE}/${lang}/miembros">${L(lang, 'Tu espacio de miembro: envía tus cartas, lee nuestras respuestas y descarga los modelos de cartas', 'Ton espace membre : envoie tes courriers, lis nos réponses et récupère les modèles de lettres')}</a></li>`,
    portal && `<li><a href="${portal}">${L(lang, 'Gestionar o cancelar mi suscripción', 'Gérer ou résilier mon abonnement')}</a></li>`,
  ].filter(Boolean);
  const body = `<p>${name ? L(lang, `Hola ${esc(String(name).split(' ')[0])},`, `Bonjour ${esc(String(name).split(' ')[0])},`) : ''}</p><p>${L(lang, 'Tu suscripción al Club Ruta Suiza está activa. Una persona de nuestro equipo, que trabaja en la administración suiza, te explicará tus cartas y responderá a tus preguntas.', 'Ton abonnement au Club Ruta Suiza est actif. Une personne de notre équipe, qui travaille dans l’administration suisse, t’expliquera tes courriers et répondra à tes questions.')}</p>${items.length ? `<ul>${items.join('')}</ul>` : `<p>${L(lang, 'Te enviamos tus accesos en las próximas 24 h.', 'On t’envoie tes accès dans les prochaines 24 h.')}</p>`}`;
  return sendMail({ preview, to: email, subject: L(lang, '¡Bienvenido/a al Club Ruta Suiza!', 'Bienvenue au Club Ruta Suiza !'), html: layout(lang, L(lang, '¡Bienvenido/a al Club!', 'Bienvenue au Club !'), body), replyTo: process.env.ADMIN_EMAIL || undefined });
}

/** All client e-mails with sample data, for the CMS preview (nothing is sent). */
export async function emailPreviews(lang = 'es') {
  const d = new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10);
  const b = { id: 'demo', date: d, min: 18 * 60 + 30, duration: 30, name: lang === 'fr' ? 'Ana Gómez' : 'Ana Gómez', email: 'cliente@ejemplo.com', lang, tz: 'America/Bogota' };
  const lead = (kind, message) => ({ kind, first: 'Ana', last: 'Gómez', email: 'cliente@ejemplo.com', lang, message });
  const list = [
    ['Accusé de réception · question gratuite', await confirmLead(lead('pregunta', lang === 'fr' ? 'Comment changer de caisse maladie ?' : '¿Cómo cambio de seguro médico?'), { preview: true })],
    ['Accusé de réception · demande de rappel', await confirmLead(lead('llamada', ''), { preview: true })],
    ['Accusé de réception · page Contact', await confirmLead(lead('contacto', lang === 'fr' ? 'Bonjour, j’ai une question.' : 'Hola, tengo una pregunta.'), { preview: true })],
    ['Accusé de réception · intérêt Club', await confirmLead(lead('club', ''), { preview: true })],
    ['Confirmation de rendez-vous (avec fichier agenda)', await bookingEmail(b, { preview: true })],
    ['Rappel la veille du rendez-vous', await bookingEmail(b, { reminder: true, preview: true })],
    ['Bienvenue au Club', await clubWelcome({ email: 'cliente@ejemplo.com', name: 'Ana Gómez', lang, preview: true })],
    ['Alerte pour toi (exemple : nouvelle question)', await notifyAdmin({ ...lead('pregunta', '¿Cómo cambio de seguro médico?'), phone: '+41 79 123 45 67', country: 'Colombia' }, { preview: true })],
  ];
  return list.filter((x) => x[1]).map(([label, m]) => ({ label, ...m }));
}

/* ---------- letters & member area ---------- */
const nl2br = (s) => esc(s).replace(/\n/g, '<br>');

/** Alert to the admin: a new letter arrived (free or member). */
export async function notifyLetter(rec, opts = {}) {
  const to = process.env.ADMIN_EMAIL || (opts.preview ? 'toi@rutasuiza.com' : '');
  if (!opts.preview && (!mailReady() || !to)) return undefined;
  const kind = rec.kind === 'member' ? 'Courrier d\'un membre du Club' : 'Premier courrier gratuit';
  const rows = [['Type', kind], ['Nom', rec.name], ['E-mail', rec.email], ['Langue', rec.lang], ['Note', rec.note], ['Fichier', `${rec.fname} (${Math.round((rec.size || 0) / 1024)} Ko)`]].filter(([, v]) => v);
  const body = `<table style="border-collapse:collapse;width:100%">${rows.map(([k, v]) => `<tr><td style="padding:6px 8px;color:#667085;width:90px;vertical-align:top">${k}</td><td style="padding:6px 8px">${nl2br(v)}</td></tr>`).join('')}</table><p style="color:#667085;font-size:13px">À répondre en 48 h. Le fichier est conservé 30 jours.</p>`;
  return sendMail({ preview: opts.preview, to, subject: `📩 ${kind} · ${rec.name || rec.email}`, html: layout('fr', kind, body, ['Ouvrir les courriers', `${SITE}/admin`]), replyTo: rec.email });
}

/** "We got your letter" to the sender. */
export async function confirmLetter(rec, opts = {}) {
  const lang = rec.lang === 'fr' ? 'fr' : 'es';
  const hi = rec.name ? L(lang, `Hola ${esc(String(rec.name).split(' ')[0])},`, `Bonjour ${esc(String(rec.name).split(' ')[0])},`) : L(lang, 'Hola,', 'Bonjour,');
  const body = `<p>${hi}</p><p>${L(lang, 'Hemos recibido tu carta. Una persona que trabaja en la administración suiza la lee y te responde por correo en 48 h como máximo, en español: qué dice, qué tienes que hacer y antes de qué fecha.', 'Nous avons bien reçu ton courrier. Une personne qui travaille dans l’administration suisse le lit et te répond par e-mail en 48 h au maximum : ce qu’il dit, ce que tu dois faire et avant quelle date.')}</p><p style="color:#667085;font-size:13px">${L(lang, 'Si la carta tiene un plazo muy corto (por ejemplo, un commandement de payer: 10 días), no esperes nuestra respuesta para actuar.', 'Si le courrier a un délai très court (par exemple un commandement de payer : 10 jours), n’attends pas notre réponse pour agir.')}</p>`;
  return sendMail({ preview: opts.preview, to: rec.email, subject: L(lang, 'Hemos recibido tu carta', 'Nous avons reçu ton courrier'), html: layout(lang, L(lang, 'Tu carta está en buenas manos', 'Ton courrier est entre de bonnes mains'), body), replyTo: process.env.ADMIN_EMAIL || undefined });
}

/** Our explanation, sent to the sender. Free letters end with the Club offer. */
export async function sendLetterReply(rec, opts = {}) {
  const lang = rec.lang === 'fr' ? 'fr' : 'es';
  const hi = rec.name ? L(lang, `Hola ${esc(String(rec.name).split(' ')[0])},`, `Bonjour ${esc(String(rec.name).split(' ')[0])},`) : L(lang, 'Hola,', 'Bonjour,');
  const club = rec.kind === 'free'
    ? `<p style="margin-top:20px;padding:14px;background:#f0fdf4;border-radius:10px">${L(lang, '<b>¿Te ha servido?</b> Con el Club Ruta Suiza (CHF 9.99 al mes, sin permanencia) te explicamos hasta 3 cartas cada mes, respondemos tus preguntas por WhatsApp y te damos modelos de cartas en francés.', '<b>Ça t’a aidé ?</b> Avec le Club Ruta Suiza (CHF 9.99 par mois, sans engagement), on t’explique jusqu’à 3 courriers chaque mois, on répond à tes questions par WhatsApp et tu reçois des modèles de lettres en français.')}</p>`
    : `<p style="color:#667085;font-size:13px">${L(lang, 'También encontrarás esta respuesta en tu espacio de miembro.', 'Tu retrouves aussi cette réponse dans ton espace membre.')}</p>`;
  const cta = rec.kind === 'free' ? [L(lang, 'Unirme al Club', 'Rejoindre le Club'), `${SITE}/${lang}/club`] : [L(lang, 'Mi espacio de miembro', 'Mon espace membre'), `${SITE}/${lang}/miembros`];
  const body = `<p>${hi}</p><div style="padding:14px;border:1px solid #eaecf0;border-radius:10px">${nl2br(rec.reply)}</div>${club}<p style="color:#667085;font-size:12px">${L(lang, 'Información general, no es asesoramiento jurídico.', 'Information générale, pas un conseil juridique.')}</p>`;
  return sendMail({ preview: opts.preview, to: rec.email, subject: L(lang, 'Tu carta, explicada', 'Ton courrier, expliqué'), html: layout(lang, L(lang, 'Tu carta, explicada', 'Ton courrier, expliqué'), body, cta), replyTo: process.env.ADMIN_EMAIL || undefined });
}

/** Passwordless login link for the member area. */
export async function memberLink({ email, lang, url, preview }) {
  lang = lang === 'fr' ? 'fr' : 'es';
  const body = `<p>${L(lang, 'Haz clic en el botón para entrar en tu espacio de miembro del Club Ruta Suiza. El enlace vale 20 minutos y solo funciona una vez.', 'Clique sur le bouton pour entrer dans ton espace membre du Club Ruta Suiza. Le lien est valable 20 minutes et ne fonctionne qu’une fois.')}</p><p style="color:#667085;font-size:13px">${L(lang, 'Si no lo has pedido tú, ignora este correo.', 'Si tu n’as rien demandé, ignore cet e-mail.')}</p>`;
  return sendMail({ preview, to: email, subject: L(lang, 'Tu enlace para entrar en el Club', 'Ton lien pour entrer dans le Club'), html: layout(lang, L(lang, 'Entrar en tu espacio', 'Entrer dans ton espace'), body, [L(lang, 'Entrar', 'Entrer'), url]) });
}
