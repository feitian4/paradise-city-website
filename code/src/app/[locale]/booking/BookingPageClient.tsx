'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

const HIGHLIGHTS = [
  { icon: '🌿', title: '藏医药疗愈', desc: '8,000㎡疗愈中心，洛嘎活佛亲传藏医药智慧' },
  { icon: '☸️', title: '寺庙朝圣', desc: '14座活佛庙宇，99km主线朝圣之路' },
  { icon: '🏔️', title: '禅修住宿', desc: '传统民宿与现代舒适的完美融合' },
  { icon: '🌌', title: '天文体验', desc: '10,000㎡天文馆，3米口径望远镜，元宇宙天文体验' },
];

export default function BookingPageClient() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold-500 text-sm tracking-widest uppercase mb-4">Book Your Journey</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
              开启您的<span className="text-gold-500">朝圣之旅</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              在香格里拉的圣境中，体验千年藏医药智慧与现代科技的完美融合
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Highlights */}
            <div>
              <h2 className="text-2xl font-serif text-white mb-8">体验项目</h2>
              <div className="space-y-6">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 bg-dark-800 rounded-xl border border-dark-700 hover:border-gold-500/30 transition-all"
                  >
                    <div className="text-3xl flex-shrink-0">{h.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{h.title}</h3>
                      <p className="text-gray-400 text-sm">{h.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* NFT Discount */}
              <div className="mt-8 p-5 bg-gold-500/10 border border-gold-500/30 rounded-xl">
                <h3 className="text-gold-500 font-semibold mb-2">🔗 NFT持有者专属优惠</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• 药师七佛圣像 NFT：享 <strong className="text-gold-400">8折优惠</strong></li>
                  <li>• 十二药叉护法 NFT：享 <strong className="text-gold-400">9折优惠</strong></li>
                  <li>• 持有 $SHANGRI ≥ 1000：享 <strong className="text-gold-400">专属接待</strong></li>
                </ul>
                <p className="text-gray-500 text-xs mt-3">连接钱包后系统自动验证，无需手动申报</p>
              </div>
            </div>

            {/* Right: Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BookingForm />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
