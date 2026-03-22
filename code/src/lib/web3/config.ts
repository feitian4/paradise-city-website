import { http, createConfig } from 'wagmi';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'paradise-city-dev';

export const wagmiConfig = getDefaultConfig({
  appName: '香格里拉天堂之城 Paradise City',
  projectId,
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
  ssr: true,
});

// 合约地址（部署后填入）
export const CONTRACT_ADDRESSES = {
  nft: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '',
  token: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS || '',
} as const;

// NFT 系列配置
export const NFT_COLLECTIONS = {
  sevenBuddhas: {
    name: '药师七佛圣像',
    nameEn: 'Seven Medicine Buddhas',
    total: 7000,
    price: '0.1',
    description: '七尊药师如来圣像，每尊限量1000枚，守护持有者身心康泰。',
  },
  twelveYakshas: {
    name: '十二药叉护法',
    nameEn: 'Twelve Yaksha Guardians',
    total: 84000,
    price: '0.05',
    description: '十二药叉大将各率七千药叉眷属，共84,000尊数字护法。',
  },
} as const;
