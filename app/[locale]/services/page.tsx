import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const CATEGORY_KEYS = ['ceramics', 'jade', 'painting', 'bronze', 'furniture', 'consulting'] as const;
const PURPOSE_KEYS = ['insurance', 'estate', 'division', 'sale'] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return { title: t('title'), description: t('lead') };
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const nav = useTranslations('nav');

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">{t('title')}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-ink/80">{t('lead')}</p>

      <h2 className="mt-12 font-serif text-2xl font-semibold">{t('categoriesTitle')}</h2>
      <div className="mt-6 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_KEYS.map((k) => (
          <div key={k} className="bg-card p-6">
            <h3 className="font-serif text-lg font-semibold">{t(k)}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{t(`${k}Text`)}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 font-serif text-2xl font-semibold">{t('purposesTitle')}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {PURPOSE_KEYS.map((k) => (
          <div key={k} className="border-l-2 border-accent pl-4">
            <h3 className="font-semibold">{t(k)}</h3>
            <p className="mt-1 text-[15px] leading-relaxed text-ink/85">{t(`${k}Text`)}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <section className="rounded-sm border border-line bg-card p-6">
          <h2 className="font-serif text-xl font-semibold">{t('deliverablesTitle')}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex gap-2">
                <span className="text-accent">✓</span>
                {t(`deliverable${n}`)}
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-sm border border-line bg-card p-6">
          <h2 className="font-serif text-xl font-semibold">{t('standardsTitle')}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/80">{t('standardsText')}</p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/contact" className="rounded-sm bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
          {nav('contact')}
        </Link>
        <Link href="/pricing" className="rounded-sm border border-ink/30 px-6 py-3 hover:border-ink">
          {nav('pricing')}
        </Link>
      </div>
    </div>
  );
}
