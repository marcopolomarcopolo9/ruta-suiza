// One call that feeds the whole admin: leads, bookings, Stripe payments and subscriptions, merged clients.
import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { storeReady, listLeads, getClientNotes } from '../../../../lib/store';
import { listBookings } from '../../../../lib/agenda';
import { stripe, stripeReady } from '../../../../lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const keyOf = (email, phone) => (email ? String(email).trim().toLowerCase() : phone ? `tel:${String(phone).replace(/[^\d+]/g, '')}` : null);

async function stripeData() {
  if (!stripeReady()) return { payments: [], subs: [], error: null };
  try {
    const [ch, sb] = await Promise.all([
      stripe('GET', 'charges?limit=100'),
      stripe('GET', 'subscriptions?status=all&limit=100&expand[]=data.customer'),
    ]);
    const payments = (ch.data || []).filter((c) => c.status === 'succeeded' || c.status === 'pending').map((c) => ({
      id: c.id,
      created: c.created * 1000,
      amount: c.amount / 100,
      refunded: c.amount_refunded / 100,
      currency: String(c.currency || 'chf').toUpperCase(),
      method: c.payment_method_details?.type || null,
      product: c.invoice ? 'club' : c.amount === 3900 ? 'consultation' : 'autre',
      name: c.billing_details?.name || '',
      email: c.billing_details?.email || c.receipt_email || '',
      phone: c.billing_details?.phone || '',
      status: c.status,
      link: c.payment_intent ? `https://dashboard.stripe.com/payments/${c.payment_intent}` : `https://dashboard.stripe.com/payments/${c.id}`,
    }));
    const subs = (sb.data || []).map((s) => {
      const item = s.items?.data?.[0];
      return {
        id: s.id,
        status: s.status,
        created: s.created * 1000,
        renews: ((s.current_period_end ?? item?.current_period_end) || 0) * 1000,
        cancelAtEnd: Boolean(s.cancel_at_period_end),
        canceledAt: s.canceled_at ? s.canceled_at * 1000 : null,
        amount: (item?.price?.unit_amount || 0) / 100,
        name: s.customer?.name || '',
        email: s.customer?.email || '',
        phone: s.customer?.phone || '',
        link: `https://dashboard.stripe.com/subscriptions/${s.id}`,
      };
    });
    return { payments, subs, error: null };
  } catch (e) {
    return { payments: [], subs: [], error: e.message };
  }
}

export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  if (!storeReady()) return NextResponse.json({ ok: false, error: 'no_store' }, { status: 503 });
  const [leads, bookings, notes, st] = await Promise.all([listLeads(), listBookings(), getClientNotes(), stripeData()]);

  // merge everything into clients
  const clients = new Map();
  const get = (email, phone, name) => {
    const k = keyOf(email, phone);
    if (!k) return null;
    if (!clients.has(k)) clients.set(k, { key: k, name: '', email: email || '', phone: phone || '', country: '', leads: [], payments: [], subs: [], bookings: [], first: Infinity, last: 0 });
    const c = clients.get(k);
    if (!c.name && name) c.name = name;
    if (!c.email && email) c.email = email;
    if (!c.phone && phone) c.phone = phone;
    return c;
  };
  const touch = (c, t) => { if (!c || !t) return; c.first = Math.min(c.first, t); c.last = Math.max(c.last, t); };
  for (const l of leads) { const c = get(l.email, l.phone, [l.first, l.last].filter(Boolean).join(' ')); if (!c) continue; if (!c.country && l.country) c.country = l.country; c.leads.push(l); touch(c, Date.parse(l.createdAt)); }
  for (const p of st.payments) { const c = get(p.email, p.phone, p.name); if (!c) continue; c.payments.push(p); touch(c, p.created); }
  for (const s of st.subs) { const c = get(s.email, s.phone, s.name); if (!c) continue; c.subs.push(s); touch(c, s.created); }
  for (const b of bookings) { if (b.test) continue; const c = get(b.email, b.phone, b.name); if (!c) continue; c.bookings.push(b); touch(c, Date.parse(b.createdAt)); }

  const list = [...clients.values()].map((c) => {
    const activeSub = c.subs.find((s) => ['active', 'trialing', 'past_due'].includes(s.status));
    const paid = c.payments.reduce((sum, p) => sum + p.amount - p.refunded, 0);
    const status = activeSub ? (activeSub.cancelAtEnd ? 'member_ending' : 'member') : c.subs.length ? 'ex_member' : c.payments.length ? 'customer' : 'prospect';
    return { ...c, first: c.first === Infinity ? null : c.first, paid, status, note: notes[c.key] || '' };
  }).sort((a, b) => b.last - a.last);

  return NextResponse.json({ ok: true, leads, bookings, payments: st.payments, subs: st.subs, clients: list, stripeError: st.error, now: Date.now() }, { headers: { 'Cache-Control': 'no-store' } });
}
