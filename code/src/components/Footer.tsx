'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-dark-900 border-t border-gold-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif text-gold-500 mb-2">
              {t('common.siteName')}
            </h3>
            <p className="text-gray-500 text-sm tibetan-text mb-3">
              {t('common.siteNameTibetan')}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">{t('navigation.about')}</a></li>
              <li><a href="#healing" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">{t('navigation.healing')}</a></li>
              <li><a href="#temples" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">{t('navigation.temples')}</a></li>
              <li><a href="#digital" className="text-gray-400 hover:text-gold-500 transition-colors text-sm">{t('navigation.digital')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('contact.title')}</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">{t('contact.info.email')}</li>
              <li className="text-gray-400 text-sm">{t('contact.info.phone')}</li>
              <li className="text-gray-400 text-sm leading-relaxed">{t('contact.info.address')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-500/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors text-sm">
              {t('footer.links.privacy')}
            </a>
            <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors text-sm">
              {t('footer.links.terms')}
            </a>
            <a href="#" className="text-gray-500 hover:text-gold-500 transition-colors text-sm">
              {t('footer.links.sitemap')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
