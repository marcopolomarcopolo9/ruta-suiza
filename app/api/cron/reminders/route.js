// Daily cron (vercel.json): e-mails a reminder to every client who has a booking tomorrow.
// Vercel sends "Authorization: Bearer <CRON_SECRET>" when CRON_SECRET is set.
import { bookingsOn, zurichNow, addDays } from '../../../../lib/agenda';
import { bookingEmail } from '../../../../lib/mail';
import { cmd, storeReady } from '../../../../lib/redis';
import { logError } from '../../../../lib/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return new Response('unauthorized', { status: 401 });
  if (!storeReady()) return Response.json({ ok: false, error: 'no_store' }, { status: 503 });
  const tomorrow = addDays(zurichNow().date, 1);
  let sent = 0;
  for (const b of await bookingsOn(tomorrow)) {
    if (!b.email) continue;
    if ((await cmd('SET', `bk:reminded:${b.id}`, '1', 'NX', 'EX', 60 * 60 * 24 * 7)) !== 'OK') continue;
    try { await bookingEmail(b, { reminder: true }); sent += 1; } catch (e) { await logError('rappel rendez-vous', e); await cmd('DEL', `bk:reminded:${b.id}`); }
  }
  return Response.json({ ok: true, date: tomorrow, sent });
}
