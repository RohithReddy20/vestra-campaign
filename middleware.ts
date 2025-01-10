import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  
  // More specific Twitter bot detection
  // Twitter's official bot uses 'Twitterbot' in its user agent
  const isTwitterBot = userAgent.includes('twitterbot');
  console.log('isTwitterBot', isTwitterBot);
  // More comprehensive bot detection
//   const isBot = /bot|googlebot|baiduspider|bingbot|msnbot|duckduckbot|teoma|slurp|yandexbot/i.test(
//     userAgent
//   );

  const pathname = request.nextUrl.pathname;
  const isImageRequest = /\.(jpe?g|png|gif|webp)$/i.test(pathname);

  // Allow Twitter bot and image requests to access the share page
  if (pathname.startsWith('/share')) {
    if (isTwitterBot || isImageRequest) {
      return NextResponse.next();
    }

    // Redirect all other requests to predictions page
    const url = request.nextUrl.clone();
    url.pathname = '/predictions';
    url.search = new URLSearchParams(url.search).toString();
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Specify which paths this middleware will run on
  matcher: '/share/:path*'
}