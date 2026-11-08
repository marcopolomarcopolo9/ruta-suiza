import Checklist from '../../../components/Checklist';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'checklist', undefined, `/${params.lang}/checklist`); }

export default function Page({ params }) {
  const lang = params.lang === 'fr' ? 'fr' : 'es';
  return (
    <section className="view on checklist-page">
      <div className="article">
        <div className="eyebrow">{lang === 'fr' ? 'Checklist gratuite' : 'Checklist gratis'}</div>
        <h1>{lang === 'fr' ? 'Les 20 démarches à l’arrivée en Suisse' : 'Los 20 trámites al llegar a Suiza'}</h1>
        <p className="lead">{lang === 'fr' ? 'Dans l’ordre, avec leurs délais et un lien vers le guide pour chacune : avant de venir, les 2 premières semaines, les 3 premiers mois et la première année. Coche au fur et à mesure.' : 'En orden, con sus plazos y un enlace a la guía de cada uno: antes de venir, las 2 primeras semanas, los 3 primeros meses y el primer año. Márcalos a medida que avanzas.'}</p>
        <Checklist lang={lang} />
      </div>
    </section>
  );
}
