import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { isAdmin } from '../../../../lib/adminAuth';
import { listTestimonials, saveTestimonial, deleteTestimonial, TESTI_TAG } from '../../../../lib/testimonials';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const refresh = () => { revalidateTag(TESTI_TAG); for (const l of ['es', 'fr']) { revalidatePath(`/${l}`); revalidatePath(`/${l}/club`); } };

export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, list: await listTestimonials({ all: true }) }, { headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  try { const t = await saveTestimonial(await req.json()); refresh(); return NextResponse.json({ ok: true, item: t }); } catch (e) { return NextResponse.json({ ok: false, error: e.message }, { status: 400 }); }
}
export async function DELETE(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => ({})); await deleteTestimonial(b.id); refresh();
  return NextResponse.json({ ok: true });
}
