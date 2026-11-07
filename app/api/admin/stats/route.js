import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { getStats } from '../../../../lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const days = Math.max(1, Math.min(90, Number(new URL(req.url).searchParams.get('days')) || 30));
  const stats = await getStats(days);
  if (!stats) return NextResponse.json({ ok: false, error: 'no_store' }, { status: 503 });
  return NextResponse.json({ ok: true, ...stats }, { headers: { 'Cache-Control': 'no-store' } });
}
