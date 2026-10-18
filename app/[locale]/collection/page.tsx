import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { COLLECTION } from '@/lib/collection';
import CollectionGrid from '@/components/CollectionGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'collection' });
  return { title: t('title'), description: t('lead') };
}

export default function CollectionPage() {
  const t = useTranslations('collection');

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">{t('title')}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-ink/80">{t('lead')}</p>
      <p className="mt-5 max-w-3xl rounded-sm border border-line bg-card p-4 text-sm leading-relaxed text-ink/80">{t('disclaimer')}</p>
      <div className="mt-10">
        <CollectionGrid items={COLLECTION} />
      </div>
    </div>
  );
}
