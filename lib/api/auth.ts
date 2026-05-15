const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');

type AuthUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  business_name?: string;
  phone_number?: string;
  profile_photo_url?: string;
};

type AuthResponse = {
  access: string;
  refresh: string;
  user: AuthUser;
};

type RegisterInput = {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  password: string;
};

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
    throw new Error(getErrorMessage(data) || `Request failed with status ${response.status}`);
  }

  return data as T;
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
  window.localStorage.setItem('lumen.accessToken', auth.access);
  window.localStorage.setItem('lumen.refreshToken', auth.refresh);
  window.localStorage.setItem('lumen.user', JSON.stringify(auth.user));
  setAuthCookie(auth.access);
}

function getStoredAccessToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('lumen.accessToken');
}

function setAuthCookie(accessToken: string) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `lumen.accessToken=${encodeURIComponent(accessToken)}; Path=/; Max-Age=604800; SameSite=Lax${secure}`;
}

function clearAuthCookie() {
  document.cookie = 'lumen.accessToken=; Path=/; Max-Age=0; SameSite=Lax';
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
  const auth = await request<AuthResponse>('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      first_name: input.firstName,
      last_name: input.lastName,
      business_name: input.businessName,
    }),
  });

  persistAuthTokens(auth);
  return auth;
}

export async function googleAuth(credential: string) {
  if (!credential) throw new Error('Google credential is required');

  const auth = await request<AuthResponse>('/auth/google/', {
    method: 'POST',
    body: JSON.stringify({ credential }),
  });

  persistAuthTokens(auth);
  return auth;
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
  const refresh = window.localStorage.getItem('lumen.refreshToken');

  try {
    if (refresh) {
      await request<void>('/auth/logout/', {
        method: 'POST',
        headers: access ? { Authorization: `Bearer ${access}` } : undefined,
        body: JSON.stringify({ refresh }),
      });
    }
  } finally {
    window.localStorage.removeItem('lumen.accessToken');
    window.localStorage.removeItem('lumen.refreshToken');
    window.localStorage.removeItem('lumen.user');
    clearAuthCookie();
  }

  return { ok: true };
}
