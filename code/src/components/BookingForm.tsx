'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';

const SERVICES = [
  { value: 'healing', label: '藏医药疗愈体验', icon: '🌿' },
  { value: 'temple', label: '寺庙朝圣之旅', icon: '☸️' },
  { value: 'accommodation', label: '禅修住宿套餐', icon: '🏔️' },
  { value: 'astronomy', label: '天文元宇宙体验', icon: '🌌' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  people: number;
  message: string;
}

const initial: FormData = {
  name: '', email: '', phone: '', service: '', date: '', people: 1, message: ''
};

export default function BookingForm() {
  const { address } = useAccount();
  const [form, setForm] = useState<FormData>(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; bookingId?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'people' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, walletAddress: address }),
      });
      const data = await res.json();
      setResult(data);
      if (data.success) setForm(initial);
    } catch {
      setResult({ success: false, message: '网络错误，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-dark-700 border border-dark-600 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors placeholder-gray-600";
  const labelClass = "block text-gray-400 text-xs font-medium mb-2 uppercase tracking-wider";

  return (
    <div className="bg-dark-800 rounded-2xl border border-gold-500/20 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-serif text-white mb-2">预约体验</h3>
        <p className="text-gray-400 text-sm">填写以下信息，我们将在24小时内联系您确认。</p>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl border ${
            result.success
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <p className="text-sm font-medium">{result.message}</p>
          {result.bookingId && (
            <p className="text-xs mt-1 opacity-70">预约编号：{result.bookingId}</p>
          )}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 服务选择 */}
        <div>
          <label className={labelClass}>选择体验项目 *</label>
          <div className="grid grid-cols-2 gap-3">
            {SERVICES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, service: s.value }))}
                className={`p-3 rounded-xl border text-left transition-all ${
                  form.service === s.value
                    ? 'border-gold-500 bg-gold-500/10'
                    : 'border-dark-600 hover:border-gold-500/50'
                }`}
              >
                <div className="text-lg mb-1">{s.icon}</div>
                <div className="text-white text-xs font-medium">{s.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 姓名 + 电话 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>姓名 *</label>
            <input name="name" value={form.name} onChange={handleChange}
              placeholder="您的姓名" required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>电话 *</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              placeholder="手机号码" required className={inputClass} />
          </div>
        </div>

        {/* 邮箱 */}
        <div>
          <label className={labelClass}>邮箱 *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="your@email.com" required className={inputClass} />
        </div>

        {/* 日期 + 人数 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>预约日期 *</label>
            <input name="date" type="date" value={form.date} onChange={handleChange}
              required className={inputClass}
              min={new Date().toISOString().split('T')[0]} />
          </div>
          <div>
            <label className={labelClass}>人数 *</label>
            <select name="people" value={form.people} onChange={handleChange} className={inputClass}>
              {[1,2,3,4,5,6,7,8,9,10].map(n => (
                <option key={n} value={n}>{n} 人</option>
              ))}
            </select>
          </div>
        </div>

        {/* 留言 */}
        <div>
          <label className={labelClass}>备注留言</label>
          <textarea name="message" value={form.message} onChange={handleChange}
            rows={3} placeholder="特殊需求或问题（可选）"
            className={inputClass + ' resize-none'} />
        </div>

        {/* 钱包地址（如已连接） */}
        {address && (
          <div className="bg-gold-500/5 border border-gold-500/20 rounded-lg px-4 py-3 flex items-center gap-3">
            <span className="text-gold-500 text-lg">🔗</span>
            <div>
              <p className="text-xs text-gray-400">已连接钱包（NFT持有者享8折优惠）</p>
              <p className="text-gold-500 text-xs font-mono">{address.slice(0,6)}...{address.slice(-4)}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !form.service}
          className="w-full bg-gold-500 text-dark-900 py-4 rounded-xl font-bold text-sm hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '提交中...' : '立即预约'}
        </button>
      </form>
    </div>
  );
}
