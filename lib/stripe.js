// Minimal Stripe REST client (no SDK). STRIPE_SECRET_KEY must be set in Vercel.
const BASE = process.env.STRIPE_API_BASE || 'https://api.stripe.com';
// Pinned API version: Stripe changes formats between versions; the code is written for this one.
export const STRIPE_VERSION = '2025-03-31.basil';
export const stripeReady = () => Boolean(process.env.STRIPE_SECRET_KEY);

function form(obj, prefix = '', out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') form(v, key, out); else out.append(key, String(v));
  }
  return out;
}

export async function stripe(method, path, params) {
  const r = await fetch(`${BASE}/v1/${path}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded', 'Stripe-Version': STRIPE_VERSION },
    body: params ? form(params) : undefined,
    cache: 'no-store',
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || `stripe ${r.status}`);
  return j;
}
