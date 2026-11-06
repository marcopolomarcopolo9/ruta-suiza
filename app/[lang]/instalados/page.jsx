import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'instalados', undefined, `/${params.lang}/instalados`); }
export default function Page({ params }) { return <View lang={params.lang} view="instalados" arg={undefined} />; }
