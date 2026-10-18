import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { CONTACT, MAP_URL } from '@/lib/site';

export default function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="mt-20 border-t border-line bg-ink text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-white">{t('brand.name')}</p>
          <p className="mt-2 text-sm leading-relaxed">{t('footer.about')}</p>
          <address className="mt-3 text-sm not-italic">
            <a href={MAP_URL} target="_blank" rel="noreferrer" className="hover:text-white">
              {CONTACT.address.map((l) => <span key={l} className="block">{l}</span>)}
            </a>
          </address>
          {CONTACT.phone && (
            <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`} className="mt-2 block text-sm hover:text-white">
              {CONTACT.name ? `${CONTACT.name} · ` : ''}{CONTACT.phone}
            </a>
          )}
          {CONTACT.email && (
            <a href={`mailto:${CONTACT.email}`} className="mt-2 block text-sm hover:text-white">{CONTACT.email}</a>
          )}
        </div>
        <nav className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/items" className="hover:text-white">{t('nav.items')}</Link>
          <Link href="/collecting" className="hover:text-white">{t('nav.collecting')}</Link>
          <Link href="/services" className="hover:text-white">{t('nav.services')}</Link>
          <Link href="/collection" className="hover:text-white">{t('nav.collection')}</Link>
          <Link href="/pricing" className="hover:text-white">{t('nav.pricing')}</Link>
          <Link href="/contact" className="hover:text-white">{t('nav.contact')}</Link>
        </nav>
        <div className="text-sm">
          <p>{t('status')}</p>
          <p className="mt-3 text-white/50">{t('footer.credits')}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">{t('footer.copyright')}</div>
    </footer>
  );
}
