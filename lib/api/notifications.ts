import { getStoredAccessToken, handleUnauthorizedResponse } from './session';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');

export type AppNotification = {
  id: string;
  recipientEmail: string;
  emailType: string;
  status: 'sent' | 'failed';
  errorMessage: string;
  sentAt: string | null;
  createdAt: string;
  collectionId: string | null;
  collectionTitle: string;
};

type BackendNotification = {
  id: string;
  recipient_email: string;
  email_type: string;
  status: 'sent' | 'failed';
  error_message?: string;
  sent_at?: string | null;
  created_at: string;
  collection?: string | null;
  collection_title?: string;
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getStoredAccessToken();
  if (!token) throw new Error('You need to sign in before loading notifications.');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (handleUnauthorizedResponse(response)) return new Promise<T>(() => {});
    throw new Error(getErrorMessage(data) || `Request failed with status ${response.status}`);
  }

  return data as T;
}

function getErrorMessage(data: unknown) {
  if (!data || typeof data !== 'object') return '';
  const detail = (data as { detail?: unknown }).detail;
  return typeof detail === 'string' ? detail : '';
}

function toNotification(item: BackendNotification): AppNotification {
  return {
    id: String(item.id),
    recipientEmail: item.recipient_email,
    emailType: item.email_type,
    status: item.status,
    errorMessage: item.error_message ?? '',
    sentAt: item.sent_at ?? null,
    createdAt: item.created_at,
    collectionId: item.collection ? String(item.collection) : null,
    collectionTitle: item.collection_title ?? '',
  };
}

export async function listUnreadNotifications() {
  const data = await request<BackendNotification[]>('/notifications/unread/');
  return data.map(toNotification);
}

export async function markNotificationsRead(ids?: string[]) {
  return request<{ detail: string; updated: number }>('/notifications/mark-read/', {
    method: 'POST',
    body: JSON.stringify({ ids: ids ?? [] }),
  });
}
