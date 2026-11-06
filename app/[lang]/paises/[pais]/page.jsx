import View from '../../../../components/View';
import { meta } from '../../../../lib/render';
import { site } from '../../../../lib/render';
export const dynamicParams = false;
export function generateStaticParams() { return site.ORDER.map((pais) => ({ pais })); }
export function generateMetadata({ params }) { return meta(params.lang, 'pais', params.pais, `/${params.lang}/paises/${params.pais}`); }
export default function Page({ params }) { return <View lang={params.lang} view="pais" arg={params.pais} />; }
