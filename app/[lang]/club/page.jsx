import View from '../../../components/View';
import { meta } from '../../../lib/render';
import { listTestimonials } from '../../../lib/testimonials';

export const revalidate = 3600;
export function generateMetadata({ params }) { return meta(params.lang, 'club', undefined, `/${params.lang}/club`); }
export default async function Page({ params }) { return <View lang={params.lang} view="club" arg={undefined} extra={{ testi: await listTestimonials() }} />; }
