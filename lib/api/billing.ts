import { getStoredAccessToken, handleUnauthorizedResponse } from './session';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');

export type BillingPlan = {
  slug: 'free' | 'basic' | 'plus' | 'pro';
  name: string;
  amount_minor: number;
  price: string;
  currency: string;
  interval: string;
  storage_limit_bytes: number;
  storage_gb: number;
  features: string[];
  display_order: number;
};

export type BillingSubscription = {
  id: string;
  plan: BillingPlan;
  status: 'pending' | 'active' | 'past_due' | 'non_renewing' | 'cancelled' | 'expired';
  next_payment_at: string | null;
  grace_period_ends_at: string | null;
  cancel_at_period_end: boolean;
  cancelled_at: string | null;
  created_at: string;
};

export type BillingTransaction = {
  id: string;
  reference: string;
  plan_name: string;
  expected_amount_minor: number;
  currency: string;
  status: 'initialized' | 'success' | 'failed' | 'abandoned';
  paid_at: string | null;
  created_at: string;
};

export type BillingSummary = {
  current_plan: BillingPlan;
  subscription: BillingSubscription | null;
  quota: {
    storage_used_bytes: number;
    storage_limit_bytes: number;
    storage_remaining_bytes: number;
  };
  transactions: BillingTransaction[];
};

export class BillingApiError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'BillingApiError';
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, init?: RequestInit, authenticated = true): Promise<T> {
  const token = authenticated ? getStoredAccessToken() : null;
  if (authenticated && !token) throw new BillingApiError(401, 'Sign in to manage your plan.');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    if (handleUnauthorizedResponse(response)) return new Promise<T>(() => {});
    const detail = body && typeof body.detail === 'string' ? body.detail : `Billing request failed (${response.status}).`;
    const code = body && typeof body.code === 'string' ? body.code : undefined;
    throw new BillingApiError(response.status, detail, code);
  }
  return body as T;
}

export function listBillingPlans() {
  return request<BillingPlan[]>('/billing/plans/', undefined, false);
}

export function getBillingSummary() {
  return request<BillingSummary>('/billing/summary/');
}

export function startCheckout(plan: BillingPlan['slug']) {
  return request<{ authorization_url: string; access_code: string; reference: string }>('/billing/checkout/', {
    method: 'POST',
    body: JSON.stringify({ plan }),
  });
}

export function verifyPayment(reference: string) {
  return request<{ detail: string; transaction: BillingTransaction; subscription: BillingSubscription }>('/billing/verify/', {
    method: 'POST',
    body: JSON.stringify({ reference }),
  });
}

export function cancelSubscription() {
  return request<{ detail: string; subscription: BillingSubscription }>('/billing/subscription/cancel/', { method: 'POST' });
}

export function resumeSubscription() {
  return request<{ detail: string; subscription: BillingSubscription }>('/billing/subscription/resume/', { method: 'POST' });
}

export function getPaymentMethodLink() {
  return request<{ link: string }>('/billing/subscription/payment-method/', { method: 'POST' });
}
