import Enhance from './Enhance';
import { renderView } from '../lib/render';

export default function View({ lang, view, arg, extra }) {
  const id = view === 'legal' ? 'v-legal' : `v-${view}`;
  return (
    <>
      <section className="view on" id={id} dangerouslySetInnerHTML={{ __html: renderView(lang, view, arg, extra) }} />
      <Enhance lang={lang} view={view} arg={arg ?? null} extra={extra || null} />
    </>
  );
}
