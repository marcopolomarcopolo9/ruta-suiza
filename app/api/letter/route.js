// Receives a letter (photo or PDF): one free letter per e-mail, or up to 3 per month for Club members.
import { storeReady, allow } from '../../../lib/store';
import { logError } from '../../../lib/errors';
import { ipOf } from '../../../lib/adminAuth';
import { addLetter, checkFile, emailOk, freeLetterUsed, lettersUsed, normEmail, MEMBER_QUOTA } from '../../../lib/letters';
import { isActiveMember, memberEmail } from '../../../lib/member';
import { notifyLetter, confirmLetter } from '../../../lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return Response.json({ ok: false, error: 'bad_json' }, { status: 400 }); }
  if (b.website) return Response.json({ ok: true });
  if (!storeReady()) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  const member = b.mode === 'member';
  // anti-spam per IP: strict for the free letter, generous for members (who also have a monthly quota)
  if (!(await allow(`letter:${member ? 'm' : 'f'}:${ipOf(req)}`, member ? 30 : 8, 86400))) return Response.json({ ok: false, error: 'too_many' }, { status: 429 });
  let email = normEmail(b.email);
  try {
    if (member) {
      email = memberEmail(req);
      if (!email || !(await isActiveMember(email))) return Response.json({ ok: false, error: 'not_member' }, { status: 401 });
      if ((await lettersUsed(email)) >= MEMBER_QUOTA) return Response.json({ ok: false, error: 'quota' }, { status: 429 });
    } else {
      if (!emailOk(email) || !String(b.name || '').trim() || !(b.consent === true || b.consent === 'on')) return Response.json({ ok: false, error: 'fields' }, { status: 400 });
      if (await freeLetterUsed(email)) return Response.json({ ok: false, error: 'used' }, { status: 409 });
    }
    let file;
    try { file = checkFile(b.file); } catch (e) { return Response.json({ ok: false, error: e.message }, { status: 400 }); }
    const rec = await addLetter({ kind: member ? 'member' : 'free', name: b.name, email, lang: b.lang, note: b.note, file });
    try { await notifyLetter(rec); await confirmLetter(rec); } catch (e) { await logError('e-mail courrier', e); }
    return Response.json({ ok: true, used: member ? await lettersUsed(email) : undefined });
  } catch (e) {
    await logError('courrier', e);
    return Response.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
