'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  HeartIcon, 
  SparklesIcon,
  MapIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const t = useTranslations();

  const features = [
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: t('about.features.culture.title'),
      description: t('about.features.culture.description'),
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: t('about.features.nature.title'),
      description: t('about.features.nature.description'),
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: t('about.features.digital.title'),
      description: t('about.features.digital.description'),
    },
  ];

  const healingMethods = [
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: t('healing.methods.color.title'),
      subtitle: t('healing.methods.color.subtitle'),
      description: t('healing.methods.color.description'),
      benefits: t.raw('healing.methods.color.benefits'),
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: t('healing.methods.breath.title'),
      subtitle: t('healing.methods.breath.subtitle'),
      description: t('healing.methods.breath.description'),
      benefits: t.raw('healing.methods.breath.benefits'),
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: t('healing.methods.mind.title'),
      subtitle: t('healing.methods.mind.subtitle'),
      description: t('healing.methods.mind.description'),
      benefits: t.raw('healing.methods.mind.benefits'),
    },
  ];

  const buddhas = [
    { name: t('sevenBuddhas.buddhas.buddha1.name'), wish: t('sevenBuddhas.buddhas.buddha1.wish'), healing: t('sevenBuddhas.buddhas.buddha1.healing'), color: '#FFD700' },
    { name: t('sevenBuddhas.buddhas.buddha2.name'), wish: t('sevenBuddhas.buddhas.buddha2.wish'), healing: t('sevenBuddhas.buddhas.buddha2.healing'), color: '#C0C0C0' },
    { name: t('sevenBuddhas.buddhas.buddha3.name'), wish: t('sevenBuddhas.buddhas.buddha3.wish'), healing: t('sevenBuddhas.buddhas.buddha3.healing'), color: '#B87333' },
    { name: t('sevenBuddhas.buddhas.buddha4.name'), wish: t('sevenBuddhas.buddhas.buddha4.wish'), healing: t('sevenBuddhas.buddhas.buddha4.healing'), color: '#87CEEB' },
    { name: t('sevenBuddhas.buddhas.buddha5.name'), wish: t('sevenBuddhas.buddhas.buddha5.wish'), healing: t('sevenBuddhas.buddhas.buddha5.healing'), color: '#FF4500' },
    { name: t('sevenBuddhas.buddhas.buddha6.name'), wish: t('sevenBuddhas.buddhas.buddha6.wish'), healing: t('sevenBuddhas.buddhas.buddha6.healing'), color: '#9400D3' },
    { name: t('sevenBuddhas.buddhas.buddha7.name'), wish: t('sevenBuddhas.buddhas.buddha7.wish'), healing: t('sevenBuddhas.buddhas.buddha7.healing'), color: '#00CED1' },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-gold-500/10 to-transparent"></div>
        <div className="absolute inset-0 bg-dark-900/70"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="bg-gold-500 text-dark-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/30">
              {t('hero.cta')}
            </button>
            <button className="border-2 border-gold-500 text-gold-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gold-500/10 transition-all">
              {t('hero.secondaryCta')}
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gold-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gold-500 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif text-gold-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('about.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('about.subtitle')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-dark-900/50 border border-gold-500/20 rounded-2xl p-8 hover:border-gold-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-gold-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healing Section */}
      <section id="healing" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif text-gold-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('healing.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('healing.subtitle')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {healingMethods.map((method, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-b from-gold-500/10 to-transparent border border-gold-500/30 rounded-2xl p-8 hover:shadow-lg hover:shadow-gold-500/20 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-gold-500 mb-4">
                  {method.icon}
                </div>
                <h3 className="text-2xl font-serif text-white mb-1">
                  {method.title}
                </h3>
                <p className="text-gold-500 text-sm mb-4">
                  {method.subtitle}
                </p>
                <p className="text-gray-400 mb-6">
                  {method.description}
                </p>
                <ul className="space-y-2">
                  {method.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-gold-500 rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seven Buddhas Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif text-gold-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('sevenBuddhas.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('sevenBuddhas.subtitle')}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {buddhas.map((buddha, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div 
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ 
                    background: `linear-gradient(135deg, ${buddha.color}40, ${buddha.color}10)`,
                    border: `1px solid ${buddha.color}60`
                  }}
                >
                  <SparklesIcon className="w-8 h-8" style={{ color: buddha.color }} />
                </div>
                <h4 className="text-white text-sm font-medium mb-1 leading-tight">
                  {buddha.name}
                </h4>
                <p className="text-gray-400 text-xs">
                  {buddha.wish}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Section */}
      <section id="digital" className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif text-gold-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('digital.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('digital.subtitle')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-dark-900 border border-purple-500/30 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-purple-400 mb-4">
                <SparklesIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-3">
                {t('digital.nft.title')}
              </h3>
              <p className="text-gray-400 mb-6">
                {t('digital.nft.description')}
              </p>
              <button className="text-purple-400 border border-purple-400 px-6 py-2 rounded-lg hover:bg-purple-400 hover:text-white transition-all">
                {t('digital.nft.cta')}
              </button>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-900/30 to-dark-900 border border-blue-500/30 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-blue-400 mb-4">
                <GlobeAltIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-3">
                {t('digital.metaverse.title')}
              </h3>
              <p className="text-gray-400 mb-6">
                {t('digital.metaverse.description')}
              </p>
              <button className="text-blue-400 border border-blue-400 px-6 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition-all">
                {t('digital.metaverse.cta')}
              </button>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gold-500/20 to-dark-900 border border-gold-500/30 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-gold-500 mb-4">
                <SparklesIcon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-3">
                {t('digital.token.title')}
              </h3>
              <p className="text-gray-400 mb-6">
                {t('digital.token.description')}
              </p>
              <button className="text-gold-500 border border-gold-500 px-6 py-2 rounded-lg hover:bg-gold-500 hover:text-dark-900 transition-all">
                {t('digital.token.cta')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif text-gold-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {t('contact.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">{t('contact.form.name')}</label>
                  <input 
                    type="text" 
                    className="w-full bg-dark-900 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                    placeholder={t('contact.form.name')}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">{t('contact.form.email')}</label>
                  <input 
                    type="email" 
                    className="w-full bg-dark-900 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                    placeholder={t('contact.form.email')}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">{t('contact.form.phone')}</label>
                  <input 
                    type="tel" 
                    className="w-full bg-dark-900 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
                    placeholder={t('contact.form.phone')}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">{t('contact.form.message')}</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-dark-900 border border-gold-500/30 rounded-lg px-4 py-3 text-white focus:border-gold-500 focus:outline-none transition-colors resize-none"
                    placeholder={t('contact.form.message')}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gold-500 text-dark-900 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all"
                >
                  {t('contact.form.submit')}
                </button>
              </form>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-500/10 p-3 rounded-lg">
                    <MapIcon className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">地址</h4>
                    <p className="text-gray-400">{t('contact.info.address')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-500/10 p-3 rounded-lg">
                    <HeartIcon className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">邮箱</h4>
                    <p className="text-gray-400">{t('contact.info.email')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gold-500/10 p-3 rounded-lg">
                    <HomeIcon className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">电话</h4>
                    <p className="text-gray-400">{t('contact.info.phone')}</p>
                  </div>
                </div>

                {/* Team Contacts */}
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-white font-semibold mb-4">联系团队</h4>
                  <div className="space-y-4">
                    {(t.raw('contact.team') as any[]).map((member: any, i: number) => (
                      <div key={i} className="bg-dark-700 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gold-400 font-semibold">{member.name}</span>
                          <span className="text-gray-500 text-sm">{member.location}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1 text-sm">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <span className="text-green-400">WhatsApp:</span>
                            <a href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g,'')}`} className="hover:text-gold-400 transition-colors">{member.whatsapp}</a>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <span className="text-blue-400">WeChat:</span>
                            <span>{member.wechat}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <span className="text-gray-300">Tel:</span>
                            <a href={`tel:${member.tel}`} className="hover:text-gold-400 transition-colors">{member.tel}</a>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-400">
                            <span className="text-gray-300">Email:</span>
                            <a href={`mailto:${member.email}`} className="hover:text-gold-400 transition-colors">{member.email}</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
