import dynamic from 'next/dynamic';

const MetaversePageClient = dynamic(() => import('./MetaversePageClient'), { ssr: false });

export default function MetaversePage() {
  return <MetaversePageClient />;
}
