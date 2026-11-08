// Admin: letters inbox, file download, reply (e-mailed to the sender), delete, monthly counters.
import { NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/adminAuth';
import { listLetters, getLetter, getLetterFile, replyLetter, deleteLetter, allCounts, adjustCount, monthKey, MEMBER_QUOTA } from '../../../../lib/letters';
import { sendLetterReply } from '../../../../lib/mail';
import { logError } from '../../../../lib/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const no = { headers: { 'Cache-Control': 'no-store' } };

export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const id = new URL(req.url).searchParams.get('file');
  if (id) {
    const [rec, data] = await Promise.all([getLetter(id), getLetterFile(id)]);
    if (!rec || !data) return NextResponse.json({ ok: false, error: 'expired' }, { status: 404 });
    return new Response(Buffer.from(data, 'base64'), { headers: { 'Content-Type': rec.mime, 'Content-Disposition': `inline; filename="${rec.fname.replace(/[^\w.-]/g, '_')}"`, 'Cache-Control': 'no-store' } });
  }
  return NextResponse.json({ ok: true, letters: await listLetters(), counts: await allCounts(), month: monthKey(), quota: MEMBER_QUOTA }, no);
}

export async function POST(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  try {
    if (b.action === 'reply') {
      const rec = await replyLetter(b.id, b.reply);
      if (!rec) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
      let mailed = false;
      if (b.send !== false && rec.reply) { await sendLetterReply(rec); mailed = true; }
      return NextResponse.json({ ok: true, letter: rec, mailed });
    }
    if (b.action === 'count') return NextResponse.json({ ok: true, n: await adjustCount(b.email, Number(b.delta) || 0) });
    return NextResponse.json({ ok: false, error: 'action' }, { status: 400 });
  } catch (e) {
    await logError('courriers CMS', e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!isAdmin(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json().catch(() => ({}));
  await deleteLetter(b.id);
  return NextResponse.json({ ok: true });
}
