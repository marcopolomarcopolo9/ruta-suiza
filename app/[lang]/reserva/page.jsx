import BookingPicker from '../../../components/BookingPicker';
import { waHref, WHATSAPP_LABEL } from '../../../lib/private';
import { stripe, stripeReady } from '../../../lib/stripe';
import { recordPayment } from '../../../lib/store';

import { cookies } from 'next/headers';
import { isAdmin } from '../../../lib/adminAuth';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Reserva', robots: { index: false, follow: false } };

const TX = {
  es: { ok: '¡Pago recibido, gracias!', okSub: 'Elige ahora el día y la hora de tu conversación privada con una persona del equipo.', bad: 'No encontramos tu pago', badSub: 'Si acabas de pagar, espera unos segundos y recarga la página. Si el problema continúa, escríbenos: te ayudamos enseguida.', back: 'Volver a los precios', open: 'Abrir el calendario en otra pestaña', noCal: 'Te contactamos en 24 h por WhatsApp o por correo para fijar tu cita.', receipt: 'Recibirás el recibo de pago por correo.', wa: '¿Una pregunta antes de la cita? Escríbenos por WhatsApp:' },
  fr: { ok: 'Paiement reçu, merci !', okSub: 'Choisis maintenant le jour et l\'heure de ton échange privé avec une personne de l\'équipe.', bad: 'Nous ne trouvons pas ton paiement', badSub: 'Si tu viens de payer, attends quelques secondes et recharge la page. Si le problème continue, écris-nous : on t\'aide tout de suite.', back: 'Retour aux tarifs', open: 'Ouvrir le calendrier dans un nouvel onglet', noCal: 'On te contacte dans les 24 h par WhatsApp ou par e-mail pour fixer ton rendez-vous.', receipt: 'Tu recevras le reçu de paiement par e-mail.', wa: 'Une question avant le rendez-vous ? Écris-nous sur WhatsApp :' },
};

export default async function Reserva({ params, searchParams }) {
  const lang = params.lang === 'fr' ? 'fr' : 'es';
  const t = TX[lang];
  const id = String(searchParams?.session_id || '');
  let session = null;
  if (stripeReady() && /^cs_[A-Za-z0-9_]+$/.test(id)) {
    try { session = await stripe('GET', `checkout/sessions/${id}`); } catch { session = null; }
  }
  const preview = searchParams?.preview === '1' && isAdmin({ cookies: cookies() });
  if (preview) session = { payment_status: 'paid', customer_details: { name: 'Prénom Test', email: '' } };
  const paid = session?.payment_status === 'paid';
  if (paid && !preview) { try { await recordPayment(session); } catch { /* webhook will retry */ } }
  const c = session?.customer_details || {};

  if (!paid) {
    return (
      <section className="article reserva">
        <div className="eyebrow">Ruta Suiza</div>
        <h1>{t.bad}</h1>
        <p className="lead">{t.badSub}</p>
        <a className="btn" href={`/${lang}/precios`}>{t.back}</a>
      </section>
    );
  }
  return (
    <section className="reserva">
      <div className="article">
        {preview ? <p className="note">👀 Aperçu admin : aucun paiement n'a été fait. Voici ce que voit ton client après avoir payé CHF 39.</p> : null}
        <div className="eyebrow">Ruta Suiza</div>
        <h1>{t.ok}</h1>
        <p className="lead">{t.okSub}</p>
        <p className="muted">{t.receipt}</p>
        {waHref() ? <p className="wa-paid">{t.wa} <a href={waHref()} target="_blank" rel="noopener">{WHATSAPP_LABEL}</a></p> : null}
      </div>
      <BookingPicker sessionId={preview ? 'preview' : session.id} lang={lang} />
    </section>
  );
}
