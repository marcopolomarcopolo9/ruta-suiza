// Creates a Stripe Checkout session: CHF 39 consultation (one-off) or Club CHF 9.99/month (subscription).
// TWINT and cards appear automatically when enabled in Stripe → Settings → Payment methods.
import { stripe, stripeReady } from '../../../lib/stripe';
import { allow, storeReady, setDiag } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!stripeReady()) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  if (storeReady() && !(await allow(`checkout:${ip}`, 15, 3600))) return Response.json({ ok: false, error: 'too_many' }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const lang = body.lang === 'fr' ? 'fr' : 'es';
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin).replace(/\/$/, '');
  const club = body.product === 'club';
  const name = club ? 'Club Ruta Suiza' : (lang === 'es' ? 'Asesoría privada Ruta Suiza' : 'Accompagnement privé Ruta Suiza');
  const priceId = club ? process.env.STRIPE_CLUB_PRICE_ID : process.env.STRIPE_PRICE_ID;
  const line = priceId
    ? { price: priceId, quantity: 1 }
    : { price_data: { currency: 'chf', unit_amount: club ? 999 : 3900, product_data: { name }, ...(club ? { recurring: { interval: 'month' } } : {}) }, quantity: 1 };
  const base = {
    mode: club ? 'subscription' : 'payment',
    line_items: [line],
    locale: lang,
    phone_number_collection: { enabled: true },
    success_url: club ? `${origin}/${lang}/club/bienvenida?session_id={CHECKOUT_SESSION_ID}` : `${origin}/${lang}/reserva?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: club ? `${origin}/${lang}/club` : `${origin}/${lang}/precios`,
    metadata: { lang, product: club ? 'club' : 'asesoria' },
    ...(club ? { subscription_data: { metadata: { lang, product: 'club' } } } : {}),
  };
  // 1) ask explicitly for TWINT + card; 2) if Stripe refuses TWINT, fall back to the dashboard defaults
  try {
    const s = await stripe('POST', 'checkout/sessions', { ...base, payment_method_types: ['card', 'twint'] });
    return Response.json({ ok: true, url: s.url });
  } catch (e) {
    console.error('checkout with twint failed', e.message);
    await setDiag('twint', e.message);
  }
  try {
    const s = await stripe('POST', 'checkout/sessions', base);
    return Response.json({ ok: true, url: s.url });
  } catch (e) {
    console.error('checkout failed', e.message);
    await setDiag('checkout', e.message);
    return Response.json({ ok: false, error: 'stripe_error' }, { status: 502 });
  }
}
