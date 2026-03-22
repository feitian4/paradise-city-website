'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircleIcon, StarIcon, WifiIcon, HomeIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const rooms = [
  {
    type: '标准禅修房',
    nameEn: 'Standard Meditation Room',
    price: '¥888',
    unit: '/晚',
    size: '35㎡',
    capacity: '2人',
    rating: 4,
    description: '简约藏式风格，配备传统唐卡装饰，适合独修或伴侣疗愈之旅。',
    amenities: ['高原羽绒被', '藏香冥想套件', '经文播放系统', '山景阳台', '有机早餐', '免费停车'],
    color: '#D4AF37',
  },
  {
    type: '豪华琉璃套房',
    nameEn: 'Deluxe Lapis Lazuli Suite',
    price: '¥2,888',
    unit: '/晚',
    size: '85㎡',
    capacity: '2-4人',
    rating: 5,
    description: '以药师琉璃光为主题，全景玻璃窗俯瞰雪山，配备私人藏浴和冥想室。',
    amenities: ['私人冥想室', '藏式药浴桶', '360°雪山景观', '管家服务', '专属厨师', '私人向导'],
    color: '#00CED1',
    featured: true,
  },
  {
    type: 'VIP七佛阁',
    nameEn: 'VIP Seven Buddhas Villa',
    price: '¥8,888',
    unit: '/晚',
    size: '280㎡',
    capacity: '2-6人',
    rating: 5,
    description: '独栋别墅，七个主题房间分别供奉七位药师佛，是顶级灵修与家庭疗愈首选。',
    amenities: ['独栋别墅', '私人供佛堂', '活佛加持仪式', '专属藏医师', '直升机接送', '全程管家'],
    color: '#9400D3',
  },
];

const packages = [
  {
    name: '三日身心净化套餐',
    price: '¥6,888',
    unit: '/人',
    includes: ['标准禅修房3晚', '藏医药体检', '每日冥想课程', '一次法会参与', '藏式药膳餐'],
  },
  {
    name: '七日全方位疗愈套餐',
    price: '¥18,888',
    unit: '/人',
    includes: ['豪华套房7晚', '完整色息心三法课程', '私人藏医诊疗', '朝圣导览', '开光护身符', 'NFT数字护法赠送'],
    featured: true,
  },
  {
    name: '十四日深度朝圣套餐',
    price: '¥36,888',
    unit: '/人',
    includes: ['豪华套房14晚', '全14座庙宇朝圣', '活佛专属开示', '藏医全套疗程', '元宇宙账户开通', '$SHANGRI代币空投'],
  },
];

export default function AccommodationPage() {
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
            {t('accommodation.title')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('accommodation.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gold-500 mb-8 text-center">客房类型</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((room, i) => (
              <motion.div
                key={i}
                className={`relative bg-dark-800/60 border rounded-2xl overflow-hidden ${
                  room.featured ? 'ring-2 ring-gold-500' : ''
                }`}
                style={{ borderColor: `${room.color}40` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {room.featured && (
                  <div className="absolute top-4 right-4 bg-gold-500 text-dark-900 text-xs font-bold px-3 py-1 rounded-full">
                    推荐
                  </div>
                )}

                {/* Color bar */}
                <div className="h-2" style={{ background: room.color }}></div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{room.type}</h3>
                      <p className="text-xs text-gray-500">{room.nameEn}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold" style={{ color: room.color }}>{room.price}</span>
                      <span className="text-gray-500 text-sm">{room.unit}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 my-3">
                    <span className="text-sm text-gray-400">📐 {room.size}</span>
                    <span className="text-sm text-gray-400">👤 {room.capacity}</span>
                    <div className="flex">
                      {[...Array(room.rating)].map((_, j) => (
                        <StarIcon key={j} className="w-3.5 h-3.5" style={{ color: room.color }} />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{room.description}</p>

                  <ul className="space-y-1.5 mb-6">
                    {room.amenities.map((a, j) => (
                      <li key={j} className="flex items-center text-sm text-gray-300">
                        <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: room.color }} />
                        {a}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full py-3 rounded-lg font-semibold transition-all text-sm"
                    style={{
                      background: room.featured ? room.color : 'transparent',
                      border: `1px solid ${room.color}`,
                      color: room.featured ? '#0A0A0F' : room.color,
                    }}
                  >
                    {t('accommodation.cta')}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-gold-500 mb-2 text-center">疗愈套餐</h2>
          <p className="text-gray-400 text-center mb-10">住宿 + 课程 + 疗愈一体化体验</p>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                className={`bg-dark-900/60 border border-gold-500/20 rounded-2xl p-6 ${
                  pkg.featured ? 'ring-2 ring-gold-500 bg-gold-500/5' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {pkg.featured && (
                  <div className="text-center mb-3">
                    <span className="bg-gold-500 text-dark-900 text-xs font-bold px-3 py-1 rounded-full">最受欢迎</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-1">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gold-500">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">{pkg.unit}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((item, j) => (
                    <li key={j} className="flex items-start text-sm text-gray-300">
                      <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gold-500 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    pkg.featured
                      ? 'bg-gold-500 text-dark-900 hover:bg-gold-400'
                      : 'border border-gold-500 text-gold-500 hover:bg-gold-500/10'
                  }`}
                >
                  {t('common.bookNow')}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
