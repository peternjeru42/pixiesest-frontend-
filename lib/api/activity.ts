import type { ActivityEvent } from '../types';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');

type BackendActivity = {
  id: string;
  event_type: string;
  actor_type?: string;
  actor_email?: string;
  collection?: string | null;
  set?: string | null;
  media_asset?: string | null;
  metadata?: Record<string, unknown>;
  created_at?: string;
};

function getStoredAccessToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('droptop.accessToken');
}

async function request<T>(path: string): Promise<T> {
  const token = getStoredAccessToken();
  if (!token) throw new Error('You need to sign in before loading activity.');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return data as T;
}

function mapType(type: string): ActivityEvent['type'] {
  if (type.includes('favorite')) return 'favorite';
  if (type.includes('download')) return 'download';
  if (type.includes('comment')) return 'comment';
  if (type.includes('publish')) return 'publish';
  if (type.includes('upload')) return 'upload';
  if (type.includes('invite')) return 'invite';
  return 'view';
}

function formatTime(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function toActivity(event: BackendActivity): ActivityEvent {
  const metadata = event.metadata ?? {};
  return {
    id: String(event.id),
    type: mapType(event.event_type),
    actor: event.actor_email || event.actor_type || 'system',
    target: String(metadata.target ?? metadata.filename ?? event.media_asset ?? event.set ?? event.collection ?? ''),
    note: String(metadata.note ?? event.event_type.replace(/_/g, ' ')),
    collectionId: event.collection ? String(event.collection) : undefined,
    time: formatTime(event.created_at),
  };
}

export async function listActivity(filter?: { collectionId?: string; type?: string }) {
  const path = filter?.collectionId ? `/collections/${filter.collectionId}/activity/` : '/activity/';
  let activity = (await request<BackendActivity[]>(path)).map(toActivity);
  if (filter?.type) activity = activity.filter(event => event.type === filter.type);
  return activity;
}
