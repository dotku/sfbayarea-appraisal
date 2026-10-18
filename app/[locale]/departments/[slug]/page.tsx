import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { DEPARTMENTS, departmentBySlug } from '@/lib/departments';
import { listPublicItems } from '@/lib/publicItems';
import { CONTACT } from '@/lib/site';
import type { Category } from '@/lib/admin/items';
import ItemCard from '@/components/ItemCard';

export const revalidate = 1800;

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const d = departmentBySlug(slug);
  if (!d) return {};
  const t = await getTranslations({ locale, namespace: 'departments' });
  return { title: t(`d.${d.slug}.name`), description: t(`d.${d.slug}.short`) };
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = departmentBySlug(slug);
  if (!d) notFound();
  const t = await getTranslations('departments');
  const c = await getTranslations('collecting');
  const lang = (await getLocale()) === 'zh' ? 'zh' : 'en';
  const items = (await listPublicItems()).filter((i) => (d.categories as readonly Category[]).includes(i.category));
  const limit = c(`g.${d.target}.limit`);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link href="/departments" className="text-sm text-muted hover:text-ink">← {t('back')}</Link>

      <section className="mt-4 grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-10">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#ece7df]">
            <Image src={d.image} alt={t(`d.${d.slug}.name`)} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-4" />
          </div>
          <figcaption className="mt-1.5 text-xs text-muted">{t('illustration')}{d.credit[lang]}</figcaption>
        </figure>
        <div>
          <p className="text-sm tracking-wide text-gold">{t('department')}</p>
          <h1 className="mt-1 font-serif text-[28px] font-bold leading-tight sm:text-4xl">{t(`d.${d.slug}.name`)}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/85 sm:text-base">{t(`d.${d.slug}.intro`)}</p>
          <a href="#consign" className="mt-6 inline-block rounded-sm bg-accent px-6 py-3 text-accent-ink hover:opacity-90">
            {t('consignTitle')}
          </a>
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-[22px] font-semibold sm:text-3xl">{t('selected')}</h2>
        <p className="mt-2 text-[15px] text-ink/75">{t('selectedLead')}</p>
        {items.length === 0 ? (
          <p className="mt-6 rounded-sm border border-line bg-card p-6 text-center text-ink/75">{t('noneYet')}</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {items.map((i) => (
              <ItemCard key={i.no} item={i} />
            ))}
          </div>
        )}
      </section>

      <section id="consign" className="mt-12 grid scroll-mt-20 gap-6 md:grid-cols-[1.3fr_1fr]">
        <div className="rounded-sm border border-line bg-card p-5 sm:p-6">
          <dl className="space-y-4 text-[15px] leading-relaxed">
            <div>
              <dt className="font-semibold">{t('lookFor')}</dt>
              <dd className="mt-1 text-ink/85">{c(`g.${d.target}.what`)}</dd>
            </div>
            <div>
              <dt className="font-semibold">{t('prepare')}</dt>
              <dd className="mt-1 text-ink/85">{c(`g.${d.target}.prep`)}</dd>
            </div>
            {limit !== '—' && (
              <div>
                <dt className="font-semibold text-accent">{t('limits')}</dt>
                <dd className="mt-1 text-ink/85">{limit}</dd>
              </div>
            )}
          </dl>
        </div>
        <div className="rounded-sm bg-ink p-5 text-white sm:p-6">
          <h2 className="font-serif text-xl font-semibold">{t('consignTitle')}</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white/80">{t('consignText')}</p>
          <dl className="mt-4 space-y-1.5 text-[15px]">
            <dt className="text-sm text-white/60">{t('contact')}</dt>
            <dd className="font-semibold">{CONTACT.name}</dd>
            <dd>
              <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`} className="hover:underline">{CONTACT.phone}</a>
            </dd>
            <dd>
              <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(t(`d.${d.slug}.name`))}`} className="hover:underline">{CONTACT.email}</a>
            </dd>
          </dl>
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="font-serif text-xl font-semibold">{t('others')}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {DEPARTMENTS.filter((o) => o.slug !== d.slug).map((o) => (
            <li key={o.slug}>
              <Link
                href={{ pathname: '/departments/[slug]', params: { slug: o.slug } }}
                className="block rounded-full border border-line bg-card px-3.5 py-1.5 text-sm hover:border-ink/40"
              >
                {t(`d.${o.slug}.name`)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
