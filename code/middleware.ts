import createMiddleware from 'next-intl/middleware';
import {routing} from './src/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'] 
};
