'use client';

import { useEffect, useMemo, useState } from 'react';

const TX = {
  es: { loc: 'es-ES', pick: '1. Elige el día', hour: '2. Elige la hora', none: 'No hay horas libres este día.', confirm: 'Confirmar mi cita', sum: 'Tu cita', tz: 'hora de Suiza', yours: 'tu hora', busy: 'Esta hora acaba de ser reservada. Elige otra, por favor.', err: 'No se pudo reservar. Inténtalo de nuevo o escríbenos.', ok: '¡Tu cita está confirmada!', okTxt: 'Una persona del equipo te contactará a esa hora por videollamada o WhatsApp (30 minutos). Si necesitas cambiarla, escríbenos.', ics: 'Añadir a mi calendario', empty: 'No hay horarios disponibles en los próximos días. Te contactamos en 24 h para fijar tu cita.', loading: 'Cargando horarios…', title: 'Asesoría privada Ruta Suiza', dur: 'Duración: 30 minutos', tzNote: (city) => `Arriba la hora de Suiza, debajo tu hora local (${city}).` },
  fr: { loc: 'fr-CH', pick: '1. Choisis le jour', hour: '2. Choisis l\'heure', none: 'Pas d\'heure libre ce jour-là.', confirm: 'Confirmer mon rendez-vous', sum: 'Ton rendez-vous', tz: 'heure suisse', yours: 'ton heure', busy: 'Cette heure vient d\'être réservée. Choisis-en une autre, s\'il te plaît.', err: 'La réservation n\'a pas fonctionné. Réessaie ou écris-nous.', ok: 'Ton rendez-vous est confirmé !', okTxt: 'Une personne de l\'équipe te contactera à cette heure par visio ou WhatsApp (30 minutes). Si tu dois le changer, écris-nous.', ics: 'Ajouter à mon agenda', empty: 'Pas de créneau disponible ces prochains jours. On te contacte dans les 24 h pour fixer ton rendez-vous.', loading: 'Chargement des créneaux…', title: 'Accompagnement privé Ruta Suiza', dur: 'Durée : 30 minutes', tzNote: (city) => `En haut l'heure suisse, en dessous ton heure locale (${city}).` },
};
const pad = (n) => String(n).padStart(2, '0');
const hm = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
const label = (date, loc, opts) => new Date(`${date}T12:00:00Z`).toLocaleDateString(loc, { timeZone: 'UTC', ...opts });

/** Offset (minutes) of a time zone at a given instant. */
function tzOffset(tz, instant) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).formatToParts(instant).map((x) => [x.type, x.value]));
  return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - Math.floor(instant.getTime() / 60000) * 60000) / 60000;
}
/** The real instant of a Zurich wall-clock time. */
function zurichInstant(date, min) {
  const [y, m, d] = date.split('-').map(Number);
  const guess = Date.UTC(y, m - 1, d, Math.floor(min / 60), min % 60);
  return new Date(guess - tzOffset('Europe/Zurich', new Date(guess)) * 60000);
}

function icsHref(b, title) {
  const d = b.date.replace(/-/g, '');
  const end = b.min + (b.duration || 30);
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ruta Suiza//FR', 'BEGIN:VEVENT', `UID:${b.id}@rutasuiza`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=Europe/Zurich:${d}T${pad(Math.floor(b.min / 60))}${pad(b.min % 60)}00`, `DTEND;TZID=Europe/Zurich:${d}T${pad(Math.floor(end / 60))}${pad(end % 60)}00`, `SUMMARY:${title}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}

export default function BookingPicker({ sessionId, lang }) {
  const t = TX[lang] || TX.es;
  const [days, setDays] = useState(null);
  const [day, setDay] = useState(null);
  const [slot, setSlot] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [done, setDone] = useState(null);
  const [tz, setTz] = useState('Europe/Zurich');
  useEffect(() => { try { setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Zurich'); } catch (e) { /* keep Zurich */ } }, []);
  const city = tz.split('/').pop().replace(/_/g, ' ');

  /** Local time (visitor's zone) of a Zurich slot, or null when it equals Swiss time. */
  const local = useMemo(() => (date, min) => {
    const inst = zurichInstant(date, min);
    if (tzOffset(tz, inst) === tzOffset('Europe/Zurich', inst)) return null;
    const time = inst.toLocaleTimeString(t.loc, { timeZone: tz, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    const sameDay = inst.toLocaleDateString('en-CA', { timeZone: tz }) === date;
    return sameDay ? time : `${time} (${inst.toLocaleDateString(t.loc, { timeZone: tz, weekday: 'short', day: 'numeric' })})`;
  }, [tz, t.loc]);

  const load = () => fetch('/api/slots', { cache: 'no-store' }).then((r) => r.json()).then((j) => {
    const ds = j.days || [];
    setDays(ds);
    setDay((cur) => (cur && ds.find((x) => x.date === cur && x.slots.length) ? cur : (ds.find((x) => x.slots.length) || {}).date || null));
  }).catch(() => setDays([]));

  useEffect(() => {
    if (sessionId !== 'preview') {
      fetch(`/api/booking?session_id=${encodeURIComponent(sessionId)}`, { cache: 'no-store' }).then((r) => r.json()).then((j) => { if (j.booking) setDone(j.booking); }).catch(() => {});
    }
    load();
  }, [sessionId]);

  const confirm = async () => {
    setBusy(true); setMsg('');
    const r = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: sessionId, date: day, min: slot, lang, tz }) });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok && j.booking) { setDone(j.booking); return; }
    if (r.status === 409) { setMsg(t.busy); setSlot(null); load(); return; }
    setMsg(t.err);
  };

  if (done) {
    const min = done.min ?? (done.hour || 0) * 60;
    const loc = local(done.date, min);
    return (
      <div className="bk bk-done">
        <b>✅ {t.ok}</b>
        <p className="bk-when">{label(done.date, t.loc, { weekday: 'long', day: 'numeric', month: 'long' })} · {hm(min)} <small>({t.tz})</small></p>
        {loc && <p className="bk-local">{loc} · {t.yours} ({city})</p>}
        <p className="muted">{t.okTxt}</p>
        <a className="btn ghost" href={icsHref({ ...done, min }, t.title)} download="rendez-vous-ruta-suiza.ics">📅 {t.ics}</a>
      </div>
    );
  }
  if (!days) return <div className="bk"><p className="muted">{t.loading}</p></div>;
  if (!days.some((d) => d.slots.length)) return <div className="bk"><p>{t.empty}</p></div>;
  const cur = days.find((d) => d.date === day);
  const showLocal = Boolean(cur && cur.slots.length && local(cur.date, cur.slots[0]) !== null);
  return (
    <div className="bk">
      <p className="muted small bk-dur">⏱ {t.dur}{showLocal ? ` · ${t.tzNote(city)}` : ''}</p>
      <h2>{t.pick}</h2>
      <div className="bk-days">
        {days.map((d) => (
          <button key={d.date} type="button" disabled={!d.slots.length} aria-pressed={d.date === day} onClick={() => { setDay(d.date); setSlot(null); setMsg(''); }}>
            <small>{label(d.date, t.loc, { weekday: 'short' })}</small><b>{label(d.date, t.loc, { day: 'numeric' })}</b><small>{label(d.date, t.loc, { month: 'short' })}</small>
          </button>
        ))}
      </div>
      <h2>{t.hour}</h2>
      {cur && cur.slots.length ? (
        <div className="bk-hours">{cur.slots.map((m) => {
          const loc = local(cur.date, m);
          return (
            <button key={m} type="button" aria-pressed={m === slot} onClick={() => { setSlot(m); setMsg(''); }}>
              <span className="bk-ch">{hm(m)}</span>
              {loc && <small className="bk-lt">{loc}</small>}
            </button>
          );
        })}</div>
      ) : <p className="muted">{t.none}</p>}
      {msg ? <p className="lerr">{msg}</p> : null}
      {slot !== null && cur ? (
        <div className="bk-sum">
          <span>{t.sum} : <b>{label(cur.date, t.loc, { weekday: 'long', day: 'numeric', month: 'long' })} · {hm(slot)}</b> <small>({t.tz})</small>
            {local(cur.date, slot) && <><br /><small>{local(cur.date, slot)} · {t.yours} ({city})</small></>}
          </span>
          <button className="btn" type="button" disabled={busy} onClick={confirm}>{t.confirm}</button>
        </div>
      ) : null}
    </div>
  );
}
