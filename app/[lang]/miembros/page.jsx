import MemberArea from '../../../components/MemberArea';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { const m = meta(params.lang, 'miembros', undefined, `/${params.lang}/miembros`); m.robots = { index: false, follow: false }; return m; }

export default function Page({ params }) {
  const lang = params.lang === 'fr' ? 'fr' : 'es';
  return (
    <section className="view on member-page">
      <div className="article">
        <div className="eyebrow">Club Ruta Suiza</div>
        <h1>{lang === 'fr' ? 'Mon espace membre' : 'Mi espacio de miembro'}</h1>
        <MemberArea lang={lang} />
      </div>
    </section>
  );
}
