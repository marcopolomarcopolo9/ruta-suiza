import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'paises', undefined, `/${params.lang}/paises`); }
export default function Page({ params }) { return <View lang={params.lang} view="paises" arg={undefined} />; }
