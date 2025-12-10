import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function PricingPage() {
  const t = useTranslations();

  const pricingTiers = [
    {
      key: 'consultation',
      featured: false
    },
    {
      key: 'singleItem',
      featured: true
    },
    {
      key: 'multipleItems',
      featured: false
    },
    {
      key: 'collection',
      featured: false
    },
    {
      key: 'specialized',
      featured: true
    },
    {
      key: 'insurance',
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex-shrink-0 font-bold text-xl text-slate-900">
              {t('home.title')}
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-700 hover:text-slate-900">
                {t('nav.home')}
              </Link>
              <Link href="/services" className="text-slate-700 hover:text-slate-900">
                {t('nav.services')}
              </Link>
              <Link href="/pricing" className="text-slate-900 font-semibold border-b-2 border-slate-900">
                {t('nav.pricing')}
              </Link>
              <Link href="/contact" className="text-slate-700 hover:text-slate-900">
                {t('nav.contact')}
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/pricing" locale="en" className="text-sm text-slate-600 hover:text-slate-900">
                EN
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/pricing" locale="zh" className="text-sm text-slate-600 hover:text-slate-900">
                中文
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.key}
                className={`rounded-xl overflow-hidden ${
                  tier.featured
                    ? 'bg-slate-900 text-white shadow-2xl ring-4 ring-slate-900 scale-105'
                    : 'bg-white shadow-lg'
                }`}
              >
                {tier.featured && (
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-center py-2 font-semibold text-sm">
                    POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className={`text-2xl font-bold mb-2 ${tier.featured ? 'text-white' : 'text-slate-900'}`}>
                    {t(`pricing.${tier.key}`)}
                  </h3>
                  <div className={`text-4xl font-bold mb-4 ${tier.featured ? 'text-white' : 'text-slate-900'}`}>
                    {t(`pricing.${tier.key}Price`)}
                  </div>
                  <p className={`text-lg mb-6 ${tier.featured ? 'text-slate-300' : 'text-slate-600'}`}>
                    {t(`pricing.${tier.key}Desc`)}
                  </p>
                  <Link
                    href="/contact"
                    className={`block text-center py-3 px-6 rounded-lg font-semibold transition ${
                      tier.featured
                        ? 'bg-white text-slate-900 hover:bg-slate-100'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {t('contact.getInTouch')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">ℹ️</span>
              {t('pricing.note')}
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {t('pricing.noteText')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            {t('contact.subtitle')}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-slate-900 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition font-semibold text-lg"
          >
            {t('nav.contact')} →
          </Link>
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
