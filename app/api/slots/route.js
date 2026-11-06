// Public: free 1-hour slots for the next 14 days (no personal data).
import { availability } from '../../../lib/agenda';
import { storeReady } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!storeReady()) return Response.json({ ok: false, error: 'no_store' }, { status: 503 });
  return Response.json({ ok: true, days: await availability() }, { headers: { 'Cache-Control': 'no-store' } });
}
