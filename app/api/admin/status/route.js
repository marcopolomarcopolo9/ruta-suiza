// Configuration check for /admin: what is set, and what Stripe says about the account and TWINT.
import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { storeReady, getDiag } from '../../../../lib/store';
import { stripe, stripeReady } from '../../../../lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const key = process.env.STRIPE_SECRET_KEY || '';
  const out = {
    store: storeReady(),
    stripeKey: key ? (key.startsWith('sk_live_') ? 'live' : key.startsWith('sk_test_') ? 'test' : key.startsWith('rk_') ? 'restricted' : key.startsWith('pk_') ? 'publishable' : 'unknown') : null,
    webhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    cal: process.env.NEXT_PUBLIC_CAL_LINK || null,
    clubGroup: Boolean(process.env.NEXT_PUBLIC_CLUB_WHATSAPP),
    whatsapp: Boolean(process.env.WHATSAPP_NUMBER),
    mail: Boolean(process.env.RESEND_API_KEY),
    adminEmail: Boolean(process.env.ADMIN_EMAIL),
    cron: Boolean(process.env.CRON_SECRET),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
    lastCheckoutError: await getDiag('checkout'),
    lastTwintError: await getDiag('twint'),
    webhookOk: await getDiag('webhookOk'),
    webhookBad: await getDiag('webhookBad'),
  };
  if (stripeReady()) {
    try {
      const a = await stripe('GET', 'account');
      out.account = { country: a.country, currency: a.default_currency, chargesEnabled: a.charges_enabled, detailsSubmitted: a.details_submitted, name: a.settings?.dashboard?.display_name || a.business_profile?.name || null, email: a.email || null, id: a.id };
    } catch (e) { out.accountError = e.message; }
    try {
      // webhook endpoints of THIS account: one must point to our site with the right events
      const w = await stripe('GET', 'webhook_endpoints?limit=20');
      const NEED = ['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'customer.subscription.deleted', 'invoice.payment_failed'];
      const mine = (w.data || []).filter((x) => /\/api\/stripe-webhook\/?$/.test(x.url));
      const ep = mine.find((x) => x.status === 'enabled') || mine[0];
      out.endpoint = ep
        ? { url: ep.url, enabled: ep.status === 'enabled', missing: ep.enabled_events.includes('*') ? [] : NEED.filter((e) => !ep.enabled_events.includes(e)) }
        : { none: true, others: (w.data || []).map((x) => x.url).slice(0, 3) };
    } catch (e) { out.endpointError = e.message; }
    try {
      const c = await stripe('GET', 'payment_method_configurations?limit=10');
      const def = (c.data || []).find((x) => x.is_default) || (c.data || [])[0];
      if (def) out.twint = { available: def.twint?.available ?? false, preference: def.twint?.display_preference?.value || null, card: def.card?.available ?? null };
    } catch (e) { out.twintCheckError = e.message; }
  }
  return NextResponse.json(out, { headers: { 'Cache-Control': 'no-store' } });
}
