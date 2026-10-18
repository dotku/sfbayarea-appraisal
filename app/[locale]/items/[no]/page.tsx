import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getPublicItem } from '@/lib/publicItems';
import { estimateText } from '@/components/ItemCard';

export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; no: string }> }): Promise<Metadata> {
  const { locale, no } = await params;
  const item = await getPublicItem(no);
  if (!item) return {};
  return { title: `${locale === 'en' && item.titleEn ? item.titleEn : item.title} (${item.no})` };
}

export default async function ItemPage({ params }: { params: Promise<{ no: string }> }) {
  const { no } = await params;
  const item = await getPublicItem(no);
  if (!item) notFound();
  const t = await getTranslations('items');
  const nav = await getTranslations('nav');
  const title = (await getLocale()) === 'en' && item.titleEn ? item.titleEn : item.title;
  const est = estimateText(item);

  const rows: [string, string][] = (
    [
      [t('no'), item.no],
      [t('era'), item.era],
      [t('material'), item.material],
      [t('size'), item.dimensions],
      [t('marks'), item.marks],
      [t('condition'), item.condition],
    ] as [string, string][]
  ).filter(([, v]) => v);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/items" className="text-sm text-muted hover:text-ink">← {t('back')}</Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          {item.images.length === 0 && <div className="aspect-square rounded-sm bg-[#ece7df]" />}
          {item.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`${title} ${i + 1}`} className="w-full rounded-sm border border-line bg-[#ece7df] object-contain" />
          ))}
        </div>

        <div className="md:sticky md:top-24 md:self-start">
          <p className="text-sm text-gold">{t(`cat.${item.category}`)} · {t(item.stage)}</p>
          <h1 className="mt-2 font-serif text-3xl font-bold leading-tight">{title}</h1>
          {est && (
            <p className="mt-4 text-lg">
              <span className="text-muted">{t('estimate')}</span> <span className="font-semibold">{est}</span>
            </p>
          )}
          <dl className="mt-6 divide-y divide-line border-y border-line text-[15px]">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[5rem_1fr] gap-3 py-2.5">
                <dt className="text-muted">{k}</dt>
                <dd className="whitespace-pre-line">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t('note')}</p>
          <div className="mt-8 rounded-sm border border-line bg-card p-5">
            <p className="text-[15px]">{t('interested')}</p>
            <Link href="/contact" className="mt-3 inline-block rounded-sm bg-accent px-5 py-2.5 text-accent-ink hover:opacity-90">
              {nav('contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
