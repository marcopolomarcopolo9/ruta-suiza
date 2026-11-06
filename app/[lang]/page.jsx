import View from '../../components/View';
import { meta } from '../../lib/render';
export function generateMetadata({ params }) { return meta(params.lang, 'inicio', undefined, `/${params.lang}`); }
export default function Page({ params }) { return <View lang={params.lang} view="inicio" />; }
