'use client';

import { motion } from 'framer-motion';
import { useAccount, useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WalletButton from '@/components/WalletButton';
import { CONTRACT_ADDRESSES } from '@/lib/web3/config';
import { SHANGRI_TOKEN_ABI } from '@/lib/web3/abis';

const TOKENOMICS = [
  { label: '团队', percent: 30, color: '#D4AF37', lockup: '锁定2年' },
  { label: '投资者', percent: 50, color: '#00CED1', lockup: 'ICO/IEO' },
  { label: '社区', percent: 20, color: '#50C878', lockup: '生态奖励' },
];

const ROADMAP = [
  { quarter: '2024 Q1', title: '产品开发启动', desc: '区块链协议、钱包、交易平台开发', done: true },
  { quarter: '2024 Q3', title: '主网上线', desc: '$SHANGRI 代币正式发行，开放交易', done: true },
  { quarter: '2025 Q1', title: 'DApp 平台', desc: '去中心化应用平台上线', done: false },
  { quarter: '2025 Q4', title: 'DeFi 生态', desc: '借贷、保险、衍生品等金融服务', done: false },
  { quarter: '2026 Q2', title: 'DAO 治理', desc: '社区自治，持有者共同决策', done: false },
];

const FUND_USAGE = [
  { item: '机房资源 & 技术开发', amount: '0.9亿', ratio: 9 },
  { item: '技术团队建设', amount: '0.1亿', ratio: 2 },
  { item: '香格里拉数字博物馆', amount: '2.1亿', ratio: 21 },
  { item: '灵骨塔 & 元宇宙开发', amount: '2.5亿', ratio: 25 },
  { item: '藏文化典籍数字化', amount: '0.5亿', ratio: 5 },
  { item: '民宿建设', amount: '0.8亿', ratio: 8 },
  { item: '五星级酒店', amount: '3.4亿', ratio: 34 },
];

export default function TokenPageClient() {
  const { isConnected, address } = useAccount();

  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESSES.token as `0x${string}`,
    abi: SHANGRI_TOKEN_ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: { enabled: isConnected && !!address && !!CONTRACT_ADDRESSES.token },
  });

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-gold-500 text-sm tracking-widest uppercase mb-4">Token Economy</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
              <span className="text-gold-500">$SHANGRI</span> 代币
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              香格里拉天堂之城生态代币，总量5亿枚，连接文旅、NFT、DeFi与元宇宙的价值纽带。
            </p>
            <WalletButton />
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-10 border-y border-gold-500/20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: '代币总量', value: '500,000,000' },
              { label: '首发价格', value: '$0.10' },
              { label: '目标市值', value: '$50M' },
              { label: '公链', value: 'Polygon' },
            ].map((m) => (
              <div key={m.label}>
                <p className="text-2xl font-bold text-gold-500">{m.value}</p>
                <p className="text-gray-400 text-sm mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Balance */}
      {isConnected && (
        <section className="py-10 px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-dark-800 rounded-2xl border border-gold-500/20 p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">我的 $SHANGRI 余额</p>
              <p className="text-4xl font-bold text-gold-500">
                {balance ? Number(formatEther(balance as bigint)).toLocaleString() : '0'}
              </p>
              <p className="text-gray-500 text-xs mt-2">{address?.slice(0, 6)}...{address?.slice(-4)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Tokenomics */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-white mb-3">代币经济模型</h2>
            <p className="text-gray-400">透明、公平、可持续的分配机制</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {TOKENOMICS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-white text-sm font-medium">{item.label}</span>
                      <span className="text-gray-400 text-sm">{item.percent}%</span>
                    </div>
                    <div className="w-full bg-dark-700 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                      />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{item.lockup}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-dark-800 rounded-2xl border border-gold-500/10 p-6">
              <h3 className="text-white font-semibold mb-4">募集资金用途（人民币）</h3>
              <div className="space-y-3">
                {FUND_USAGE.map((f) => (
                  <div key={f.item} className="relative">
                    <div className="w-full bg-dark-700 rounded-full h-7 relative overflow-hidden">
                      <motion.div
                        className="absolute left-0 top-0 h-full bg-gold-500/30 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${f.ratio}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                      />
                      <span className="absolute left-3 top-0 h-full flex items-center text-xs text-gray-300">{f.item}</span>
                      <span className="absolute right-3 top-0 h-full flex items-center text-xs text-gold-500 font-medium">{f.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 bg-dark-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-white mb-3">发展路线图</h2>
            <p className="text-gray-400">稳步推进，构建可持续生态</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gold-500/20" />
            <div className="space-y-8">
              {ROADMAP.map((step, i) => (
                <motion.div
                  key={step.quarter}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 pl-16 relative"
                >
                  <div
                    className={`absolute left-4 top-1 w-4 h-4 rounded-full border-2 ${
                      step.done ? 'bg-gold-500 border-gold-500' : 'bg-dark-900 border-gold-500/40'
                    }`}
                    style={{ transform: 'translateX(-50%)' }}
                  />
                  <div>
                    <p className="text-gold-500 text-xs font-medium mb-1">{step.quarter}</p>
                    <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
