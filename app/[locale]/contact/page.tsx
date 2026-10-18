import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { CONTACT, hasContact } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title'), description: t('lead') };
}

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-serif text-3xl font-bold sm:text-4xl">{t('title')}</h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-ink/80">{t('lead')}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <section className="rounded-sm border border-line bg-card p-6">
          {hasContact ? (
            <dl className="space-y-3 text-sm">
              {CONTACT.email && (
                <div>
                  <dt className="text-muted">{t('email')}</dt>
                  <dd>
                    <a href={`mailto:${CONTACT.email}`} className="text-accent hover:underline">{CONTACT.email}</a>
                  </dd>
                </div>
              )}
              {CONTACT.phone && (
                <div>
                  <dt className="text-muted">{t('phone')}</dt>
                  <dd>
                    <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`} className="text-accent hover:underline">{CONTACT.phone}</a>
                  </dd>
                </div>
              )}
              {CONTACT.wechat && (
                <div>
                  <dt className="text-muted">{t('wechat')}</dt>
                  <dd>{CONTACT.wechat}</dd>
                </div>
              )}
            </dl>
          ) : (
            <>
              <h2 className="font-serif text-xl font-semibold">{t('comingSoon')}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{t('comingSoonText')}</p>
            </>
          )}
          <div className="mt-6 border-t border-line pt-4 text-sm">
            <p className="text-muted">{t('area')}</p>
            <p className="mt-1">{t('areaValue')}</p>
          </div>
        </section>

        <section className="rounded-sm border border-line bg-card p-6">
          <h2 className="font-serif text-xl font-semibold">{t('prepareTitle')}</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed">
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs text-accent-ink">{n}</span>
                <span>{t(`prepare${n}`)}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
