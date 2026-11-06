// Server-only contact details, shown ONLY to people who have paid (Club welcome, after the CHF 39 payment,
// e-mails). The number is NOT written in the code (the GitHub repository is public): set WHATSAPP_NUMBER
// in Vercel → Settings → Environment Variables, e.g. +41781234567.
// Never import this file from a client component.
import 'server-only';

const raw = process.env.WHATSAPP_NUMBER || '';
export const WHATSAPP = raw.replace(/[^\d+]/g, '');
const digits = WHATSAPP.replace(/[^\d]/g, '');
// "+41 78 123 45 67" for Swiss mobile numbers, otherwise as given
export const WHATSAPP_LABEL = /^41\d{9}$/.test(digits) ? `+41 ${digits.slice(2, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}` : raw;
export const waHref = (text) => (digits ? `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '');
