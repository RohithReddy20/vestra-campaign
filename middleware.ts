import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const isTwitterBot = userAgent.includes('twitterbot');

  // More comprehensive bot detection
  const isBot = /bot|googlebot|baiduspider|bingbot|msnbot|duckduckbot|teoma|slurp|yandexbot/i.test(
    userAgent
  );

  const pathname = request.nextUrl.pathname;
  const isImageRequest = /\.(jpe?g|png|gif|webp)$/i.test(pathname);

  // Allow bots and image requests to access the share page
  if (pathname.startsWith('/share')) {
    if (isBot || isTwitterBot || isImageRequest) {
      return NextResponse.next();
    }

    // Extract batchId from the current URL
    const batchId = request.nextUrl.searchParams.get('batchId');

    // Create redirect URL with batchId
    const url = new URL('/prediction', request.url);
    if (batchId) {
      url.searchParams.set('batchId', batchId);
    }

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/share', '/share/:path*'],
};
