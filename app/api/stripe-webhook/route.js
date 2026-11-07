// Stripe webhook: records paid sessions even if the client never reaches /reserva.
// In Stripe → Developers → Webhooks, point to https://<domain>/api/stripe-webhook,
// event checkout.session.completed, and put the signing secret in STRIPE_WEBHOOK_SECRET.
import crypto from 'crypto';
import { recordPayment, addLead, setDiag } from '../../../lib/store';
import { stripe } from '../../../lib/stripe';
import { cmd } from '../../../lib/redis';
import { logError } from '../../../lib/errors';
import { notifyAdmin } from '../../../lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function verify(payload, header, secret) {
  const parts = Object.fromEntries(String(header || '').split(',').map((p) => p.split('=')));
  const v1s = String(header || '').split(',').filter((p) => p.startsWith('v1=')).map((p) => p.slice(3));
  if (!parts.t || !v1s.length) return false;
  if (Math.abs(Date.now() / 1000 - Number(parts.t)) > 300) return false;
  const expected = crypto.createHmac('sha256', secret).update(`${parts.t}.${payload}`).digest('hex');
  return v1s.some((v) => v.length === expected.length && crypto.timingSafeEqual(Buffer.from(v), Buffer.from(expected)));
}

export async function POST(req) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response('not configured', { status: 503 });
  const payload = await req.text();
  if (!verify(payload, req.headers.get('stripe-signature'), secret)) {
    // usually the secret belongs to another Stripe account / endpoint
    let acct = ''; try { acct = JSON.parse(payload).account || ''; } catch { /* ignore */ }
    await setDiag('webhookBad', acct || 'signature');
    return new Response('bad signature', { status: 400 });
  }
  const event = JSON.parse(payload);
  await setDiag('webhookOk', event.type);
  try {
    // each event is handled once, even if Stripe sends it again
    if ((await cmd('SET', `stripe:evt:${event.id}`, '1', 'NX', 'EX', 60 * 60 * 24 * 30)) !== 'OK') return Response.json({ received: true, duplicate: true });
    const o = event.data.object;
    if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
      await recordPayment(o);
    } else if (event.type === 'customer.subscription.deleted' || event.type === 'invoice.payment_failed') {
      // who is it? fetch the customer to show a name and e-mail in the CMS
      let c = {};
      try { if (o.customer) c = await stripe('GET', `customers/${o.customer}`); } catch { /* keep empty */ }
      const [first, ...rest] = String(c.name || '').trim().split(/\s+/);
      const failed = event.type === 'invoice.payment_failed';
      const lead = await addLead({
        kind: failed ? 'pago_fallido' : 'club_baja', first: first || '', last: rest.join(' '), email: c.email || o.customer_email || '', phone: c.phone || '', country: '', lang: 'es', page: 'stripe', consent: true,
        message: failed ? `Paiement échoué : ${((o.amount_due || 0) / 100).toFixed(2)} ${String(o.currency || '').toUpperCase()} · Stripe relancera automatiquement` : `Abonnement Club terminé (${o.id})`,
      });
      try { await notifyAdmin(lead); } catch (e) { await logError('e-mail', e); }
    }
  } catch (e) {
    await logError('webhook Stripe', e);
    try { await cmd('DEL', `stripe:evt:${event.id}`); } catch { /* ignore */ }
    return new Response('retry', { status: 500 });
  }
  return Response.json({ received: true });
}
