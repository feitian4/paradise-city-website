'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import WalletButton from '@/components/WalletButton';

const languages = [
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🌐' },
  { code: 'bo', label: 'བོད་སྐད།', flag: '��️' },
];

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: t('navigation.about') },
    { href: '#healing', label: t('navigation.healing') },
    { href: '#temples', label: t('navigation.temples') },
    { href: `/${locale}/nft`, label: t('navigation.nft') },
    { href: `/${locale}/token`, label: t('navigation.token') },
    { href: `/${locale}/metaverse`, label: t('navigation.metaverse') },
    { href: `/${locale}/booking`, label: t('navigation.booking') },
    { href: '#contact', label: t('navigation.contact') },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setLangOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-dark-900/90 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex items-center">
            <a href={`/${locale}`} className="text-gold-500 font-serif text-xl font-bold tracking-wide hover:text-gold-400 transition-colors">
              {t('common.siteName')}
            </a>
            <span className="ml-2 text-gray-500 text-xs hidden sm:block tibetan-text">
              {t('common.siteNameTibetan')}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-gold-500 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Language + Wallet + Mobile Toggle */}
          <div className="flex items-center gap-3">

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center space-x-1 text-gray-300 hover:text-gold-500 transition-colors"
              >
                <GlobeAltIcon className="w-5 h-5" />
                <span className="text-sm hidden sm:block">
                  {languages.find(l => l.code === locale)?.label}
                </span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-dark-800 border border-gold-500/30 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLocale(lang.code)}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center space-x-2 hover:bg-gold-500/10 transition-colors ${
                          locale === lang.code ? 'text-gold-500' : 'text-gray-300'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wallet Button - desktop only */}
            <div className="hidden md:block">
              <WalletButton />
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-300 hover:text-gold-500"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-dark-900 border-t border-gold-500/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-300 hover:text-gold-500 transition-colors py-2 border-b border-dark-700"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <WalletButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
