// CMS news: list, create/update, delete — and refresh the news pages immediately.
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { isAdmin } from '../../../../lib/adminAuth';
import { storeReady } from '../../../../lib/store';
import { listCmsNews, saveCmsNews, deleteCmsNews, NEWS_TAG } from '../../../../lib/newsStore';
import { NEWS, NCAT, NEWS_IMG } from '../../../../lib/news';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const refresh = (id) => {
  revalidateTag(NEWS_TAG);
  for (const l of ['es', 'fr']) {
    revalidatePath(`/${l}/noticias`);
    revalidatePath(`/${l}`);
    if (id) revalidatePath(`/${l}/noticias/${id}`);
  }
  revalidatePath('/sitemap.xml');
};
const guard = (req) => (!isAdmin(req) ? NextResponse.json({ ok: false }, { status: 401 }) : !storeReady() ? NextResponse.json({ ok: false, error: 'no_store' }, { status: 503 }) : null);

export async function GET(req) {
  const g = guard(req); if (g) return g;
  return NextResponse.json({ ok: true, cms: await listCmsNews(), file: NEWS.map((n) => ({ id: n.id, t: n.t, date: n.date, cat: n.cat })), cats: NCAT, photos: Object.keys(NEWS_IMG) }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req) {
  const g = guard(req); if (g) return g;
  const b = await req.json().catch(() => ({}));
  try {
    const item = await saveCmsNews(b);
    refresh(item.id);
    return NextResponse.json({ ok: true, item });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  const g = guard(req); if (g) return g;
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false }, { status: 400 });
  await deleteCmsNews(id);
  refresh(id);
  return NextResponse.json({ ok: true });
}
