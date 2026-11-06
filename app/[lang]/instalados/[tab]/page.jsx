import View from '../../../../components/View';
import { meta } from '../../../../lib/render';
import { site } from '../../../../lib/render';
export const dynamicParams = false;
export function generateStaticParams() { return site.TABS.map((t) => ({ tab: t.k })); }
export function generateMetadata({ params }) { return meta(params.lang, 'instalados', params.tab, `/${params.lang}/instalados/${params.tab}`); }
export default function Page({ params }) { return <View lang={params.lang} view="instalados" arg={params.tab} />; }
