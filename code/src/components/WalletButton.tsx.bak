'use client';

import dynamic from 'next/dynamic';

const WalletButtonInner = dynamic(
  () => import('./WalletButtonInner'),
  { 
    ssr: false,
    loading: () => (
      <button className="px-4 py-2 bg-dark-700 text-gray-500 rounded-lg text-sm font-semibold cursor-not-allowed">
        连接钱包
      </button>
    )
  }
);

export default function WalletButton() {
  return <WalletButtonInner />;
}
