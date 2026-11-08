import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'glosario', undefined, `/${params.lang}/glosario`); }
export default function Page({ params }) { return <View lang={params.lang} view="glosario" />; }
