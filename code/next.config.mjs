import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // 忽略仅浏览器环境的模块
      config.resolve.fallback = {
        ...config.resolve.fallback,
        encoding: false,
        'pino-pretty': false,
      };
    }
    // 忽略 @base-org/account 缺失问题
    config.plugins.push(
      new (class IgnorePlugin {
        apply(compiler) {
          compiler.hooks.normalModuleFactory.tap('IgnorePlugin', (nmf) => {
            nmf.hooks.beforeResolve.tap('IgnorePlugin', (resolveData) => {
              if (
                resolveData.request === '@base-org/account' ||
                resolveData.request === 'pino-pretty' ||
                resolveData.request === 'encoding'
              ) {
                return false;
              }
            });
          });
        }
      })()
    );
    return config;
  },
};
 
export default withNextIntl(nextConfig);
