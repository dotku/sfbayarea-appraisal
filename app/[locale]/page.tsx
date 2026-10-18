import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { COLLECTION } from '@/lib/collection';
import CollectionGrid from '@/components/CollectionGrid';

const FEATURED = ['longquan-bottle', 'qing-jade-box', 'ni-zan-mount-yu', 'huanghuali-armchair', 'ritual-altar-set', 'cloisonne-table-screen'];
const CATEGORY_KEYS = ['ceramics', 'jade', 'painting', 'bronze', 'furniture', 'consulting'] as const;

export default function HomePage() {
  const t = useTranslations();
  const featured = FEATURED.map((id) => COLLECTION.find((c) => c.id === id)!);

  return (
    <>
      <p className="border-b border-line bg-card px-4 py-2 text-center text-xs text-muted sm:text-sm">{t('status')}</p>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-20">
        <div>
          <p className="text-sm tracking-wide text-gold">{t('home.eyebrow')}</p>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-5xl">{t('home.title')}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">{t('home.lead')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-sm bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
              {t('home.ctaPrimary')}
            </Link>
            <Link href="/collection" className="rounded-sm border border-ink/30 px-6 py-3 hover:border-ink">
              {t('home.ctaSecondary')}
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted">{t('home.ctaNote')}</p>
        </div>
        <figure>
          <div className="relative mx-auto aspect-3/4 w-full max-w-sm overflow-hidden rounded-sm bg-[#e9e5df]">
            <Image
              src="/collection/hero-39666.jpg"
              alt={t('home.heroCaption')}
              fill
              priority
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mx-auto mt-2 max-w-sm text-sm text-ink/70">{t('home.heroCaption')}</figcaption>
        </figure>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t('home.servicesTitle')}</h2>
          <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_KEYS.map((k) => (
              <div key={k} className="bg-card p-6">
                <h3 className="font-serif text-lg font-semibold">{t(`services.${k}`)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{t(`services.${k}Text`)}</p>
              </div>
            ))}
          </div>
          <Link href="/services" className="mt-6 inline-block text-sm text-accent hover:underline">
            {t('nav.services')} →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{t('home.collectionTitle')}</h2>
            <p className="mt-2 text-ink/75">{t('home.collectionLead')}</p>
          </div>
          <Link href="/collection" className="text-sm text-accent hover:underline">
            {t('home.viewAll')} →
          </Link>
        </div>
        <div className="mt-8">
          <CollectionGrid items={featured} filter={false} />
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-sm bg-ink p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-serif text-2xl font-semibold">{t('home.pricingTitle')}</h2>
            <p className="mt-2 text-white/75">{t('home.pricingLead')}</p>
          </div>
          <Link href="/pricing" className="shrink-0 rounded-sm bg-white px-6 py-3 text-ink hover:bg-white/90">
            {t('home.pricingCta')}
          </Link>
        </div>
      </section>
    </>
  );
}
