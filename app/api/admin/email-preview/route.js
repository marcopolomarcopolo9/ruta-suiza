// CMS: returns every client e-mail rendered with sample data (nothing is sent).
import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { emailPreviews } from '../../../../lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const lang = new URL(req.url).searchParams.get('lang') === 'fr' ? 'fr' : 'es';
  return NextResponse.json({ ok: true, emails: await emailPreviews(lang) }, { headers: { 'Cache-Control': 'no-store' } });
}
