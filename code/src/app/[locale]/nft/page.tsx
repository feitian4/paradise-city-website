import dynamic from 'next/dynamic';

const NFTPageClient = dynamic(() => import('@/app/[locale]/nft/NFTPageClient'), { ssr: false });

export default function NFTPage() {
  return <NFTPageClient />;
}
