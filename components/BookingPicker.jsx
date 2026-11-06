'use client';

import { useEffect, useState } from 'react';

const TX = {
  es: { loc: 'es-ES', pick: '1. Elige el día', hour: '2. Elige la hora', none: 'No hay horas libres este día.', confirm: 'Confirmar mi cita', sum: 'Tu cita', tz: 'hora de Suiza', busy: 'Esta hora acaba de ser reservada. Elige otra, por favor.', err: 'No se pudo reservar. Inténtalo de nuevo o escríbenos.', ok: '¡Tu cita está confirmada!', okTxt: 'Una persona del equipo te contactará a esa hora por videollamada o WhatsApp. Si necesitas cambiarla, escríbenos.', ics: 'Añadir a mi calendario', empty: 'No hay horarios disponibles en los próximos días. Te contactamos en 24 h para fijar tu cita.', loading: 'Cargando horarios…', title: 'Asesoría privada Ruta Suiza' },
  fr: { loc: 'fr-CH', pick: '1. Choisis le jour', hour: '2. Choisis l\'heure', none: 'Pas d\'heure libre ce jour-là.', confirm: 'Confirmer mon rendez-vous', sum: 'Ton rendez-vous', tz: 'heure suisse', busy: 'Cette heure vient d\'être réservée. Choisis-en une autre, s\'il te plaît.', err: 'La réservation n\'a pas fonctionné. Réessaie ou écris-nous.', ok: 'Ton rendez-vous est confirmé !', okTxt: 'Une personne de l\'équipe te contactera à cette heure par visio ou WhatsApp. Si tu dois le changer, écris-nous.', ics: 'Ajouter à mon agenda', empty: 'Pas de créneau disponible ces prochains jours. On te contacte dans les 24 h pour fixer ton rendez-vous.', loading: 'Chargement des créneaux…', title: 'Accompagnement privé Ruta Suiza' },
};
const pad = (n) => String(n).padStart(2, '0');
const label = (date, loc, opts) => new Date(`${date}T12:00:00Z`).toLocaleDateString(loc, { timeZone: 'UTC', ...opts });

function icsHref(b, title) {
  const d = b.date.replace(/-/g, '');
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ruta Suiza//FR', 'BEGIN:VEVENT', `UID:${b.id}@rutasuiza`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Europe/Zurich:${d}T${pad(b.hour)}0000`, `DTEND;TZID=Europe/Zurich:${d}T${pad(b.hour + 1)}0000`, `SUMMARY:${title}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

export default function BookingPicker({ sessionId, lang }) {
  const t = TX[lang] || TX.es;
  const [days, setDays] = useState(null);
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(null);

  const load = () => fetch('/api/slots', { cache: 'no-store' }).then((r) => r.json()).then((j) => {
    const ds = j.days || [];
    setDays(ds);
    setDay((cur) => (cur && ds.find((x) => x.date === cur && x.hours.length) ? cur : (ds.find((x) => x.hours.length) || {}).date || null));
  }).catch(() => setDays([]));

  useEffect(() => {
    if (sessionId !== 'preview') {
      fetch(`/api/booking?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' }).then((r) => r.json()).then((j) => { if (j.booking) setDone(j.booking); }).catch(() => {});
    }
    load();
  }, [sessionId]);

  const confirm = async () => {
    setBusy(true); setMsg('');
    const r = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: sessionId, date: day, hour, lang }) });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok && j.booking) { setDone(j.booking); return; }
    if (r.status === 409) { setMsg(t.busy); setHour(null); load(); return; }
    setMsg(t.err);
  };

  if (done) {
    return (
      <div className="bk bk-done">
        <b>✅ {t.ok}</b>
        <p className="bk-when">{label(done.date, t.loc, { weekday: 'long', day: 'numeric', month: 'long' })} · {pad(done.hour)}:00 ({t.tz})</p>
        <p className="muted">{t.okTxt}</p>
        <a className="btn ghost" href={icsHref(done, t.title)} download="rendez-vous-ruta-suiza.ics">📅 {t.ics}</a>
      </div>
    );
  }
  if (!days) return <div className="bk"><p className="muted">{t.loading}</p></div>;
  if (!days.some((d) => d.hours.length)) return <div className="bk"><p>{t.empty}</p></div>;
  const cur = days.find((d) => d.date === day);
  return (
    <div className="bk">
      <h2>{t.pick}</h2>
      <div className="bk-days">
        {days.map((d) => (
          <button key={d.date} type="button" disabled={!d.hours.length} aria-pressed={d.date === day} onClick={() => { setDay(d.date); setHour(null); setMsg(''); }}>
            <small>{label(d.date, t.loc, { weekday: 'short' })}</small><b>{label(d.date, t.loc, { day: 'numeric' })}</b><small>{label(d.date, t.loc, { month: 'short' })}</small>
          </button>
        ))}
      </div>
      <h2>{t.hour}</h2>
      {cur && cur.hours.length ? (
        <div className="bk-hours">{cur.hours.map((h) => <button key={h} type="button" aria-pressed={h === hour} onClick={() => { setHour(h); setMsg(''); }}>{pad(h)}:00</button>)}</div>
      ) : <p className="muted">{t.none}</p>}
      {msg ? <p className="lerr">{msg}</p> : null}
      {hour !== null && cur ? (
        <div className="bk-sum">
          <span>{t.sum} : <b>{label(cur.date, t.loc, { weekday: 'long', day: 'numeric', month: 'long' })} · {pad(hour)}:00</b> <small>({t.tz})</small></span>
          <button className="btn" type="button" disabled={busy} onClick={confirm}>{t.confirm}</button>
        </div>
      ) : null}
    </div>
  );
}
