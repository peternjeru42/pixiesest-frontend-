const ACCESS_TOKEN_KEY = 'droptop.accessToken';
const REFRESH_TOKEN_KEY = 'droptop.refreshToken';
const USER_KEY = 'droptop.user';
const AUTH_COOKIE = 'droptop.accessToken';

export function getStoredAccessToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  document.cookie = `${AUTH_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function clearAndRedirectToLogin() {
  if (typeof window === 'undefined') return false;
  clearStoredAuth();
  const next = `${window.location.pathname}${window.location.search}`;
  window.location.assign(`/auth/clear-session?next=${encodeURIComponent(next || '/dashboard')}`);
  return true;
}

export function handleUnauthorizedResponse(response: Response) {
  return response.status === 401 && clearAndRedirectToLogin();
}
