'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPinIcon, ClockIcon, StarIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const temples = [
  { id: 1, name: '噶丹松赞林寺', nameEn: 'Ganden Sumtseling Monastery', description: '云南规模最大的藏传佛教寺院，被誉为小布达拉宫', distance: '5km', time: '2小时', rating: 5 },
  { id: 2, name: '东竹林寺', nameEn: 'Dongzhulin Monastery', description: '宁玛派寺院，珍藏大量珍贵佛教典籍与文物', distance: '80km', time: '半天', rating: 5 },
  { id: 3, name: '白马雪山寺', nameEn: 'Baimaxueshan Temple', description: '海拔4000米的神圣寺庙，俯瞰白马雪山全貌', distance: '120km', time: '全天', rating: 5 },
  { id: 4, name: '纳帕海寺', nameEn: 'Napahai Temple', description: '依傍纳帕海湿地，秋冬季可见黑颈鹤成群', distance: '8km', time: '2小时', rating: 4 },
  { id: 5, name: '碧塔海寺', nameEn: 'Bita Lake Temple', description: '普达措国家公园内，高山湖泊旁的古朴寺庙', distance: '25km', time: '半天', rating: 5 },
  { id: 6, name: '虎跳峡寺', nameEn: 'Tiger Leaping Gorge Temple', description: '世界最深峡谷旁的静谧修行圣地', distance: '100km', time: '全天', rating: 4 },
  { id: 7, name: '梅里雪山寺', nameEn: 'Meili Snow Mountain Temple', description: '朝圣卡瓦格博神山的必经寺庙，藏人心中的圣地', distance: '200km', time: '2天', rating: 5 },
  { id: 8, name: '尼西汤堆寺', nameEn: 'Nixi Tangdui Temple', description: '著名黑陶产地旁的传统藏式寺庙', distance: '65km', time: '半天', rating: 4 },
  { id: 9, name: '奔子栏寺', nameEn: 'Benzilan Temple', description: '金沙江畔的百年古寺，壁画保存完好', distance: '150km', time: '全天', rating: 4 },
  { id: 10, name: '霞若寺', nameEn: 'Xiaruo Temple', description: '深山密林中的隐修寺院，禅意深厚', distance: '90km', time: '全天', rating: 4 },
  { id: 11, name: '格咱寺', nameEn: 'Geza Temple', description: '高山草甸上的寺庙，夏季野花盛开', distance: '110km', time: '全天', rating: 4 },
  { id: 12, name: '洛吉寺', nameEn: 'Luoji Temple', description: '天然石窟改建的神秘寺庙，当地朝圣重地', distance: '70km', time: '半天', rating: 5 },
  { id: 13, name: '建塘镇宗教区', nameEn: 'Jiantang Temples', description: '古城内多座寺庙集中区域，文化底蕴深厚', distance: '2km', time: '2小时', rating: 4 },
  { id: 14, name: '天生桥寺', nameEn: 'Tianshengqiao Temple', description: '天然石桥旁的古老寺庙，自然奇景与宗教相融', distance: '40km', time: '半天', rating: 4 },
];

const routes = [
  {
    name: '主朝圣线路',
    distance: '99km',
    days: '7天',
    difficulty: '中等',
    highlights: ['噶丹松赞林寺', '碧塔海寺', '纳帕海寺', '梅里雪山寺'],
    color: 'gold',
  },
  {
    name: '深度文化线路',
    distance: '60km',
    days: '3天',
    difficulty: '简单',
    highlights: ['东竹林寺', '尼西汤堆寺', '奔子栏寺'],
    color: 'blue',
  },
  {
    name: '高山灵修线路',
    distance: '45km',
    days: '5天',
    difficulty: '困难',
    highlights: ['白马雪山寺', '霞若寺', '格咱寺', '洛吉寺'],
    color: 'purple',
  },
];

export default function TemplesPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-dark-800 to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-serif text-gold-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('temples.title')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('temples.subtitle')}
          </motion.p>
          <motion.p
            className="text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('temples.description')}
          </motion.p>
        </div>
      </section>

      {/* Routes */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gold-500 mb-8 text-center">朝圣线路</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {routes.map((route, i) => (
              <motion.div
                key={i}
                className="bg-dark-900/60 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3">{route.name}</h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="flex items-center text-sm text-gray-400">
                    <MapPinIcon className="w-4 h-4 mr-1 text-gold-500" />
                    {route.distance}
                  </span>
                  <span className="flex items-center text-sm text-gray-400">
                    <ClockIcon className="w-4 h-4 mr-1 text-gold-500" />
                    {route.days}
                  </span>
                  <span className="text-sm px-2 py-0.5 bg-gold-500/10 text-gold-500 rounded-full">
                    难度：{route.difficulty}
                  </span>
                </div>
                <ul className="space-y-1 mb-6">
                  {route.highlights.map((h, j) => (
                    <li key={j} className="flex items-center text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></span>
                      {h}
                    </li>
                  ))}
                </ul>
                <button className="w-full border border-gold-500 text-gold-500 py-2 rounded-lg hover:bg-gold-500 hover:text-dark-900 transition-all text-sm">
                  查看详情
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 Temples Grid */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gold-500 mb-8 text-center">十四座庙宇</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {temples.map((temple, i) => (
              <motion.div
                key={temple.id}
                className="bg-dark-800/60 border border-gold-500/10 rounded-xl p-6 hover:border-gold-500/40 hover:bg-dark-800 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold-500 transition-colors">
                      {temple.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{temple.nameEn}</p>
                  </div>
                  <div className="flex">
                    {[...Array(temple.rating)].map((_, j) => (
                      <StarIcon key={j} className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{temple.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <MapPinIcon className="w-3.5 h-3.5 mr-1 text-gold-500" />
                    距市区 {temple.distance}
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="w-3.5 h-3.5 mr-1 text-gold-500" />
                    参观约 {temple.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-gold-500 mb-4">开始您的朝圣之旅</h2>
          <p className="text-gray-400 mb-8">我们为您提供专业朝圣向导、藏语翻译与全程陪同服务</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gold-500 text-dark-900 px-8 py-3 rounded-lg font-semibold hover:bg-gold-400 transition-all">
              {t('common.bookNow')}
            </button>
            <button className="border border-gold-500 text-gold-500 px-8 py-3 rounded-lg hover:bg-gold-500/10 transition-all">
              {t('temples.cta')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
