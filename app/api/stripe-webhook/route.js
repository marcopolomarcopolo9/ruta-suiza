// Stripe webhook: records paid sessions even if the client never reaches /reserva.
// In Stripe → Developers → Webhooks, point to https://<domain>/api/stripe-webhook,
// event checkout.session.completed, and put the signing secret in STRIPE_WEBHOOK_SECRET.
import crypto from 'crypto';
import { recordPayment } from '../../../lib/store';

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
  if (!verify(payload, req.headers.get('stripe-signature'), secret)) return new Response('bad signature', { status: 400 });
  const event = JSON.parse(payload);
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    try { await recordPayment(event.data.object); } catch (e) { console.error('record payment failed', e.message); return new Response('retry', { status: 500 }); }
  }
  return Response.json({ received: true });
}
