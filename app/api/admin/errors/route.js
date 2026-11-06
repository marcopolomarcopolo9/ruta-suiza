import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { listErrors, clearErrors } from '../../../../lib/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, errors: await listErrors() }, { headers: { 'Cache-Control': 'no-store' } });
}
export async function DELETE(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  await clearErrors();
  return NextResponse.json({ ok: true });
}
