import type { Metadata } from 'next';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { TARGETS, tierClass } from '@/lib/targets';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'collecting' });
  return { title: t('title'), description: t('lead') };
}

export default function CollectingPage() {
  const t = useTranslations('collecting');
  const lang = useLocale() === 'zh' ? 'zh' : 'en';

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">{t('title')}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-ink/80">{t('lead')}</p>

      <ol className="mt-10 grid gap-6 md:grid-cols-2">
        {TARGETS.map(({ key, tier, image, credit, url }, n) => (
          <li key={key} id={key} className="flex scroll-mt-20 flex-col overflow-hidden rounded-sm border border-line bg-card">
            <figure className="border-b border-line">
              <div className="relative aspect-[16/10] bg-[#ece7df]">
                <Image src={image} alt={t(`g.${key}.name`)} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-3" />
              </div>
              <figcaption className="px-4 py-1.5 text-xs text-muted">
                {t('illustration')}
                <a href={url} target="_blank" rel="noreferrer" className="hover:text-ink hover:underline">{credit[lang]}</a>
              </figcaption>
            </figure>
            <div className="flex flex-1 flex-col p-6 pt-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-serif text-xl font-semibold">
                <span className="mr-2 text-accent/70">{n + 1}</span>
                {t(`g.${key}.name`)}
              </h2>
              <span className={`shrink-0 rounded-sm px-2 py-0.5 text-xs ${tierClass(tier)}`}>{t(`g.${key}.tier`)}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{t(`g.${key}.why`)}</p>
            <dl className="mt-4 space-y-3 text-[15px] leading-relaxed">
              <div>
                <dt className="text-sm font-semibold">{t('what')}</dt>
                <dd className="text-ink/85">{t(`g.${key}.what`)}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold">{t('prep')}</dt>
                <dd className="text-ink/85">{t(`g.${key}.prep`)}</dd>
              </div>
              {t(`g.${key}.limit`) !== '—' && (
                <div>
                  <dt className="text-sm font-semibold text-accent">{t('limit')}</dt>
                  <dd className="text-ink/85">{t(`g.${key}.limit`)}</dd>
                </div>
              )}
            </dl>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 rounded-sm border border-line bg-card p-4 text-[15px] text-ink/85">{t('never')}</p>
      <Link href="/contact" className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
        {t('cta')}
      </Link>
    </div>
  );
}
