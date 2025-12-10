import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function ContactPage() {
  const t = useTranslations();

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
              <Link href="/pricing" className="text-slate-700 hover:text-slate-900">
                {t('nav.pricing')}
              </Link>
              <Link href="/contact" className="text-slate-900 font-semibold border-b-2 border-slate-900">
                {t('nav.contact')}
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/contact" locale="en" className="text-sm text-slate-600 hover:text-slate-900">
                EN
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/contact" locale="zh" className="text-sm text-slate-600 hover:text-slate-900">
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
            {t('contact.title')}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                {t('contact.contactInfo')}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">📍</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">
                      {t('footer.address')}
                    </h3>
                    <p className="text-slate-600">
                      {t('footer.addressValue')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-3xl mr-4">📞</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">
                      {t('footer.phone')}
                    </h3>
                    <p className="text-slate-600">
                      {t('footer.phoneValue')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-3xl mr-4">📧</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">
                      {t('footer.email')}
                    </h3>
                    <p className="text-slate-600">
                      {t('footer.emailValue')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-3xl mr-4">🕐</div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">
                      {t('contact.officeHours')}
                    </h3>
                    <p className="text-slate-600">
                      {t('contact.officeHoursValue')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 bg-slate-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-slate-500">🗺️ Map Coming Soon</p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                {t('contact.sendMessage')}
              </h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('contact.namePlaceholder')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    {t('contact.emailAddress')}
                  </label>
                  <input
                    type="email"
                    placeholder={t('contact.emailPlaceholder')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    {t('contact.subject')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('contact.subjectPlaceholder')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={6}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white px-8 py-4 rounded-lg hover:bg-slate-800 transition font-semibold text-lg"
                >
                  {t('contact.submit')}
                </button>
              </form>
            </div>
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
