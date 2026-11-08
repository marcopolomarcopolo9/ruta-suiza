import View from '../../components/View';
import { meta } from '../../lib/render';
import { listTestimonials } from '../../lib/testimonials';

export const revalidate = 3600; // refreshed at once when a testimonial is published
export function generateMetadata({ params }) { return meta(params.lang, 'inicio', undefined, `/${params.lang}`); }
export default async function Page({ params }) { return <View lang={params.lang} view="inicio" extra={{ testi: await listTestimonials() }} />; }
