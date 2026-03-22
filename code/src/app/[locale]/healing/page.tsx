'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const programs = [
  {
    category: '色法 · 大食法',
    subtitle: '身体疗愈',
    color: '#D4AF37',
    description: '以藏医药理论为基础，通过食疗、药膳、外治等方式调理身体。',
    courses: [
      { name: '七日藏医药食疗营', duration: '7天', group: '6-12人', benefits: ['脉络诊断', '个性化药膳', '藏药浴疗', '外治按摩'] },
      { name: '藏药材识别与应用', duration: '3天', group: '10-20人', benefits: ['藏药园参观', '药材炮制', '简易藏药茶', '健康档案'] },
      { name: '传统酥油花制作', duration: '1天', group: '任意', benefits: ['酥油花技艺', '供佛器物', '文化体验', '作品带走'] },
    ]
  },
  {
    category: '息法 · 安般法',
    subtitle: '呼吸疗愈',
    color: '#00CED1',
    description: '以高原自然氧气为媒介，通过呼吸冥想与瑜伽净化气脉。',
    courses: [
      { name: '七日高原呼吸禅修营', duration: '7天', group: '8-15人', benefits: ['安般呼吸法', '高原氧疗', '瑜伽调息', '冥想入定'] },
      { name: '日出冥想体验', duration: '半天', group: '任意', benefits: ['黎明冥想', '呼吸练习', '日出观想', '开示法语'] },
      { name: '草甸瑜伽营', duration: '3天', group: '8-16人', benefits: ['纳帕海草甸', '晨间瑜伽', '湖边冥想', '自然疗愈'] },
    ]
  },
  {
    category: '心法 · 入寤法',
    subtitle: '心灵疗愈',
    color: '#9400D3',
    description: '以药师七佛愿力为引导，通过梦境修行与法会净化心灵。',
    courses: [
      { name: '七日药师佛法会', duration: '7天', group: '不限', benefits: ['诵经持咒', '供灯祈福', '开光加持', '法师开示'] },
      { name: '梦境修行指导', duration: '3天', group: '4-8人', benefits: ['入寤练习', '梦境记录', '意识探索', '心理整合'] },
      { name: '业障净化仪式', duration: '1天', group: '不限', benefits: ['净化烟供', '咒语加持', '火供仪式', '护法祈请'] },
    ]
  },
];

const sevenBuddhas = [
  { name: '善名称吉祥王如来', color: '#FFD700', wish: '消除业障', desc: '持诵佛号，业障消除，身心清净，得大自在。' },
  { name: '宝月智严光音自在王如来', color: '#C0C0C0', wish: '智慧光明', desc: '智慧如月，光明遍照，破无明暗，觉悟菩提。' },
  { name: '金色宝光妙行成就如来', color: '#B87333', wish: '福慧圆满', desc: '福德圆满，智慧具足，成就一切善法妙行。' },
  { name: '无忧最胜吉祥如来', color: '#87CEEB', wish: '离苦得乐', desc: '远离一切忧苦，获得究竟安乐，心无挂碍。' },
  { name: '法海雷音如来', color: '#FF4500', wish: '法音宣流', desc: '妙法如大海，法音如雷震，闻者皆发菩提心。' },
  { name: '法海胜慧游戏神通如来', color: '#9400D3', wish: '神通自在', desc: '般若智慧，神通自在，游戏三昧，利益众生。' },
  { name: '药师琉璃光如来', color: '#00CED1', wish: '疗愈众生', desc: '药师本愿，疗愈身心，琉璃光明，净化一切。' },
];

export default function HealingPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="text-gold-500 text-sm tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            以药师愿力，转娑婆为净土
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-serif text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('healing.title')}
          </motion.h1>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('healing.description')}
          </motion.p>
        </div>
      </section>

      {/* Three Methods */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Section Header */}
                <div className="flex items-center mb-8">
                  <div 
                    className="w-1 h-12 rounded-full mr-4"
                    style={{ background: program.color }}
                  ></div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif" style={{ color: program.color }}>
                      {program.category}
                    </h2>
                    <p className="text-gray-400">{program.subtitle} — {program.description}</p>
                  </div>
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  {program.courses.map((course, j) => (
                    <div
                      key={j}
                      className="bg-dark-800/60 border rounded-2xl p-6 hover:shadow-lg transition-all"
                      style={{ borderColor: `${program.color}30` }}
                    >
                      <h3 className="text-lg font-semibold text-white mb-3">{course.name}</h3>
                      <div className="flex gap-4 mb-4">
                        <span className="flex items-center text-sm text-gray-400">
                          <ClockIcon className="w-4 h-4 mr-1" style={{ color: program.color }} />
                          {course.duration}
                        </span>
                        <span className="flex items-center text-sm text-gray-400">
                          <UserGroupIcon className="w-4 h-4 mr-1" style={{ color: program.color }} />
                          {course.group}
                        </span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {course.benefits.map((benefit, k) => (
                          <li key={k} className="flex items-center text-sm text-gray-300">
                            <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: program.color }} />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="w-full py-2 rounded-lg text-sm font-medium transition-all"
                        style={{ 
                          border: `1px solid ${program.color}`,
                          color: program.color,
                        }}
                      >
                        {t('common.bookNow')}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seven Buddhas Healing */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-gold-500 mb-3">{t('sevenBuddhas.title')}</h2>
            <p className="text-gray-400">{t('sevenBuddhas.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sevenBuddhas.map((buddha, i) => (
              <motion.div
                key={i}
                className="rounded-xl p-5 border"
                style={{ 
                  background: `linear-gradient(135deg, ${buddha.color}10, transparent)`,
                  borderColor: `${buddha.color}30`
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <p className="text-xs mb-1" style={{ color: buddha.color }}>{buddha.wish}</p>
                <h3 className="text-sm font-semibold text-white mb-2 leading-tight">{buddha.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{buddha.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-900 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-gold-500 mb-4">预约您的疗愈体验</h2>
          <p className="text-gray-400 mb-8">专业藏医师一对一评估，为您量身定制身心灵疗愈方案</p>
          <button className="bg-gold-500 text-dark-900 px-10 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/30">
            {t('healing.cta')}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
