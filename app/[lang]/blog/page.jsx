import View from '../../../components/View';
import { meta } from '../../../lib/render';

export function generateMetadata({ params }) { return meta(params.lang, 'blog', undefined, `/${params.lang}/blog`); }
export default function Page({ params }) { return <View lang={params.lang} view="blog" arg={undefined} />; }
