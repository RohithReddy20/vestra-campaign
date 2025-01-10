
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(userAgent);
  
  if (!isBot && request.nextUrl.pathname.startsWith('/share')) {
    const url = request.nextUrl.clone();
    url.pathname = '/predictions';
    url.searchParams.set('batchId', url.searchParams.get('batchId') || '');
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}