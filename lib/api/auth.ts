const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');

export type AuthUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  business_name?: string;
  phone_number?: string;
  profile_photo_url?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
};

type AuthResponse = {
  access: string;
  refresh: string;
  user: AuthUser;
};

type GoogleAuthIntent = 'login' | 'signup';

export type RegisterInput = {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

const PENDING_REGISTRATION_KEY = 'droptop.pendingRegistration';

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(data) || `Request failed with status ${response.status}`, response.status, getErrorCode(data));
  }

  return data as T;
}

function getErrorCode(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const code = (data as { code?: unknown }).code;
  return typeof code === 'string' ? code : undefined;
}

function getErrorMessage(data: unknown): string {
  if (!data || typeof data !== 'object') return '';

  const detail = (data as { detail?: unknown }).detail;
  if (typeof detail === 'string') return detail;

  const nonField = (data as { non_field_errors?: unknown }).non_field_errors;
  if (Array.isArray(nonField) && typeof nonField[0] === 'string') return nonField[0];

  const firstEntry = Object.entries(data as Record<string, unknown>)[0];
  if (!firstEntry) return '';

  const [field, value] = firstEntry;
  if (Array.isArray(value) && typeof value[0] === 'string') return `${field}: ${value[0]}`;
  if (typeof value === 'string') return `${field}: ${value}`;

  return '';
}

function persistAuthTokens(auth: AuthResponse) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('droptop.accessToken', auth.access);
  window.localStorage.setItem('droptop.refreshToken', auth.refresh);
  window.localStorage.setItem('droptop.user', JSON.stringify(auth.user));
  setAuthCookie(auth.access);
}

function persistAuthUser(user: AuthUser) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('droptop.user', JSON.stringify(user));
}

export function getStoredAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem('droptop.user');
  if (!stored) return null;
  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    window.localStorage.removeItem('droptop.user');
    return null;
  }
}

function cachePendingRegistration(input: RegisterInput) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(PENDING_REGISTRATION_KEY, JSON.stringify(input));
}

export function getPendingRegistration(): RegisterInput | null {
  if (typeof window === 'undefined') return null;
  const stored = window.sessionStorage.getItem(PENDING_REGISTRATION_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as RegisterInput;
  } catch {
    window.sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
    return null;
  }
}

export function clearPendingRegistration() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
}

function getStoredAccessToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('droptop.accessToken');
}

function setAuthCookie(accessToken: string) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `droptop.accessToken=${encodeURIComponent(accessToken)}; Path=/; Max-Age=604800; SameSite=Lax${secure}`;
}

function clearAuthCookie() {
  document.cookie = 'droptop.accessToken=; Path=/; Max-Age=0; SameSite=Lax';
}

export async function login(email: string, password: string) {
  if (!email || !password) throw new Error('Email and password are required');

  const auth = await request<AuthResponse>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  persistAuthTokens(auth);
  return auth;
}

export async function register(input: RegisterInput) {
  const response = await request<{ detail: string; expires_in: number }>('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      first_name: input.firstName,
      last_name: input.lastName,
      business_name: input.businessName,
      phone_number: input.phoneNumber ?? '',
    }),
  });

  cachePendingRegistration(input);
  return response;
}

export async function verifySignupCode(code: string, input = getPendingRegistration()) {
  if (!input) throw new Error('Signup details are missing. Start signup again.');

  const auth = await request<AuthResponse>('/auth/register/verify/', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      code,
      password: input.password,
      first_name: input.firstName,
      last_name: input.lastName,
      business_name: input.businessName,
      phone_number: input.phoneNumber ?? '',
    }),
  });

  clearPendingRegistration();
  persistAuthTokens(auth);
  return auth;
}

export async function googleAuth(credential: string, intent: GoogleAuthIntent = 'login') {
  if (!credential) throw new Error('Google credential is required');

  const auth = await request<AuthResponse>('/auth/google/', {
    method: 'POST',
    body: JSON.stringify({ credential, intent }),
  });

  persistAuthTokens(auth);
  return auth;
}

export async function getCurrentUser(accessToken: string) {
  const user = await request<AuthUser>('/auth/me/', {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  persistAuthUser(user);
  return user;
}

export async function requestPasswordReset(email: string) {
  return request<{ detail: string }>('/auth/password-reset/request/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, password: string) {
  return request<{ detail: string }>('/auth/password-reset/confirm/', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });
}

export async function verifyEmail(token: string) {
  return request<{ detail: string }>('/auth/email/verify/', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

export async function resendVerification(email?: string) {
  return request<{ detail: string }>('/auth/email/resend-verification/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function logout() {
  if (typeof window === 'undefined') return { ok: true };

  const access = getStoredAccessToken();
  const refresh = window.localStorage.getItem('droptop.refreshToken');

  try {
    if (refresh) {
      await request<void>('/auth/logout/', {
        method: 'POST',
        headers: access ? { Authorization: `Bearer ${access}` } : undefined,
        body: JSON.stringify({ refresh }),
      });
    }
  } finally {
    window.localStorage.removeItem('droptop.accessToken');
    window.localStorage.removeItem('droptop.refreshToken');
    window.localStorage.removeItem('droptop.user');
    clearAuthCookie();
  }

  return { ok: true };
}
