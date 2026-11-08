import LetterUpload from '../../../components/LetterUpload';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'carta', undefined, `/${params.lang}/carta-gratis`); }

const TX = {
  es: { k: 'Tu primera carta, gratis', h: 'Mándanos tu carta: <em>te la explicamos en español</em>', p: '¿Te llegó una carta en francés y no sabes qué hacer? Envíanos una foto. Una persona que trabaja desde hace 5 años en la administración suiza te responde por correo en 48 h como máximo: qué dice, qué tienes que hacer y antes de qué fecha.',
    steps: [['📷', 'Haz una foto', 'Con el móvil basta. Puedes tapar tus datos sensibles.'], ['📩', 'Envíala aquí', 'Una carta gratis por persona, sin compromiso.'], ['💬', 'Recibe la explicación', 'En español, por correo, en 48 h como máximo.']],
    after: '¿Recibes cartas a menudo? Con el Club (CHF 9.99 al mes) te explicamos hasta 3 cartas cada mes, respondemos tus preguntas por WhatsApp y te damos modelos de cartas.', club: 'Ver el Club', urgent: 'Si tu carta tiene un plazo muy corto (por ejemplo, un commandement de payer: 10 días), no esperes nuestra respuesta para actuar.', guide: 'Ver qué hacer con un commandement de payer' },
  fr: { k: 'Ton premier courrier, gratuit', h: 'Envoie-nous ton courrier : <em>on te l’explique</em>', p: 'Tu as reçu un courrier et tu ne sais pas quoi faire ? Envoie-nous une photo. Une personne qui travaille depuis 5 ans dans l’administration suisse te répond par e-mail en 48 h au maximum : ce qu’il dit, ce que tu dois faire et avant quelle date.',
    steps: [['📷', 'Prends une photo', 'Avec ton téléphone, ça suffit. Tu peux cacher tes données sensibles.'], ['📩', 'Envoie-la ici', 'Un courrier gratuit par personne, sans engagement.'], ['💬', 'Reçois l’explication', 'Par e-mail, en 48 h au maximum.']],
    after: 'Tu reçois souvent des courriers ? Avec le Club (CHF 9.99 par mois), on t’explique jusqu’à 3 courriers par mois, on répond à tes questions par WhatsApp et tu reçois des modèles de lettres.', club: 'Voir le Club', urgent: 'Si ton courrier a un délai très court (par exemple un commandement de payer : 10 jours), n’attends pas notre réponse pour agir.', guide: 'Que faire avec un commandement de payer' },
};

export default function Page({ params }) {
  const lang = params.lang === 'fr' ? 'fr' : 'es'; const t = TX[lang];
  return (
    <section className="view on letter-page">
      <div className="article">
        <div className="eyebrow">{t.k}</div>
        <h1 dangerouslySetInnerHTML={{ __html: t.h }} />
        <p className="lead">{t.p}</p>
        <ol className="how3 lp-steps">{t.steps.map((s, i) => <li key={i}><span className="h-n">{i + 1}</span><b>{s[0]} {s[1]}</b><p>{s[2]}</p></li>)}</ol>
        <LetterUpload lang={lang} mode="free" />
        <div className="callout"><b>⏱</b> {t.urgent} <a href={`/${lang}/blog/commandement-de-payer-que-hacer`}>{t.guide} →</a></div>
        <div className="probs-club"><div>{t.after}</div><a className="btn btn-ok" href={`/${lang}/club`}>{t.club} →</a></div>
      </div>
    </section>
  );
}
