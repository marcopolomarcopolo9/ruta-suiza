import View from '../../../components/View';
import { meta } from '../../../lib/render';
import { listCmsNews } from '../../../lib/newsStore';
import { getLiveNews } from '../../../lib/liveNews';

export const revalidate = 300; // CMS news appear instantly; the 20 minutes feed is re-read every 30 min
export function generateMetadata({ params }) { return meta(params.lang, 'noticias', undefined, `/${params.lang}/noticias`); }
export default async function Page({ params }) {
  const [cms, live] = await Promise.all([listCmsNews(), getLiveNews(params.lang)]);
  return <View lang={params.lang} view="noticias" arg={undefined} extra={{ cms, live }} />;
}
