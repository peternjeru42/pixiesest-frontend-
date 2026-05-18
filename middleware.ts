import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'droptop.accessToken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/ops'))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/ops/:path*'],
};
