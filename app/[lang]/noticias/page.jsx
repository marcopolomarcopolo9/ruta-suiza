import View from '../../../components/View';
import { meta } from '../../../lib/render';
import { listCmsNews } from '../../../lib/newsStore';

export const revalidate = 300; // refreshed instantly when news are published in the CMS
export function generateMetadata({ params }) { return meta(params.lang, 'noticias', undefined, `/${params.lang}/noticias`); }
export default async function Page({ params }) {
  const extra = await listCmsNews();
  return <View lang={params.lang} view="noticias" arg={undefined} extra={extra} />;
}
