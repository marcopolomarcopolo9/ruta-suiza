// Sends a one-time login link to Club members. Always answers the same way (no e-mail enumeration).
import { storeReady, allow } from '../../../../lib/store';
import { logError } from '../../../../lib/errors';
import { ipOf } from '../../../../lib/adminAuth';
import { emailOk, normEmail } from '../../../../lib/letters';
import { isActiveMember, createMagic } from '../../../../lib/member';
import { memberLink } from '../../../../lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rutasuiza.com').replace(/\/$/, '');

export async function POST(req) {
  const b = await req.json().catch(() => ({}));
  const email = normEmail(b.email);
  const lang = b.lang === 'fr' ? 'fr' : 'es';
  if (!emailOk(email)) return Response.json({ ok: false, error: 'email' }, { status: 400 });
  if (!storeReady()) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  if (!(await allow(`mlogin:${ipOf(req)}`, 10, 3600)) || !(await allow(`mlogin-e:${email}`, 4, 3600))) return Response.json({ ok: false, error: 'too_many' }, { status: 429 });
  try {
    if (await isActiveMember(email)) {
      const t = await createMagic(email, lang);
      await memberLink({ email, lang, url: `${SITE}/api/member/verify?t=${t}` });
    }
  } catch (e) { await logError('connexion membre', e); }
  return Response.json({ ok: true });
}
