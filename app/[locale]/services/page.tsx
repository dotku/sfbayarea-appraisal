import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function ServicesPage() {
  const t = useTranslations();

  const services = [
    {
      key: 'antiques',
      icon: '🏺',
      color: 'from-amber-500 to-orange-600'
    },
    {
      key: 'artworks',
      icon: '🖼️',
      color: 'from-purple-500 to-pink-600'
    },
    {
      key: 'jewelry',
      icon: '💎',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      key: 'calligraphy',
      icon: '✍️',
      color: 'from-green-500 to-emerald-600'
    },
    {
      key: 'porcelain',
      icon: '🏺',
      color: 'from-red-500 to-rose-600'
    },
    {
      key: 'consultation',
      icon: '💼',
      color: 'from-slate-500 to-gray-600'
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
              <Link href="/services" className="text-slate-900 font-semibold border-b-2 border-slate-900">
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
              <Link href="/services" locale="en" className="text-sm text-slate-600 hover:text-slate-900">
                EN
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/services" locale="zh" className="text-sm text-slate-600 hover:text-slate-900">
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
            {t('services.title')}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.key}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold">
                    {t(`services.${service.key}`)}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-lg leading-relaxed">
                    {t(`services.${service.key}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {t('contact.getInTouch')}
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            {t('contact.subtitle')}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/pricing"
              className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition font-semibold"
            >
              {t('nav.pricing')}
            </Link>
            <Link
              href="/contact"
              className="border-2 border-slate-900 text-slate-900 px-8 py-3 rounded-lg hover:bg-slate-900 hover:text-white transition font-semibold"
            >
              {t('nav.contact')}
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
