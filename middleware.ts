import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot =
    /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|twitter|facebook|linkedin/i.test(
      userAgent
    );

  // Allow bots to access the share page for metadata
  if (isBot && request.nextUrl.pathname.startsWith('/share')) {
    return NextResponse.next();
  }

  // For regular users, redirect to predictions page
  if (request.nextUrl.pathname.startsWith('/share')) {
    const url = request.nextUrl.clone();
    url.pathname = '/predictions';
    // Copy all search params from the share URL to the predictions URL
    const searchParams = new URLSearchParams(url.search);
    url.search = searchParams.toString();
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
