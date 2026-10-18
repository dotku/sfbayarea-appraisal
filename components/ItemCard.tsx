import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { PublicItem } from '@/lib/publicItems';

export const usd = (n: number | null) => (n == null ? '' : `$${n.toLocaleString('en-US')}`);

export function estimateText(i: Pick<PublicItem, 'estimateLow' | 'estimateHigh'>) {
  if (i.estimateLow == null && i.estimateHigh == null) return '';
  if (i.estimateLow != null && i.estimateHigh != null) return `${usd(i.estimateLow)} – ${usd(i.estimateHigh)}`;
  return usd(i.estimateLow ?? i.estimateHigh);
}

export default function ItemCard({ item }: { item: PublicItem }) {
  const t = useTranslations('items');
  const title = useLocale() === 'en' && item.titleEn ? item.titleEn : item.title;
  const est = estimateText(item);

  return (
    <Link
      href={{ pathname: '/items/[no]', params: { no: item.no } }}
      className="group flex flex-col overflow-hidden rounded-sm border border-line bg-card transition hover:border-ink/30 hover:shadow-sm"
    >
      <div className="relative aspect-square bg-[#ece7df]">
        {item.images[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.images[0]} alt={title} loading="lazy" className="h-full w-full object-contain p-3" />
        )}
        <span
          className={`absolute left-3 top-3 rounded-sm px-2 py-0.5 text-xs ${
            item.stage === 'upcoming' ? 'bg-accent text-accent-ink' : item.stage === 'sold' ? 'bg-ink text-white' : 'bg-paper/90 text-muted'
          }`}
        >
          {t(item.stage)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-xs text-muted">{item.no}</p>
        <h3 className="mt-1 font-serif text-lg font-semibold leading-snug group-hover:text-accent">{title}</h3>
        <p className="mt-1 text-sm text-ink/75">
          {t(`cat.${item.category}`)}
          {item.era && ` · ${item.era}`}
        </p>
        {est && (
          <p className="mt-auto pt-3 text-sm">
            <span className="text-muted">{t('estimate')}</span> <span className="font-semibold">{est}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
