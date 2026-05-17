import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'droptop.accessToken';

function getSafeNextPath(request: NextRequest) {
  const next = request.nextUrl.searchParams.get('next');

  if (!next || !next.startsWith('/') || next.startsWith('//')) {
    return '/dashboard';
  }

  return next;
}

export function GET(request: NextRequest) {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', getSafeNextPath(request));

  const response = NextResponse.redirect(loginUrl);
  response.cookies.set(AUTH_COOKIE, '', {
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
  });

  return response;
}
