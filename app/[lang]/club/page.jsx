import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'club', undefined, `/${params.lang}/club`); }
export default function Page({ params }) { return <View lang={params.lang} view="club" arg={undefined} />; }
