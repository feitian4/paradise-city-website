'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WalletButton from '@/components/WalletButton';

const SEVEN_REALMS = [
  {
    id: 1, name: '琉璃净土', nameEn: 'Lapis Lazuli Pure Land',
    buddha: '药师琉璃光如来', color: '#00CED1',
    desc: '药师七佛的核心净土，蓝色琉璃世界，无苦无难，一切皆安。',
    features: ['藏医药疗愈空间', '冥想修行区', 'NFT圣物展示'],
    status: 'available',
  },
  {
    id: 2, name: '智慧光明界', nameEn: 'Realm of Wisdom Light',
    buddha: '宝月智严光音自在王如来', color: '#C0C0C0',
    desc: '智慧与光明的殿堂，学习藏传佛教典籍与哲学的数字图书馆。',
    features: ['数字典籍馆', '智慧课程中心', '辩经道场'],
    status: 'available',
  },
  {
    id: 3, name: '金色成就界', nameEn: 'Golden Achievement Realm',
    buddha: '金色宝光妙行成就如来', color: '#D4AF37',
    desc: '祈福与成就的圣地，在此许愿、祈福，感受佛力加持。',
    features: ['祈福法会', 'NFT铸造殿', '供养广场'],
    status: 'available',
  },
  {
    id: 4, name: '无忧吉祥界', nameEn: 'Sorrowless Auspicious Realm',
    buddha: '无忧最胜吉祥如来', color: '#50C878',
    desc: '消除忧苦的绿色净土，心理咨询与情绪疗愈的数字空间。',
    features: ['心理疗愈室', '自然冥想园', '草药园'],
    status: 'coming_soon',
  },
  {
    id: 5, name: '法音遍满界', nameEn: 'Dharma Sound Realm',
    buddha: '法海雷音如来', color: '#4169E1',
    desc: '梵音与法音充满的空间，体验藏传佛教音乐与诵经的沉浸式体验。',
    features: ['梵呗音乐厅', '诵经道场', '音频疗愈室'],
    status: 'coming_soon',
  },
  {
    id: 6, name: '神通自在界', nameEn: 'Divine Power Realm',
    buddha: '法海胜慧游戏神通如来', color: '#9370DB',
    desc: '瑜伽与神通修行的紫色殿堂，探索身心灵的无限可能。',
    features: ['瑜伽修炼场', '功法传授区', '神通体验馆'],
    status: 'coming_soon',
  },
  {
    id: 7, name: '业障净化界', nameEn: 'Karma Purification Realm',
    buddha: '善名称吉祥王如来', color: '#FFD700',
    desc: '净化业障的金色圣殿，通过冥想与忏悔法门，清净心灵。',
    features: ['忏悔法坛', '业障净化冥想', '转经轮广场'],
    status: 'coming_soon',
  },
];

export default function MetaversePageClient() {
  const { isConnected } = useAccount();
  const [selected, setSelected] = useState<number | null>(null);
  const [entering, setEntering] = useState(false);

  const handleEnter = (realmId: number) => {
    if (!isConnected) return;
    setEntering(true);
    setTimeout(() => {
      setEntering(false);
      alert('元宇宙世界正在建设中，即将开放！敬请期待。');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-dark-900" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-gold-500 text-sm tracking-widest uppercase mb-4">Metaverse · 元宇宙</p>
            <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 leading-tight">
              香格里拉<br />
              <span className="text-gold-500">天堂之城</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
              七层虚拟净土，映射药师七佛愿力，构建数字时代的人间香格里拉。
            </p>
            <p className="text-gray-500 text-sm mb-10">连接钱包，以NFT护法身份进入修行</p>
            <div className="flex justify-center">
              <WalletButton />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seven Realms Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-white mb-3">七层净土</h2>
            <p className="text-gray-400">每一层对应一尊药师如来的愿力世界</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEVEN_REALMS.map((realm, i) => (
              <motion.div
                key={realm.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelected(selected === realm.id ? null : realm.id)}
                className={`relative rounded-2xl border cursor-pointer transition-all overflow-hidden ${
                  selected === realm.id
                    ? 'border-gold-500 shadow-lg shadow-gold-500/20'
                    : 'border-dark-700 hover:border-gold-500/40'
                }`}
                style={{ background: `linear-gradient(135deg, ${realm.color}11, ${realm.color}22)` }}
              >
                {/* Status Badge */}
                {realm.status === 'coming_soon' && (
                  <div className="absolute top-3 right-3 bg-dark-900/80 text-gray-400 text-xs px-2 py-1 rounded-full">
                    即将开放
                  </div>
                )}
                {realm.status === 'available' && (
                  <div className="absolute top-3 right-3 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                    ● 开放中
                  </div>
                )}

                <div className="p-6">
                  {/* Realm Number */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-4 border-2"
                    style={{ borderColor: realm.color, color: realm.color, boxShadow: `0 0 20px ${realm.color}44` }}
                  >
                    {realm.id}
                  </div>

                  <h3 className="text-white font-serif text-xl mb-1">{realm.name}</h3>
                  <p className="text-gray-500 text-xs mb-3">{realm.nameEn}</p>
                  <p className="text-gold-500/80 text-xs mb-3">主尊：{realm.buddha}</p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{realm.desc}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {realm.features.map(f => (
                      <span key={f} className="text-xs px-2 py-1 rounded-full bg-dark-700 text-gray-400">{f}</span>
                    ))}
                  </div>

                  {/* Enter Button */}
                  {selected === realm.id && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      {realm.status === 'available' ? (
                        isConnected ? (
                          <button
                            onClick={() => handleEnter(realm.id)}
                            disabled={entering}
                            className="w-full py-3 rounded-xl font-bold text-sm transition-all"
                            style={{ backgroundColor: realm.color, color: '#0A0A0F' }}
                          >
                            {entering ? '传送中...' : '进入净土 →'}
                          </button>
                        ) : (
                          <p className="text-center text-gray-500 text-sm py-2">请先连接钱包</p>
                        )
                      ) : (
                        <div className="text-center py-3 border border-gold-500/20 rounded-xl">
                          <p className="text-gold-500/60 text-sm">敬请期待</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-dark-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-serif text-white mb-8">技术支撑</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Three.js', desc: '3D渲染引擎', icon: '🎮' },
              { name: 'WebXR', desc: 'VR/AR 支持', icon: '🥽' },
              { name: 'Polygon', desc: '区块链基础', icon: '⛓️' },
              { name: 'IPFS', desc: '去中心化存储', icon: '🗄️' },
            ].map(tech => (
              <div key={tech.name} className="bg-dark-800 rounded-xl p-4 border border-dark-700">
                <div className="text-3xl mb-2">{tech.icon}</div>
                <p className="text-white font-semibold text-sm">{tech.name}</p>
                <p className="text-gray-500 text-xs mt-1">{tech.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-8">
            元宇宙引擎正在开发中，预计 2026 Q3 开放 Beta 测试
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
