import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'noticias', undefined, `/${params.lang}/noticias`); }
export default function Page({ params }) { return <View lang={params.lang} view="noticias" arg={undefined} />; }
