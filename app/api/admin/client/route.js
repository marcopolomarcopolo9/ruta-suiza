// Save a private note on a client card.
import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { setClientNote, deleteClientData } from '../../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  if (!b.key) return NextResponse.json({ ok: false }, { status: 400 });
  await setClientNote(String(b.key).slice(0, 200), b.note || '');
  return NextResponse.json({ ok: true });
}

/** Deletes all data about a client (right to erasure). */
export async function DELETE(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  if (!b.email && !b.phone) return NextResponse.json({ ok: false }, { status: 400 });
  const n = await deleteClientData({ key: String(b.key || ''), email: b.email, phone: b.phone });
  return NextResponse.json({ ok: true, deleted: n });
}
