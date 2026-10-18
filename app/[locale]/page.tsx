import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { listPublicItems } from '@/lib/publicItems';
import ItemCard from '@/components/ItemCard';
import { TARGETS, tierClass } from '@/lib/targets';

export const revalidate = 1800;

export default async function HomePage() {
  const t = await getTranslations();
  const items = await listPublicItems(6);

  return (
    <>
      <p className="border-b border-line bg-card px-4 py-2 text-center text-xs text-muted sm:text-sm">{t('status')}</p>

      <section className="mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 md:pt-20">
        <p className="text-sm tracking-wide text-gold">{t('home.eyebrow')}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight sm:text-5xl">{t('home.title')}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">{t('home.lead')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/items" className="rounded-sm bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
            {t('home.ctaPrimary')}
          </Link>
          <Link href="/contact" className="rounded-sm border border-ink/30 px-6 py-3 hover:border-ink">
            {t('home.ctaSecondary')}
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted">{t('home.ctaNote')}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-10">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t('home.itemsTitle')}</h2>
            <p className="mt-2 text-ink/75">{t('home.itemsLead')}</p>
          </div>
          {items.length > 0 && (
            <Link href="/items" className="text-sm text-accent hover:underline">
              {t('home.viewAll')} →
            </Link>
          )}
        </div>
        {items.length === 0 ? (
          <p className="mt-8 rounded-sm border border-line bg-card p-8 text-center text-ink/75">{t('home.itemsEmpty')}</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => (
              <ItemCard key={i.no} item={i} />
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t('home.wantTitle')}</h2>
          <p className="mt-2 text-ink/75">{t('home.wantLead')}</p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TARGETS.map(({ key, tier, image }, n) => (
              <li key={key}>
                <Link href={{ pathname: '/collecting', hash: key }} className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-card hover:border-ink/30">
                  <span className="relative block aspect-[4/3] bg-[#ece7df]">
                    <Image src={image} alt="" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-3 transition group-hover:scale-[1.03]" />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                  <span className="flex items-start justify-between gap-2">
                    <span className="font-serif text-lg font-semibold leading-snug">
                      <span className="mr-1.5 text-accent/70">{n + 1}</span>
                      {t(`collecting.g.${key}.name`)}
                    </span>
                    <span className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[11px] ${tierClass(tier)}`}>{t(`collecting.g.${key}.tier`)}</span>
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-ink/75">{t(`collecting.g.${key}.why`)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-ink/75">{t('home.wantNote')}</p>
          <p className="mt-1 text-xs text-muted">{t('home.wantImages')}</p>
          <Link href="/collecting" className="mt-4 inline-block text-sm text-accent hover:underline">
            {t('home.wantMore')} →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t('home.processTitle')}</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="border-t-2 border-accent pt-4">
              <span className="font-serif text-3xl text-accent/80">{n}</span>
              <h3 className="mt-1 font-semibold">{t(`home.step${n}`)}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{t(`home.step${n}Text`)}</p>
            </li>
          ))}
        </ol>
        <Link href="/contact" className="mt-8 inline-block rounded-sm bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
          {t('nav.contact')}
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link href="/collection" className="flex flex-col justify-between gap-2 rounded-sm border border-line bg-card p-6 hover:border-ink/30 sm:flex-row sm:items-center">
          <span>
            <span className="block font-serif text-xl font-semibold">{t('home.referenceTitle')}</span>
            <span className="mt-1 block text-[15px] text-ink/75">{t('home.referenceLead')}</span>
          </span>
          <span className="text-sm text-accent">→</span>
        </Link>
      </section>
    </>
  );
}
