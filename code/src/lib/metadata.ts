import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://paradise-city.shangri-la';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '香格里拉天堂之城 | Paradise City',
    template: '%s | 香格里拉天堂之城',
  },
  description: '以药师愿力，转娑婆为净土。融合藏医药智慧、NFT数字护法与元宇宙修行的文旅生态平台。',
  keywords: ['香格里拉', 'Shangri-La', '天堂之城', 'Paradise City', '药师佛', 'Medicine Buddha',
    '藏医药', 'Tibetan Medicine', 'NFT', '元宇宙', 'Metaverse', '$SHANGRI', 'Web3', 'Polygon'],
  authors: [{ name: 'Paradise City Team' }],
  creator: 'Paradise City',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: BASE_URL,
    siteName: '香格里拉天堂之城',
    title: '香格里拉天堂之城 | Paradise City',
    description: '以药师愿力，转娑婆为净土。NFT数字护法 · $SHANGRI代币 · 元宇宙修行',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: '香格里拉天堂之城' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '香格里拉天堂之城 | Paradise City',
    description: '以药师愿力，转娑婆为净土',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export function generatePageMetadata(page: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: `${page.title} | 香格里拉天堂之城`,
      description: page.description,
      url: page.path ? `${BASE_URL}${page.path}` : BASE_URL,
    },
  };
}
