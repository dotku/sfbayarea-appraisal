import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const TIERS = ['consultation', 'singleItem', 'multipleItems', 'collection', 'specialized', 'insurance'] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return { title: t('title'), description: t('lead') };
}

export default function PricingPage() {
  const t = useTranslations('pricing');
  const nav = useTranslations('nav');

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">{t('title')}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-ink/80">{t('lead')}</p>

      <p className="mt-10 inline-block rounded-sm border border-gold/60 px-2 py-0.5 text-xs text-gold">{t('estimated')}</p>
      <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TIERS.map((k) => (
          <div key={k} className="flex flex-col rounded-sm border border-line bg-card p-6">
            <h2 className="font-semibold">{t(k)}</h2>
            <p className="mt-3 font-serif text-3xl font-bold text-accent">{t(`${k}Price`)}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{t(`${k}Desc`)}</p>
          </div>
        ))}
      </div>

      <section className="mt-12 rounded-sm border border-line bg-card p-6">
        <h2 className="font-serif text-xl font-semibold">{t('notesTitle')}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/80">
          {[1, 2, 3].map((n) => (
            <li key={n}>{t(`note${n}`)}</li>
          ))}
        </ul>
      </section>

      <Link href="/contact" className="mt-10 inline-block rounded-sm bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
        {nav('contact')}
      </Link>
    </div>
  );
}
