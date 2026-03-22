'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BuildingLibraryIcon, GlobeAltIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const milestones = [
  { year: '千年前', event: '香格里拉藏传佛教文化形成，14座庙宇相继建立' },
  { year: '1933年', event: '英国作家詹姆斯·希尔顿《消失的地平线》，香格里拉概念传播全球' },
  { year: '2001年', event: '云南中甸县正式更名为香格里拉县，官方认证人间净土' },
  { year: '2020年', event: '洛嘎活佛传承藏医药体系，开始与现代健康理念融合' },
  { year: '2024年', event: '香格里拉天堂之城项目启动，Web3赋能传统文化' },
  { year: '2026年', event: '平台正式上线，NFT首发，元宇宙开放公测' },
];

const values = [
  {
    icon: <BuildingLibraryIcon className="w-8 h-8" />,
    title: '正统性',
    desc: '14座活佛庙宇授权，洛嘎活佛藏医药传承，吴立民学术背书，根植千年文化正脉。',
  },
  {
    icon: <HeartIcon className="w-8 h-8" />,
    title: '实用性',
    desc: '色息心三法融入日常生活，在生活中了生死，在了生死中生活，佛法不离当下。',
  },
  {
    icon: <SparklesIcon className="w-8 h-8" />,
    title: '创新性',
    desc: '八万四千药叉眷属化为NFT守护令，元宇宙修行空间，区块链功德记录，古老智慧数字新生。',
  },
  {
    icon: <GlobeAltIcon className="w-8 h-8" />,
    title: '开放性',
    desc: '中英藏三语平台，面向全球求法者，无论身在何处，皆可触达香格里拉的净土加持。',
  },
];

const stats = [
  { number: '14', label: '座活佛庙宇' },
  { number: '99km', label: '朝圣主线路' },
  { number: '84,000', label: '个数字护法NFT' },
  { number: '$50M', label: '总投资规模' },
];

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-gold-500 text-sm tracking-widest uppercase mb-4">About Us</p>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                {t('about.subtitle')}
              </h1>
              <p className="text-xl text-gold-500 font-serif mb-6 tibetan-text">
                {t('common.siteNameTibetan')}
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                {t('about.description')}
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-dark-800/80 border border-gold-500/20 rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gold-500 mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gold-500 mb-3">核心价值观</h2>
            <p className="text-gray-400">三大支柱，融合文化正统、生活实践与数字创新</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                className="bg-dark-800/50 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-gold-500 mb-4">{val.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{val.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gold-500 mb-3">发展历程</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold-500/30"></div>
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className={`relative flex items-start mb-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold-500 rounded-full transform -translate-x-1/2 mt-1.5"></div>
                <div className={`ml-12 md:ml-0 md:w-5/12 ${
                  i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
                }`}>
                  <span className="text-gold-500 font-bold text-sm">{m.year}</span>
                  <p className="text-gray-300 text-sm mt-1 leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Foundation */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.blockquote
            className="text-xl md:text-2xl font-serif text-gray-300 leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            「在这里，每一次呼吸都是安般法的修行，<br />
            每一餐饭都是大食法的供养，<br />
            每一次睡眠都是入寤法的观照。」
          </motion.blockquote>
          <p className="text-gold-500 text-sm">— 吴立民《药师经法研究》</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
