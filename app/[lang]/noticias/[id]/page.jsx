import View from '../../../../components/View';
import { meta, site } from '../../../../lib/render';

export const dynamicParams = false;
export function generateStaticParams() { return site.NEWS.map((n) => ({ id: n.id })); }
export function generateMetadata({ params }) {
  const m = meta(params.lang, 'noticia', params.id, `/${params.lang}/noticias/${params.id}`);
  const n = site.NEWS.find((x) => x.id === params.id);
  if (n && site.NEWS_IMG[n.img]) m.openGraph = { ...m.openGraph, type: 'article', images: [`/news/${n.img}.jpg`] };
  return m;
}
export default function Page({ params }) { return <View lang={params.lang} view="noticia" arg={params.id} />; }
