import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) {
  const m = meta(params.lang, 'vivir', undefined, `/${params.lang}/vivir-en-suiza`);
  m.openGraph = { ...m.openGraph, type: 'article', images: ['/news/votacion.jpg'] };
  return m;
}
export default function Page({ params }) { return <View lang={params.lang} view="vivir" arg={undefined} />; }
