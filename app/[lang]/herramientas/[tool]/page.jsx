import View from '../../../../components/View';
import { meta, site } from '../../../../lib/render';

export const dynamicParams = false;
export function generateStaticParams() { return site.TOOLS.map((t) => ({ tool: t.k })); }
export function generateMetadata({ params }) { return meta(params.lang, 'herramienta', params.tool, `/${params.lang}/herramientas/${params.tool}`); }
export default function Page({ params }) { return <View lang={params.lang} view="herramienta" arg={params.tool} />; }
