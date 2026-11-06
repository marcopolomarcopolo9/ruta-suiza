import { notFound } from 'next/navigation';
import View from '../../../../components/View';
import { meta, site } from '../../../../lib/render';
import { listCmsNews } from '../../../../lib/newsStore';

export const revalidate = 300;
export const dynamicParams = true; // news created in the CMS get their page on demand
export function generateStaticParams() { return site.NEWS.map((n) => ({ id: n.id })); }

export async function generateMetadata({ params }) {
  const extra = await listCmsNews();
  const n = extra.find((x) => x.id === params.id) || site.NEWS.find((x) => x.id === params.id);
  if (!n) return {};
  const m = meta(params.lang, 'noticia', params.id, `/${params.lang}/noticias/${params.id}`, extra);
  const img = site.NEWS_IMG[n.img] ? `/news/${n.img}.jpg` : n.imgUrl || null;
  if (img) m.openGraph = { ...m.openGraph, type: 'article', images: [img] };
  return m;
}
export default async function Page({ params }) {
  const extra = await listCmsNews();
  if (!extra.some((x) => x.id === params.id) && !site.NEWS.some((x) => x.id === params.id)) notFound();
  return <View lang={params.lang} view="noticia" arg={params.id} extra={extra} />;
}
