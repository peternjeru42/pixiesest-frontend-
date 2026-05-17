import type { Collection, CollectionStatus, Set, SetVisibility } from '../types';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');
const COLLECTIONS_CHANGED_EVENT = 'droptop.collections.changed';

type BackendCounts = Partial<{
  photos: number;
  videos: number;
  videoDurationSec: number;
  video_duration_sec: number;
  favorites: number;
  downloads: number;
  views: number;
  sets: number;
}>;

type BackendSet = {
  id: string;
  title: string;
  description?: string;
  cover_url?: string;
  visibility?: string;
  photo_count?: number;
  video_count?: number;
  video_duration_sec?: number;
  sort_order?: number;
  order?: number;
};

type BackendCollection = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  event_date?: string | null;
  created_at?: string;
  cover_url?: string;
  folder?: string | null;
  folder_name?: string | null;
  status: CollectionStatus;
  download_pin?: string;
  counts?: BackendCounts;
  sets?: BackendSet[];
};

function getStoredAccessToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('droptop.accessToken');
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getStoredAccessToken();
  if (!token) throw new Error('You need to sign in before loading collections.');

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
    throw new Error(getErrorMessage(data) || `Request failed with status ${response.status}`);
  }

  return data as T;
}

function getErrorMessage(data: unknown) {
  if (!data || typeof data !== 'object') return '';
  const detail = (data as { detail?: unknown }).detail;
  if (typeof detail === 'string') return detail;
  const firstEntry = Object.entries(data as Record<string, unknown>)[0];
  if (!firstEntry) return '';
  const [field, value] = firstEntry;
  if (Array.isArray(value) && typeof value[0] === 'string') return `${field}: ${value[0]}`;
  if (typeof value === 'string') return `${field}: ${value}`;
  return '';
}

function notifyCollectionChanges() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(COLLECTIONS_CHANGED_EVENT));
}

function formatDisplayDate(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function emptyCounts(counts?: BackendCounts) {
  return {
    photos: counts?.photos ?? 0,
    videos: counts?.videos ?? 0,
    videoDurationSec: counts?.videoDurationSec ?? counts?.video_duration_sec ?? 0,
    favorites: counts?.favorites ?? 0,
    downloads: counts?.downloads ?? 0,
    views: counts?.views ?? 0,
    sets: counts?.sets ?? 0,
  };
}

function mapSetVisibility(visibility?: string): SetVisibility {
  if (visibility === 'client_only' || visibility === 'client') return 'client';
  if (visibility === 'hidden') return 'hidden';
  return 'public';
}

function toSet(set: BackendSet): Set {
  return {
    id: String(set.id),
    title: set.title,
    description: set.description,
    cover: set.cover_url ?? '',
    visibility: mapSetVisibility(set.visibility),
    photoCount: set.photo_count ?? 0,
    videoCount: set.video_count ?? 0,
    videoDurationSec: set.video_duration_sec ?? 0,
    order: set.sort_order ?? set.order ?? 0,
  };
}

function toCollection(collection: BackendCollection): Collection {
  return {
    id: String(collection.id),
    slug: collection.slug,
    title: collection.title,
    description: collection.description,
    date: formatDisplayDate(collection.event_date ?? collection.created_at),
    cover: collection.cover_url ?? '',
    folderId: collection.folder ? String(collection.folder) : null,
    folderName: collection.folder_name ?? null,
    status: collection.status,
    downloadPin: collection.download_pin ?? '',
    counts: emptyCounts(collection.counts),
    sets: (collection.sets ?? []).map(toSet),
    createdAt: collection.created_at ?? '',
  };
}

function collectionBody(input: Partial<Collection>, mode: 'create' | 'patch' = 'patch') {
  const body: Record<string, string | null> = {};

  if (mode === 'create' || input.title !== undefined) body.title = input.title ?? 'Untitled collection';
  if (mode === 'create' || input.description !== undefined) body.description = input.description ?? '';
  if (mode === 'create' || input.date !== undefined) body.event_date = input.date || null;
  if (mode === 'create' || input.folderId !== undefined) body.folder_id = input.folderId ?? null;

  return body;
}

export function subscribeToCollectionChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(COLLECTIONS_CHANGED_EVENT, callback);
  return () => window.removeEventListener(COLLECTIONS_CHANGED_EVENT, callback);
}

export async function listCollections(filter?: { status?: CollectionStatus; folderId?: string }) {
  let collections = (await request<BackendCollection[]>('/collections/')).map(toCollection);
  if (filter?.status) collections = collections.filter(collection => collection.status === filter.status);
  if (filter?.folderId) collections = collections.filter(collection => collection.folderId === filter.folderId);
  return collections;
}

export async function getCollection(id: string): Promise<Collection | null> {
  try {
    return toCollection(await request<BackendCollection>(`/collections/${id}/`));
  } catch (error) {
    if (error instanceof Error && /404|not found/i.test(error.message)) return null;
    throw error;
  }
}

export async function createCollection(input: Partial<Collection>) {
  const collection = toCollection(await request<BackendCollection>('/collections/', {
    method: 'POST',
    body: JSON.stringify(collectionBody(input, 'create')),
  }));
  notifyCollectionChanges();
  return collection;
}

export async function updateCollection(id: string, patch: Partial<Collection>) {
  const collection = toCollection(await request<BackendCollection>(`/collections/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(collectionBody(patch)),
  }));
  notifyCollectionChanges();
  return collection;
}

export async function deleteCollection(id: string) {
  await request(`/collections/${id}/`, { method: 'DELETE' });
  notifyCollectionChanges();
  return { ok: true };
}

async function collectionAction(id: string, action: string) {
  const collection = toCollection(await request<BackendCollection>(`/collections/${id}/${action}/`, { method: 'POST' }));
  notifyCollectionChanges();
  return collection;
}

export async function publishCollection(id: string) { return collectionAction(id, 'publish'); }
export async function unpublishCollection(id: string) { return collectionAction(id, 'unpublish'); }
export async function archiveCollection(id: string) { return collectionAction(id, 'archive'); }

export async function moveCollectionToFolder(id: string, folderId: string | null) {
  const collection = toCollection(await request<BackendCollection>(`/collections/${id}/move/`, {
    method: 'PATCH',
    body: JSON.stringify({ folder_id: folderId }),
  }));
  notifyCollectionChanges();
  return collection;
}
