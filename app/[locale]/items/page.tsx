import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { CATEGORY_LABEL, type Category } from '@/lib/admin/items';
import { listPublicItems } from '@/lib/publicItems';
import ItemCard from '@/components/ItemCard';

export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'items' });
  return { title: t('title'), description: t('lead') };
}

export default async function ItemsPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const t = await getTranslations('items');
  const { cat } = await searchParams;
  const all = await listPublicItems();
  const active = cat && cat in CATEGORY_LABEL ? (cat as Category) : undefined;
  const shown = active ? all.filter((i) => i.category === active) : all;
  const present = (Object.keys(CATEGORY_LABEL) as Category[]).filter((c) => all.some((i) => i.category === c));

  const chip = (on: boolean) =>
    `rounded-full border px-4 py-1.5 text-sm transition ${on ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-card text-ink/80 hover:border-ink/40'}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">{t('title')}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-ink/80">{t('lead')}</p>

      {all.length === 0 ? (
        <p className="mt-12 rounded-sm border border-line bg-card p-8 text-center text-ink/75">{t('none')}</p>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t('title')}>
            <Link href="/items" aria-current={!active ? 'page' : undefined} className={chip(!active)}>
              {t('all')} <span className="opacity-60">{all.length}</span>
            </Link>
            {present.map((c) => (
              <Link key={c} href={{ pathname: '/items', query: { cat: c } }} aria-current={active === c ? 'page' : undefined} className={chip(active === c)}>
                {t(`cat.${c}`)} <span className="opacity-60">{all.filter((i) => i.category === c).length}</span>
              </Link>
            ))}
          </div>
          {shown.length === 0 ? (
            <p className="mt-10 text-ink/75">{t('empty')}</p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((i) => (
                <ItemCard key={i.no} item={i} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
