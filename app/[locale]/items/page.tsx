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
    `shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm transition ${on ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-card text-ink/80 hover:border-ink/40'}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
      <h1 className="font-serif text-2xl font-bold sm:text-4xl">{t('title')}</h1>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink/80 sm:mt-3 sm:text-base">{t('lead')}</p>

      {all.length === 0 ? (
        <p className="mt-12 rounded-sm border border-line bg-card p-8 text-center text-ink/75">{t('none')}</p>
      ) : (
        <>
          <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label={t('title')}>
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
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
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
