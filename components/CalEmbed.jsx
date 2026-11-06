'use client';

import { useEffect } from 'react';

/** Cal.com inline booking widget. calLink is "user/event", e.g. "rutasuiza/asesoria". */
export default function CalEmbed({ calLink, name, email, lang }) {
  useEffect(() => {
    /* official Cal.com embed loader */
    (function (C, A, L) { const p = function (a, ar) { a.q.push(ar); }; const d = C.document; C.Cal = C.Cal || function () { const cal = C.Cal; const ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; }(window, 'https://app.cal.com/embed/embed.js', 'init'));
    window.Cal('init', { origin: 'https://cal.com' });
    window.Cal('inline', { elementOrSelector: '#rs-cal', calLink, layout: 'month_view', config: { name: name || '', email: email || '', locale: lang } });
    window.Cal('ui', { hideEventTypeDetails: false, layout: 'month_view', cssVarsPerTheme: { light: { 'cal-brand': '#d52b1e' } } });
  }, [calLink, name, email, lang]);
  return <div id="rs-cal" className="rs-cal" />;
}
