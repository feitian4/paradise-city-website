import dynamic from 'next/dynamic';

const TokenPageClient = dynamic(() => import('@/app/[locale]/token/TokenPageClient'), { ssr: false });

export default function TokenPage() {
  return <TokenPageClient />;
}
