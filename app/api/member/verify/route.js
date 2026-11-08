// Opens the member session from a one-time e-mail link.
import { NextResponse } from 'next/server';
import { consumeMagic, sessionCookie, isActiveMember } from '../../../../lib/member';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const u = new URL(req.url);
  const m = await consumeMagic(u.searchParams.get('t') || '').catch(() => null);
  const lang = m?.lang === 'fr' ? 'fr' : 'es';
  if (!m || !(await isActiveMember(m.e).catch(() => false))) return NextResponse.redirect(new URL(`/${lang}/miembros?e=link`, req.url));
  const res = NextResponse.redirect(new URL(`/${lang}/miembros`, req.url));
  const c = sessionCookie(m.e);
  res.cookies.set(c.name, c.value, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: c.maxAge });
  return res;
}
