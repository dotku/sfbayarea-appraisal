import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { DEPARTMENTS } from '@/lib/departments';
import { listPublicItems } from '@/lib/publicItems';
import type { Category } from '@/lib/admin/items';

export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'departments' });
  return { title: t('title'), description: t('lead') };
}

export default async function DepartmentsPage() {
  const t = await getTranslations('departments');
  const items = await listPublicItems();
  const count = (cats: readonly Category[]) => items.filter((i) => cats.includes(i.category)).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-14">
      <h1 className="font-serif text-2xl font-bold sm:text-4xl">{t('title')}</h1>
      <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-ink/80 sm:mt-3 sm:text-base">{t('lead')}</p>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {DEPARTMENTS.map((d) => (
          <li key={d.slug}>
            <Link
              href={{ pathname: '/departments/[slug]', params: { slug: d.slug } }}
              className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-card transition hover:border-ink/30 hover:shadow-sm"
            >
              <span className="relative block aspect-[4/3] bg-[#ece7df]">
                <Image src={d.image} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-contain p-3 transition group-hover:scale-[1.03]" />
              </span>
              <span className="flex flex-1 flex-col p-3 sm:p-5">
                <span className="font-serif text-[15px] font-semibold leading-snug group-hover:text-accent sm:text-xl">{t(`d.${d.slug}.name`)}</span>
                <span className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-ink/75 sm:text-sm">{t(`d.${d.slug}.short`)}</span>
                <span className="mt-auto pt-3 text-xs text-muted sm:text-sm">{t('objects', { count: count(d.categories) })} →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
