import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 font-bold text-xl text-slate-900">
              {t('home.title')}
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-700 hover:text-slate-900">
                {t('nav.home')}
              </Link>
              <Link href="/services" className="text-slate-700 hover:text-slate-900">
                {t('nav.services')}
              </Link>
              <Link href="/pricing" className="text-slate-700 hover:text-slate-900">
                {t('nav.pricing')}
              </Link>
              <Link href="/contact" className="text-slate-700 hover:text-slate-900">
                {t('nav.contact')}
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/" locale="en" className="text-sm text-slate-600 hover:text-slate-900">
                EN
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/" locale="zh" className="text-sm text-slate-600 hover:text-slate-900">
                中文
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            {t('home.description')}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/services"
              className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              {t('home.services')}
            </Link>
            <Link
              href="/pricing"
              className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg hover:border-slate-400 transition"
            >
              {t('home.pricing')}
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            {t('services.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: 'antiques', icon: '🏺' },
              { key: 'artworks', icon: '🖼️' },
              { key: 'jewelry', icon: '💎' },
              { key: 'calligraphy', icon: '✍️' },
              { key: 'porcelain', icon: '🏺' },
              { key: 'consultation', icon: '💼' },
            ].map((service) => (
              <div
                key={service.key}
                className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {t(`services.${service.key}`)}
                </h3>
                <p className="text-slate-600">
                  {t(`services.${service.key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Highlight */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('pricing.title')}</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="text-sm text-slate-400 mb-2">
                  {t('pricing.consultation')}
                </div>
                <div className="text-3xl font-bold mb-2">
                  {t('pricing.consultationPrice')}
                </div>
                <div className="text-sm text-slate-400">
                  {t('pricing.consultationDesc')}
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="text-sm text-slate-400 mb-2">
                  {t('pricing.singleItem')}
                </div>
                <div className="text-3xl font-bold mb-2">
                  {t('pricing.singleItemPrice')}
                </div>
                <div className="text-sm text-slate-400">
                  {t('pricing.singleItemDesc')}
                </div>
              </div>
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="text-sm text-slate-400 mb-2">
                  {t('pricing.specialized')}
                </div>
                <div className="text-3xl font-bold mb-2">
                  {t('pricing.specializedPrice')}
                </div>
                <div className="text-sm text-slate-400">
                  {t('pricing.specializedDesc')}
                </div>
              </div>
            </div>
            <Link
              href="/pricing"
              className="inline-block bg-white text-slate-900 px-8 py-3 rounded-lg hover:bg-slate-100 transition font-semibold"
            >
              {t('nav.pricing')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 mb-4">{t('footer.copyright')}</p>
          <div className="flex justify-center gap-8 text-sm">
            <Link href="/contact" className="text-slate-400 hover:text-white">
              {t('nav.contact')}
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{t('footer.email')}: {t('footer.emailValue')}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{t('footer.phone')}: {t('footer.phoneValue')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
