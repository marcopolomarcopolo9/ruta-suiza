import View from '../../../../components/View';
import { meta } from '../../../../lib/render';
import { site } from '../../../../lib/render';
export const dynamicParams = false;
export function generateStaticParams() { return site.GORDER.map((guia) => ({ guia })); }
export function generateMetadata({ params }) { return meta(params.lang, 'guia', params.guia, `/${params.lang}/guias/${params.guia}`); }
export default function Page({ params }) { return <View lang={params.lang} view="guia" arg={params.guia} />; }
