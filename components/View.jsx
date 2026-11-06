import Enhance from './Enhance';
import { renderView } from '../lib/render';

export default function View({ lang, view, arg }) {
  const id = view === 'legal' ? 'v-legal' : `v-${view}`;
  return (
    <>
      <section className="view on" id={id} dangerouslySetInnerHTML={{ __html: renderView(lang, view, arg) }} />
      <Enhance lang={lang} view={view} arg={arg ?? null} />
    </>
  );
}
