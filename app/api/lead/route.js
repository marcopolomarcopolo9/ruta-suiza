// Receives the "Hablar con una persona" / "Pregunta gratis" form and forwards it.
// Leads are saved in Upstash Redis (KV_REST_API_URL/TOKEN) and shown on /admin.
// Optionally also set LEAD_WEBHOOK_URL in Vercel (e.g. a Formspree endpoint https://formspree.io/f/xxxx,
// a Make/Zapier webhook) to get an e-mail copy.
import { storeReady, addLead, allow } from '../../../lib/store';

export const runtime = 'nodejs';

const clean = (v, max = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return Response.json({ ok: false, error: 'bad_json' }, { status: 400 }); }

  // honeypot: bots fill the hidden "website" field
  if (body.website) return Response.json({ ok: true });

  const lead = {
    first: clean(body.first, 80),
    last: clean(body.last, 80),
    phone: clean(body.phone, 40),
    email: clean(body.email, 120),
    country: clean(body.country, 60),
    message: clean(body.message, 2000),
    kind: ['pregunta', 'club'].includes(body.kind) ? body.kind : 'llamada',
    canton: clean(body.canton, 60),
    lang: body.lang === 'fr' ? 'fr' : 'es',
    page: clean(body.page, 200),
    consent: body.consent === 'on' || body.consent === true,
  };
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email);
  const phoneOk = /^[+()\d\s.-]{6,}$/.test(lead.phone);
  const club = lead.kind === 'club';
  if (!emailOk || !lead.consent || (!club && (!lead.first || !lead.last || !lead.country || !phoneOk)) || (lead.kind === 'pregunta' && !lead.message)) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!storeReady() && !url) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });
  if (storeReady() && !(await allow(`lead:${ip}`, 8, 3600))) return Response.json({ ok: false, error: 'too_many' }, { status: 429 });

  let stored = false, forwarded = false;
  if (storeReady()) {
    try { await addLead(lead); stored = true; } catch (e) { console.error('lead store failed', e.message); }
  }
  if (url) {
    const label = { pregunta: 'Pregunta gratis', llamada: 'Hablar con una persona', club: 'Club · lista de espera' }[lead.kind];
    const subject = club ? `${label} · ${lead.email}` : `${label} · ${lead.first} ${lead.last} (${lead.country}${lead.canton ? `, ${lead.canton}` : ''})`;
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: subject, _replyto: lead.email, ...lead, receivedAt: new Date().toISOString() }),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      forwarded = true;
    } catch (e) { console.error('lead forward failed', e.message); }
  }
  if (!stored && !forwarded) return Response.json({ ok: false, error: 'save_failed' }, { status: 502 });
  return Response.json({ ok: true });
}
