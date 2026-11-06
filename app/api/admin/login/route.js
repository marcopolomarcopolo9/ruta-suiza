import { NextResponse } from 'next/server';
import { passwordOk, sessionValue, COOKIE, ipOf } from '../../../../lib/adminAuth';
import { allow, storeReady } from '../../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ ok: false, error: 'no_password_set' }, { status: 503 });
  if (storeReady() && !(await allow(`login:${ipOf(req)}`, 10, 900))) return NextResponse.json({ ok: false, error: 'too_many' }, { status: 429 });
  let body = {};
  try { body = await req.json(); } catch { /* empty */ }
  if (!passwordOk(body.password)) return NextResponse.json({ ok: false, error: 'wrong' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, sessionValue(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 30 });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
