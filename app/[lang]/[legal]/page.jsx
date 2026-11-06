import { notFound } from 'next/navigation';
import View from '../../../components/View';
import { meta, site } from '../../../lib/render';

export function generateStaticParams() { return Object.keys(site.LEGAL).map((legal) => ({ legal })); }
export function generateMetadata({ params }) {
  if (!site.LEGAL[params.legal]) return { title: '404', robots: { index: false } };
  return meta(params.lang, 'legal', params.legal, `/${params.lang}/${params.legal}`);
}
export default function Page({ params }) {
  if (!site.LEGAL[params.legal]) notFound(); // unknown address → styled 404 page
  return <View lang={params.lang} view="legal" arg={params.legal} />;
}
