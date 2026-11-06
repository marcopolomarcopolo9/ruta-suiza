import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'precios', undefined, `/${params.lang}/precios`); }
export default function Page({ params }) { return <View lang={params.lang} view="precios" arg={undefined} />; }
