// Receives JavaScript errors from visitors' browsers (rate-limited) and stores them for the CMS.
import { logError } from '../../../lib/errors';
import { allow, storeReady } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  if (!storeReady() || !(await allow(`err:${ip}`, 20, 3600)) || !(await allow('err:all', 300, 3600))) return new Response(null, { status: 204 });
  let b = {};
  try { b = JSON.parse(await req.text()); } catch { return new Response(null, { status: 204 }); }
  const err = new Error(String(b.message || 'Unknown error'));
  err.stack = String(b.stack || '');
  await logError('navigateur', err, { url: b.url, ua: req.headers.get('user-agent') });
  return new Response(null, { status: 204 });
}
