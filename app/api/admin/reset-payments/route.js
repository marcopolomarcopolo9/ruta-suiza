// Admin: wipes the payment entries recorded in the site's database (e.g. after changing Stripe account).
import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { resetPayments } from '../../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  if (body.confirm !== 'RESET') return NextResponse.json({ ok: false, error: 'confirm' }, { status: 400 });
  return NextResponse.json({ ok: true, deleted: await resetPayments() });
}
