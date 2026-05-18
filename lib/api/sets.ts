import type { Media, Set, SetVisibility } from '../types';
import { getStoredAccessToken, handleUnauthorizedResponse } from './session';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');

type BackendSet = {
  id: string;
  collection?: string;
  title: string;
  description?: string;
  cover_url?: string;
  visibility?: string;
  photo_count?: number;
  video_count?: number;
  video_duration_sec?: number;
  sort_order?: number;
};

type BackendMedia = {
  id: string;
  display_filename?: string;
  original_filename?: string;
  preview_url?: string;
  thumbnail_url?: string;
  original_width?: number | null;
  original_height?: number | null;
  file_size_bytes?: number;
  media_type?: string;
  status?: string;
  duration_seconds?: number | null;
  is_private?: boolean;
  is_downloadable?: boolean;
  set?: string;
  collection?: string;
  uploaded_at?: string | null;
  created_at?: string;
};

type Paginated<T> = {
  results: T[];
};

function unpackList<T>(data: T[] | Paginated<T>) {
  return Array.isArray(data) ? data : data.results;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getStoredAccessToken();
  if (!token) throw new Error('You need to sign in before loading sets.');

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
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data as T;
}

function mapVisibility(visibility?: string): SetVisibility {
  if (visibility === 'client_only' || visibility === 'client') return 'client';
  if (visibility === 'hidden') return 'hidden';
  return 'public';
}

function toBackendVisibility(visibility?: SetVisibility) {
  if (visibility === 'client') return 'client_only';
  if (visibility === 'hidden') return 'hidden';
  return 'visible_to_all';
}

function toSet(set: BackendSet): Set {
  return {
    id: String(set.id),
    collectionId: set.collection ? String(set.collection) : undefined,
    title: set.title,
    description: set.description,
    cover: set.cover_url ?? '',
    visibility: mapVisibility(set.visibility),
    photoCount: set.photo_count ?? 0,
    videoCount: set.video_count ?? 0,
    videoDurationSec: set.video_duration_sec ?? 0,
    order: set.sort_order ?? 0,
  };
}

function mapStatus(status?: string): Media['status'] {
  if (status === 'ready' || status === 'processing' || status === 'failed' || status === 'uploading') return status;
  return 'processing';
}

function toMedia(media: BackendMedia): Media {
  const src = media.preview_url || media.thumbnail_url || '';
  return {
    id: String(media.id),
    filename: media.display_filename || media.original_filename || '',
    src,
    thumb: media.thumbnail_url || src,
    width: media.original_width || 0,
    height: media.original_height || 0,
    sizeMB: Number(((media.file_size_bytes ?? 0) / (1024 * 1024)).toFixed(1)),
    type: media.media_type === 'video' ? 'video' : 'photo',
    status: mapStatus(media.status),
    durationSec: media.duration_seconds ?? undefined,
    faved: false,
    private: Boolean(media.is_private),
    downloadable: media.is_downloadable ?? true,
    setId: media.set ? String(media.set) : '',
    collectionId: media.collection ? String(media.collection) : '',
    uploadedAt: media.uploaded_at || media.created_at || '',
  };
}

export async function listSets(collectionId: string) {
  return unpackList(await request<BackendSet[] | Paginated<BackendSet>>(`/collections/${collectionId}/sets/`)).map(toSet);
}

export async function getSet(id: string): Promise<Set | null> {
  try {
    return toSet(await request<BackendSet>(`/sets/${id}/`));
  } catch (error) {
    if (error instanceof Error && /404/.test(error.message)) return null;
    throw error;
  }
}

export async function createSet(_collectionId: string, input: Partial<Set>) {
  return toSet(await request<BackendSet>(`/collections/${_collectionId}/sets/`, {
    method: 'POST',
    body: JSON.stringify({
      title: input.title?.trim() || 'Untitled set',
      description: input.description ?? '',
      visibility: toBackendVisibility(input.visibility),
      sort_order: input.order ?? 0,
    }),
  }));
}

export async function updateSet(id: string, patch: Partial<Set>) {
  return toSet(await request<BackendSet>(`/sets/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: patch.title,
      description: patch.description,
      visibility: patch.visibility ? toBackendVisibility(patch.visibility) : undefined,
      sort_order: patch.order,
    }),
  }));
}

export async function deleteSet(id: string) {
  await request(`/sets/${id}/`, { method: 'DELETE' });
  return { ok: true };
}

export async function getSetMedia(id: string) {
  return unpackList(await request<BackendMedia[] | Paginated<BackendMedia>>(`/sets/${id}/media/`)).map(toMedia);
}
