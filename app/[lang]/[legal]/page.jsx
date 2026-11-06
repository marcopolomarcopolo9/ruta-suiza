import View from '../../../components/View';
import { meta } from '../../../lib/render';
import { site } from '../../../lib/render';
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(site.LEGAL).map((legal) => ({ legal })); }
export function generateMetadata({ params }) { return meta(params.lang, 'legal', params.legal, `/${params.lang}/${params.legal}`); }
export default function Page({ params }) { return <View lang={params.lang} view="legal" arg={params.legal} />; }
