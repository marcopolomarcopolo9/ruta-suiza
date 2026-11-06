import View from '../../../../components/View';
import { meta, site } from '../../../../lib/render';

export const dynamicParams = false;
export function generateStaticParams() { return site.POSTS.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }) {
  const m = meta(params.lang, 'post', params.slug, `/${params.lang}/blog/${params.slug}`);
  const p = site.POSTS.find((x) => x.slug === params.slug);
  m.openGraph = { ...m.openGraph, type: 'article', publishedTime: p.date, images: p.img ? [`/news/${p.img}.jpg`] : undefined };
  return m;
}
export default function Page({ params }) { return <View lang={params.lang} view="post" arg={params.slug} />; }
