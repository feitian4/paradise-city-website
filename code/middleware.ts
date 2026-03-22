import createMiddleware from 'next-intl/middleware';
import {routing} from './src/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(zh|en|bo)/:path*']
};
