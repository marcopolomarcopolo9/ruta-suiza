// Receives the "Hablar con una persona" / "Pregunta gratis" form and forwards it.
// Set LEAD_WEBHOOK_URL in Vercel (e.g. a Formspree endpoint https://formspree.io/f/xxxx,
// a Make/Zapier webhook or a Google Apps Script URL). Leads are never stored here.
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
    kind: body.kind === 'pregunta' ? 'pregunta' : 'llamada',
    lang: body.lang === 'fr' ? 'fr' : 'es',
    page: clean(body.page, 200),
    consent: body.consent === 'on' || body.consent === true,
  };
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email);
  const phoneOk = /^[+()\d\s.-]{6,}$/.test(lead.phone);
  if (!lead.first || !lead.last || !lead.country || !emailOk || !phoneOk || !lead.consent || (lead.kind === 'pregunta' && !lead.message)) {
    return Response.json({ ok: false, error: 'invalid' }, { status: 422 });
  }

  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return Response.json({ ok: false, error: 'not_configured' }, { status: 503 });

  const subject = `${lead.kind === 'pregunta' ? 'Pregunta gratis' : 'Hablar con una persona'} · ${lead.first} ${lead.last} (${lead.country})`;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, _replyto: lead.email, ...lead, receivedAt: new Date().toISOString() }),
    });
    if (!r.ok) throw new Error(`webhook ${r.status}`);
  } catch (e) {
    console.error('lead forward failed', e.message);
    return Response.json({ ok: false, error: 'forward_failed' }, { status: 502 });
  }
  return Response.json({ ok: true });
}
