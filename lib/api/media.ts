import type { Media } from '../types';
import { getStoredAccessToken, handleUnauthorizedResponse } from './session';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');
const MEDIA_CHANGED_EVENT = 'droptop.media.changed';

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

type UploadResponse = {
  upload: {
    upload_id: string;
    media_asset?: string | null;
  };
  upload_url: string;
};

type CompleteUploadResponse = {
  media_asset?: string | BackendMedia | null;
};

type BulkPresignUploadResponse = {
  uploads: UploadResponse[];
};

type BulkCompleteUploadResponse = {
  uploads: CompleteUploadResponse[];
};

type Paginated<T> = {
  results: T[];
};

function unpackList<T>(data: T[] | Paginated<T>) {
  return Array.isArray(data) ? data : data.results;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getStoredAccessToken();
  if (!token) throw new Error('You need to sign in before loading media.');

  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
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
  if (typeof detail === 'string') return detail;
  const firstEntry = Object.entries(data as Record<string, unknown>)[0];
  if (!firstEntry) return '';
  const [field, value] = firstEntry;
  if (Array.isArray(value) && typeof value[0] === 'string') return `${field}: ${value[0]}`;
  if (typeof value === 'string') return `${field}: ${value}`;
  return '';
}

function notifyMediaChanges() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(MEDIA_CHANGED_EVENT));
}

function mapStatus(status?: string): Media['status'] {
  if (status === 'ready' || status === 'processing' || status === 'failed' || status === 'uploading') return status;
  return status === 'uploaded' ? 'processing' : 'processing';
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

function isVideo(file: File) {
  return file.type.startsWith('video/') || /\.(mp4|mov|m4v|webm)$/i.test(file.name);
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T, index: number) => Promise<R>,
) {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  const workerCount = Math.min(limit, items.length);

  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
    }
  }));

  return results;
}

export function subscribeToMediaChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(MEDIA_CHANGED_EVENT, callback);
  return () => window.removeEventListener(MEDIA_CHANGED_EVENT, callback);
}

export async function listMedia(filter?: { collectionId?: string; setId?: string }) {
  if (filter?.setId) return unpackList(await request<BackendMedia[] | Paginated<BackendMedia>>(`/sets/${filter.setId}/media/`)).map(toMedia);
  if (filter?.collectionId) return unpackList(await request<BackendMedia[] | Paginated<BackendMedia>>(`/collections/${filter.collectionId}/media/`)).map(toMedia);
  return unpackList(await request<BackendMedia[] | Paginated<BackendMedia>>('/media/')).map(toMedia);
}

export async function getMedia(id: string): Promise<Media | null> {
  try {
    return toMedia(await request<BackendMedia>(`/media/${id}/`));
  } catch (error) {
    if (error instanceof Error && /404/.test(error.message)) return null;
    throw error;
  }
}

export async function setMediaPrivacy(id: string, isPrivate: boolean) {
  await request(`/media/${id}/privacy/`, {
    method: 'PATCH',
    body: JSON.stringify({ is_private: isPrivate }),
  });
  notifyMediaChanges();
  return { ok: true };
}

export async function setMediaDownloadable(id: string, isDownloadable: boolean) {
  await request(`/media/${id}/downloadable/`, {
    method: 'PATCH',
    body: JSON.stringify({ is_downloadable: isDownloadable }),
  });
  notifyMediaChanges();
  return { ok: true };
}

export async function deleteMedia(id: string) {
  await request(`/media/${id}/`, { method: 'DELETE' });
  notifyMediaChanges();
  return { ok: true };
}

export async function bulkDelete(mediaIds: string[]) {
  await Promise.all(mediaIds.map(id => request(`/media/${id}/`, { method: 'DELETE' })));
  notifyMediaChanges();
  return { ok: true };
}

export async function bulkMove(mediaIds: string[], targetSetId: string) {
  await request('/media/move/', {
    method: 'POST',
    body: JSON.stringify({ media_ids: mediaIds, target_set_id: targetSetId }),
  });
  notifyMediaChanges();
  return { ok: true };
}

export async function getMediaDownloadUrl(id: string) {
  return request<{ url: string; filename?: string }>(`/media/${id}/download-url/`);
}

export async function setCover(collectionOrSetId: string, mediaId: string) {
  await request(`/collections/${collectionOrSetId}/set-cover/`, {
    method: 'POST',
    body: JSON.stringify({ media_asset_id: mediaId }),
  });
  notifyMediaChanges();
  return { ok: true };
}

export async function addUploadedMedia(input: { collectionId: string; setId?: string | null; files: File[] }) {
  const setId = input.setId && input.setId !== 'general' ? input.setId : null;
  const uploadRequests = input.files.map(file => ({
    collection_id: input.collectionId,
    set_id: setId,
    original_filename: file.name,
    mime_type: file.type || (isVideo(file) ? 'video/mp4' : 'image/jpeg'),
    file_size_bytes: file.size,
  }));

  const presigned = await request<BulkPresignUploadResponse>('/uploads/bulk/presign/', {
    method: 'POST',
    body: JSON.stringify({ files: uploadRequests }),
  });

  await mapWithConcurrency(presigned.uploads, 3, async (upload, index) => {
    const file = input.files[index];
    const uploadResponse = await fetch(upload.upload_url, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    });
    if (!uploadResponse.ok) throw new Error(`Upload failed with status ${uploadResponse.status}`);
  });

  const completed = await request<BulkCompleteUploadResponse>('/uploads/bulk/complete/', {
    method: 'POST',
    body: JSON.stringify({
      uploads: presigned.uploads.map(upload => ({ upload_id: upload.upload.upload_id })),
    }),
  });

  const uploaded = (await mapWithConcurrency(completed.uploads, 5, async complete => {
    if (complete.media_asset && typeof complete.media_asset === 'object') return toMedia(complete.media_asset);
    if (complete.media_asset) return getMedia(String(complete.media_asset));
    return null;
  })).filter((media): media is Media => Boolean(media));

  notifyMediaChanges();
  return uploaded;
}
