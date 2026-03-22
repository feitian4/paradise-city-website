'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WalletButton from '@/components/WalletButton';
import { CONTRACT_ADDRESSES } from '@/lib/web3/config';
import { MANI_NFT_ABI } from '@/lib/web3/abis';

const BUDDHA_CARDS = [
  { id: 1, name: '善名称吉祥王如来', color: '#FFD700', wish: '消除业障', total: 1000, minted: 328 },
  { id: 2, name: '宝月智严光音自在王如来', color: '#C0C0C0', wish: '智慧光明', total: 1000, minted: 512 },
  { id: 3, name: '金色宝光妙行成就如来', color: '#B87333', wish: '祈福成就', total: 1000, minted: 201 },
  { id: 4, name: '无忧最胜吉祥如来', color: '#50C878', wish: '消除忧苦', total: 1000, minted: 445 },
  { id: 5, name: '法海雷音如来', color: '#4169E1', wish: '法音遍满', total: 1000, minted: 167 },
  { id: 6, name: '法海胜慧游戏神通如来', color: '#9370DB', wish: '神通自在', total: 1000, minted: 389 },
  { id: 7, name: '药师琉璃光如来', color: '#00CED1', wish: '疗愈众生', total: 1000, minted: 756 },
];

export default function NFTPageClient() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'buddhas' | 'yakshas'>('buddhas');
  const [mintLoading, setMintLoading] = useState<number | null>(null);
  const { writeContract } = useWriteContract();

  const handleMint = async (tokenId: number, price: string) => {
    if (!isConnected || !CONTRACT_ADDRESSES.nft) return;
    setMintLoading(tokenId);
    try {
      writeContract({
        address: CONTRACT_ADDRESSES.nft as `0x${string}`,
        abi: MANI_NFT_ABI,
        functionName: 'mint',
        args: ['0x0000000000000000000000000000000000000000', BigInt(tokenId)],
        value: parseEther(price),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setMintLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold-500 text-sm tracking-widest uppercase mb-4">Digital Sacred Collection</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
              NFT <span className="text-gold-500">数字护法</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              七佛圣像与十二药叉护法，共91,000枚链上数字圣物，每一枚皆为您修行路上的永恒守护。
            </p>
            <div className="flex justify-center">
              <WalletButton />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-gold-500/20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: '总发行量', value: '91,000' },
              { label: '已铸造', value: '2,798' },
              { label: '持有者', value: '1,204' },
              { label: '公链', value: 'Polygon' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-gold-500">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-10">
            <div className="bg-dark-800 rounded-xl p-1 flex gap-1">
              {(['buddhas', 'yakshas'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab ? 'bg-gold-500 text-dark-900' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'buddhas' ? '药师七佛圣像' : '十二药叉护法'}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'buddhas' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {BUDDHA_CARDS.map((buddha, i) => (
                <motion.div
                  key={buddha.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-dark-800 rounded-2xl overflow-hidden border border-gold-500/10 hover:border-gold-500/40 transition-all"
                >
                  <div
                    className="h-56 flex items-center justify-center relative"
                    style={{ background: `linear-gradient(135deg, ${buddha.color}22, ${buddha.color}44)` }}
                  >
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-4xl border-2"
                      style={{ borderColor: buddha.color, boxShadow: `0 0 30px ${buddha.color}66` }}
                    >
                      ☸️
                    </div>
                    <div className="absolute top-3 right-3 bg-dark-900/80 rounded-full px-2 py-1 text-xs text-gray-400">
                      #{buddha.id.toString().padStart(4, '0')}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-1 leading-tight">{buddha.name}</h3>
                    <p className="text-gray-500 text-xs mb-3">愿力：{buddha.wish}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>已铸造 {buddha.minted}</span>
                        <span>共 {buddha.total}</span>
                      </div>
                      <div className="w-full bg-dark-700 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{ width: `${(buddha.minted / buddha.total) * 100}%`, backgroundColor: buddha.color }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gold-500 font-bold text-sm">0.1 MATIC</span>
                      {isConnected ? (
                        <button
                          onClick={() => handleMint(buddha.id, '0.1')}
                          disabled={mintLoading === buddha.id}
                          className="px-4 py-2 bg-gold-500 text-dark-900 rounded-lg text-xs font-bold hover:bg-gold-400 transition-all disabled:opacity-50"
                        >
                          {mintLoading === buddha.id ? '铸造中...' : '铸造'}
                        </button>
                      ) : (
                        <span className="px-4 py-2 bg-dark-700 text-gray-500 rounded-lg text-xs">连接钱包</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'yakshas' && (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🔱</div>
              <h2 className="text-2xl font-serif text-white mb-4">十二药叉大将护法</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-6">
                十二药叉大将各率七千药叉眷属，共84,000尊数字护法即将发售。
              </p>
              <div className="inline-block bg-gold-500/10 border border-gold-500/30 rounded-xl px-8 py-4">
                <p className="text-gold-500 font-semibold">敬请期待 · Coming Soon</p>
                <p className="text-gray-500 text-sm mt-1">预计 2026 Q2 发售</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
