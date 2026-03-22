'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function WalletButtonInner() {
  const { isConnected } = useAccount();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: { opacity: 0, pointerEvents: 'none', userSelect: 'none' },
            })}
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                className="px-4 py-2 bg-gold-500 text-dark-900 rounded-lg text-sm font-semibold hover:bg-gold-400 transition-all flex items-center gap-2"
              >
                <span>🔗</span>
                <span>连接钱包</span>
              </button>
            ) : chain?.unsupported ? (
              <button
                onClick={openChainModal}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-400 transition-all"
              >
                切换网络
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={openChainModal}
                  className="px-3 py-2 bg-dark-700 text-gray-300 rounded-lg text-xs hover:bg-dark-600 transition-all flex items-center gap-1"
                >
                  {chain?.hasIcon && chain.iconUrl && (
                    <img src={chain.iconUrl} alt={chain.name ?? ''} className="w-4 h-4 rounded-full" />
                  )}
                  <span>{chain?.name}</span>
                </button>
                <button
                  onClick={openAccountModal}
                  className="px-3 py-2 bg-gold-500/20 text-gold-400 border border-gold-500/30 rounded-lg text-sm font-medium hover:bg-gold-500/30 transition-all"
                >
                  {account.displayName}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
