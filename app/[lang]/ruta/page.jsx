import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'ruta', undefined, `/${params.lang}/ruta`); }
export default function Page({ params }) { return <View lang={params.lang} view="ruta" arg={undefined} />; }
