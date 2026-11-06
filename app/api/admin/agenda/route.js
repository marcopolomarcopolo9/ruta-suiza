// Admin agenda: week grid, weekly hours, open/close a slot, cancel a booking.
import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { storeReady } from '../../../../lib/store';
import { adminWeek, setTemplate, toggleSlot, cancelBooking, zurichNow, addDays, weekday } from '../../../../lib/agenda';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const guard = (req) => (!isAdmin(req) ? NextResponse.json({ ok: false }, { status: 401 }) : !storeReady() ? NextResponse.json({ ok: false, error: 'no_store' }, { status: 503 }) : null);

export async function GET(req) {
  const g = guard(req); if (g) return g;
  const offset = Math.max(-8, Math.min(8, Number(new URL(req.url).searchParams.get('week') || 0)));
  const today = zurichNow().date;
  const monday = addDays(today, 1 - weekday(today) + offset * 7);
  return NextResponse.json({ ok: true, ...(await adminWeek(monday)) }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req) {
  const g = guard(req); if (g) return g;
  const b = await req.json().catch(() => ({}));
  if (b.action === 'template') return NextResponse.json({ ok: true, template: await setTemplate(b.template || {}) });
  if (b.action === 'toggle') return NextResponse.json({ ok: true, state: await toggleSlot(String(b.date), Number(b.min)) });
  if (b.action === 'cancel') return NextResponse.json({ ok: await cancelBooking(String(b.id)) });
  return NextResponse.json({ ok: false }, { status: 400 });
}
