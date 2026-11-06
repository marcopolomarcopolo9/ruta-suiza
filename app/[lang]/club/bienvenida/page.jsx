import { stripe, stripeReady } from '../../../../lib/stripe';
import { recordPayment } from '../../../../lib/store';

import { cookies } from 'next/headers';
import { isAdmin } from '../../../../lib/adminAuth';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Club', robots: { index: false, follow: false } };

const TX = {
  es: { hi: '¡Bienvenido/a al Club', sub: 'Tu suscripción está activa. Esto es lo que puedes hacer desde hoy:', group: 'Únete a tu grupo privado', groupTxt: 'Preguntas, consejos y la sesión mensual en directo con el equipo.', letter: 'Mándanos tu primera carta', letterTxt: 'Envía una foto de la carta por WhatsApp con tu nombre: te la explicamos en español en 48 h (2 cartas al mes incluidas).', manage: 'Gestionar o cancelar mi suscripción', soon: 'Te enviamos tu acceso por correo en las próximas 24 h.', bad: 'No encontramos tu suscripción', badSub: 'Si acabas de pagar, espera unos segundos y recarga la página. Si sigue sin aparecer, escríbenos y lo resolvemos.', back: 'Volver al Club', receipt: 'Recibirás el recibo por correo cada mes.' },
  fr: { hi: 'Bienvenue au Club', sub: 'Ton abonnement est actif. Voici ce que tu peux faire dès aujourd\'hui :', group: 'Rejoins ton groupe privé', groupTxt: 'Questions, conseils et la session mensuelle en direct avec l\'équipe.', letter: 'Envoie ta première lettre', letterTxt: 'Envoie une photo du courrier par WhatsApp avec ton nom : on te l\'explique en espagnol en 48 h (2 lettres par mois incluses).', manage: 'Gérer ou résilier mon abonnement', soon: 'On t\'envoie ton accès par e-mail dans les prochaines 24 h.', bad: 'Nous ne trouvons pas ton abonnement', badSub: 'Si tu viens de payer, attends quelques secondes et recharge la page. S\'il n\'apparaît toujours pas, écris-nous et on règle ça.', back: 'Retour au Club', receipt: 'Tu recevras le reçu par e-mail chaque mois.' },
};

export default async function Bienvenida({ params, searchParams }) {
  const lang = params.lang === 'fr' ? 'fr' : 'es';
  const t = TX[lang];
  const id = String(searchParams?.session_id || '');
  let s = null;
  if (stripeReady() && /^cs_[A-Za-z0-9_]+$/.test(id)) { try { s = await stripe('GET', `checkout/sessions/${id}`); } catch { s = null; } }
  const preview = searchParams?.preview === '1' && isAdmin({ cookies: cookies() });
  if (preview) s = { payment_status: 'paid', mode: 'subscription', customer_details: { name: 'Prénom Test' } };
  const ok = s?.payment_status === 'paid' && (s.mode === 'subscription' || s.metadata?.product === 'club');
  if (ok && !preview) { try { await recordPayment(s); } catch { /* webhook will retry */ } }
  if (!ok) {
    return (<section className="article reserva"><div className="eyebrow">Club Ruta Suiza</div><h1>{t.bad}</h1><p className="lead">{t.badSub}</p><a className="btn" href={`/${lang}/club`}>{t.back}</a></section>);
  }
  const first = String(s.customer_details?.name || '').split(' ')[0];
  const group = process.env.NEXT_PUBLIC_CLUB_WHATSAPP;
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const portal = process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL;
  return (
    <section className="article welcome">
      {preview ? <p className="note">👀 Aperçu admin : aucun paiement n'a été fait. Voici ce que voit un nouveau membre du Club.</p> : null}
      <div className="eyebrow">Club Ruta Suiza</div>
      <h1>{t.hi}{first ? `, ${first}` : ''}!</h1>
      <p className="lead">{group || wa ? t.sub : t.soon}</p>
      <div className="wsteps">
        {group ? <a className="wstep" href={group} target="_blank" rel="noopener"><b>1 · {t.group}</b><span>{t.groupTxt}</span></a> : null}
        {wa ? <a className="wstep" href={`https://wa.me/${wa.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener"><b>{group ? '2' : '1'} · {t.letter}</b><span>{t.letterTxt}</span></a> : null}
      </div>
      <p className="muted">{t.receipt}</p>
      {portal ? <p><a href={portal} target="_blank" rel="noopener">{t.manage} ↗</a></p> : null}
    </section>
  );
}
