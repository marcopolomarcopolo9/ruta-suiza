// Creates a Stripe Checkout session for the CHF 39 private consultation.
// TWINT and cards appear automatically when enabled in Stripe → Settings → Payment methods.
import { stripe, stripeReady } from '../../../lib/stripe';
import { allow, storeReady } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!stripeReady()) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  if (storeReady() && !(await allow(`checkout:${ip}`, 15, 3600))) return Response.json({ ok: false, error: 'too_many' }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const lang = body.lang === 'fr' ? 'fr' : 'es';
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/$/, '');
  const name = lang === 'es' ? 'Asesoría privada Ruta Suiza' : 'Accompagnement privé Ruta Suiza';
  const line = process.env.STRIPE_PRICE_ID
    ? { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
    : { price_data: { currency: 'chf', unit_amount: 3900, product_data: { name } }, quantity: 1 };
  try {
    const s = await stripe('POST', 'checkout/sessions', {
      mode: 'payment',
      line_items: [line],
      locale: lang,
      phone_number_collection: { enabled: true },
      success_url: `${origin}/${lang}/reserva?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${lang}/precios`,
      metadata: { lang, product: 'asesoria' },
    });
    return Response.json({ ok: true, url: s.url });
  } catch (e) {
    console.error('checkout failed', e.message);
    return Response.json({ ok: false, error: 'stripe_error' }, { status: 502 });
  }
}
