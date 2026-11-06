// Books a slot after a verified CHF 39 payment (one booking per payment).
import { cookies } from 'next/headers';
import { book, bookingForSession } from '../../../lib/agenda';
import { stripe, stripeReady } from '../../../lib/stripe';
import { isAdmin } from '../../../lib/adminAuth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function paidSession(id) {
  if (!stripeReady() || !/^cs_[A-Za-z0-9_]+$/.test(id)) return null;
  try { const s = await stripe('GET', `checkout/sessions/${id}`); return s.payment_status === 'paid' && s.mode !== 'subscription' ? s : null; } catch { return null; }
}

export async function GET(req) {
  const id = new URL(req.url).searchParams.get('session_id') || '';
  if (id === 'preview' ? !isAdmin({ cookies: cookies() }) : !(await paidSession(id))) return Response.json({ ok: false }, { status: 403 });
  return Response.json({ ok: true, booking: await bookingForSession(id === 'preview' ? `preview-${Date.now()}` : id) });
}

export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  const id = String(b.session_id || '');
  const min = Number(b.min);
  const date = String(b.date || '');
  let who;
  if (id === 'preview') {
    if (!isAdmin({ cookies: cookies() })) return Response.json({ ok: false, error: 'forbidden' }, { status: 403 });
    who = { sessionId: `preview-${Date.now()}`, name: 'Test admin', email: '', phone: '', test: true };
  } else {
    const s = await paidSession(id);
    if (!s) return Response.json({ ok: false, error: 'not_paid' }, { status: 403 });
    const c = s.customer_details || {};
    who = { sessionId: s.id, name: c.name || '', email: c.email || '', phone: c.phone || '' };
  }
  const r = await book({ date, min, lang: b.lang === 'fr' ? 'fr' : 'es', tz: String(b.tz || '').slice(0, 60), ...who });
  if (r.error) return Response.json({ ok: false, error: r.error }, { status: r.error === 'taken' ? 409 : 400 });
  return Response.json({ ok: true, booking: r.booking, already: Boolean(r.already) });
}
