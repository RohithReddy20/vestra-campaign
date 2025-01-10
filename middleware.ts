import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
//   const isBot =
//     /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|twitter|facebook|linkedin/i.test(
//       userAgent
//     );

  // Get the pathname and check if it's an image request
  const pathname = request.nextUrl.pathname;
  const isImageRequest = pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i);

  // Check if it's a request from Twitter's link preview service
  const isTwitterPreview = userAgent.toLowerCase().includes('twitterbot');

  // Allow only Twitter preview bot and image requests to access the share page
  if ((isTwitterPreview || isImageRequest) && pathname.startsWith('/share')) {
    return NextResponse.next();
  }

  // For all other requests to share page (including regular users and other bots)
  if (pathname.startsWith('/share')) {
    const url = request.nextUrl.clone();
    url.pathname = '/predictions';
    // Copy all search params from the share URL to the predictions URL
    const searchParams = new URLSearchParams(url.search);
    url.search = searchParams.toString();
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
