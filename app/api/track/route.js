// Receives one anonymous page view (sent with navigator.sendBeacon). No cookie, no personal data stored.
import { trackHit } from '../../../lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const b = JSON.parse((await req.text()) || '{}');
    await trackHit({ path: b.p, referrer: b.r, utm: b.u, newVisit: Boolean(b.v) }, req);
  } catch { /* never fail the visitor */ }
  return new Response(null, { status: 204 });
}
