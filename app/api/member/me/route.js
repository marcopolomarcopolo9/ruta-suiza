// Member dashboard data: quota, own letters with our replies, letter templates.
import { memberEmail, isActiveMember } from '../../../../lib/member';
import { listLetters, lettersUsed, MEMBER_QUOTA } from '../../../../lib/letters';
import { TEMPLATES } from '../../../../lib/templates';
import { logError } from '../../../../lib/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const email = memberEmail(req);
  if (!email) return Response.json({ ok: false, error: 'login' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
  try {
    if (!(await isActiveMember(email))) return Response.json({ ok: false, error: 'not_member' }, { status: 403 });
    const letters = (await listLetters(500)).filter((l) => l.email === email).slice(0, 50)
      .map((l) => ({ id: l.id, createdAt: l.createdAt, note: l.note, fname: l.fname, status: l.status, reply: l.reply, repliedAt: l.repliedAt }));
    return Response.json({ ok: true, email, used: await lettersUsed(email), quota: MEMBER_QUOTA, letters, templates: TEMPLATES }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    await logError('espace membre', e);
    return Response.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
