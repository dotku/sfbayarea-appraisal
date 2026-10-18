'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CATEGORIES, type Category, type CollectionItem } from '@/lib/collection';

export default function CollectionGrid({ items, filter = true }: { items: CollectionItem[]; filter?: boolean }) {
  // The full catalogue (with filter) shows the appraisal notes open; previews keep them folded.
  const t = useTranslations('collection');
  const [cat, setCat] = useState<Category | 'all'>('all');
  const shown = cat === 'all' ? items : items.filter((i) => i.category === cat);
  const present = CATEGORIES.filter((c) => items.some((i) => i.category === c));

  return (
    <div>
      {filter && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={t('filterLabel')}>
          {(['all', ...present] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                cat === c ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-card text-ink/80 hover:border-ink/40'
              }`}
            >
              {t(c)} <span className="opacity-60">{c === 'all' ? items.length : items.filter((i) => i.category === c).length}</span>
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <CollectionCard key={item.id} item={item} open={filter} />
        ))}
      </div>
    </div>
  );
}

function CollectionCard({ item, open }: { item: CollectionItem; open: boolean }) {
  const t = useTranslations('collection');
  const lang = useLocale() === 'zh' ? 'zh' : 'en';
  const points = (
    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-ink/85">
      {item.points[lang].map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  );

  return (
    <article className="flex flex-col overflow-hidden rounded-sm border border-line bg-card">
      <div className="relative aspect-[4/3] bg-[#ece7df]">
        <Image
          src={item.image}
          alt={item.title[lang]}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-3"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-paper/90 px-2 py-0.5 text-xs text-muted">{t(item.category)}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold leading-snug">{item.title[lang]}</h3>
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[15px]">
          <dt className="text-muted">{t('era')}</dt>
          <dd>{item.era[lang]}</dd>
          <dt className="text-muted">{t('material')}</dt>
          <dd>{item.material[lang]}</dd>
          <dt className="text-muted">{t('size')}</dt>
          <dd>{item.size[lang]}</dd>
        </dl>
        {open ? (
          <div className="mt-4 border-t border-line pt-3">
            <h4 className="text-sm font-semibold text-accent">{t('points')}</h4>
            {points}
          </div>
        ) : (
          <details className="group mt-4 border-t border-line pt-1">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 text-sm font-semibold text-accent [&::-webkit-details-marker]:hidden">
              {t('points')}
              <span aria-hidden="true" className="inline-block transition group-open:rotate-90">›</span>
            </summary>
            {points}
          </details>
        )}
        <p className="mt-auto pt-4 text-xs text-muted">
          {t('source')}: {item.source.name[lang]} · {t('accession')} {item.source.accession} ·{' '}
          <a href={item.source.url} target="_blank" rel="noreferrer" className="underline hover:text-ink">
            {t('viewSource')}
          </a>
        </p>
      </div>
    </article>
  );
}
