import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://paradise-city.shangri-la';
  const locales = ['zh', 'en'];
  const routes = ['', '/nft', '/token', '/metaverse', '/booking', '/healing', '/temples', '/about', '/accommodation'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/nft' || route === '/booking' ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
