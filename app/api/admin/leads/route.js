import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { storeReady, listLeads, updateLead, deleteLead } from '../../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const guard = (req) => {
  if (!isAdmin(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  if (!storeReady()) return NextResponse.json({ ok: false, error: 'no_store' }, { status: 503 });
  return null;
};

export async function GET(req) {
  const g = guard(req); if (g) return g;
  return NextResponse.json({ ok: true, leads: await listLeads() }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function PATCH(req) {
  const g = guard(req); if (g) return g;
  const b = await req.json().catch(() => ({}));
  const rec = b.id ? await updateLead(String(b.id), b) : null;
  return rec ? NextResponse.json({ ok: true, lead: rec }) : NextResponse.json({ ok: false }, { status: 404 });
}

export async function DELETE(req) {
  const g = guard(req); if (g) return g;
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await deleteLead(id);
  return NextResponse.json({ ok: true });
}
