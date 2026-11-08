import { MEMBER_COOKIE } from '../../../../lib/member';

export const runtime = 'nodejs';
export async function POST() {
  const res = Response.json({ ok: true });
  res.headers.append('Set-Cookie', `${MEMBER_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`);
  return res;
}
