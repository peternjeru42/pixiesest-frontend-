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
  playback_url?: string;
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
  const isVideoAsset = media.media_type === 'video';
  const src = media.preview_url || media.thumbnail_url || (isVideoAsset ? media.playback_url || '' : '');
  return {
    id: String(media.id),
    filename: media.display_filename || media.original_filename || '',
    src,
    thumb: media.thumbnail_url || src,
    playbackUrl: media.playback_url || (isVideoAsset ? src : undefined),
    width: media.original_width || 0,
    height: media.original_height || 0,
    sizeMB: Number(((media.file_size_bytes ?? 0) / (1024 * 1024)).toFixed(1)),
    type: isVideoAsset ? 'video' : 'photo',
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

export async function uploadMediaFile(input: {
  collectionId: string;
  setId?: string | null;
  file: File;
  onProgress?: (percent: number) => void;
  signal?: AbortSignal;
}) {
  const setId = input.setId && input.setId !== 'general' ? input.setId : null;
  const contentType = input.file.type || (isVideo(input.file) ? 'video/mp4' : 'image/jpeg');
  let uploadId = '';

  try {
    const presigned = await request<UploadResponse>('/uploads/presign/', {
      method: 'POST',
      body: JSON.stringify({
        collection_id: input.collectionId,
        set_id: setId,
        original_filename: input.file.name,
        mime_type: contentType,
        file_size_bytes: input.file.size,
      }),
      signal: input.signal,
    });
    uploadId = presigned.upload.upload_id;

    await retryOperation(
      () => putFile(presigned.upload_url, input.file, contentType, input.onProgress, input.signal),
      3,
      input.signal,
    );

    const completed = await retryOperation(
      () => request<CompleteUploadResponse>('/uploads/complete/', {
        method: 'POST',
        body: JSON.stringify({ upload_id: uploadId }),
        signal: input.signal,
      }),
      3,
      input.signal,
    );

    const media = completed.media_asset && typeof completed.media_asset === 'object'
      ? toMedia(completed.media_asset)
      : completed.media_asset
        ? await getMedia(String(completed.media_asset))
        : null;

    if (!media) throw new Error('The file was uploaded, but its media record could not be loaded.');
    notifyMediaChanges();
    return media;
  } catch (error) {
    if (uploadId) await cancelUpload(uploadId);
    throw error;
  }
}

async function cancelUpload(uploadId: string) {
  try {
    await request('/uploads/cancel/', {
      method: 'POST',
      body: JSON.stringify({ upload_id: uploadId }),
    });
  } catch {
    // Expired sessions are also cleaned up by the backend. Preserve the original upload error.
  }
}

async function retryOperation<T>(operation: () => Promise<T>, attempts: number, signal?: AbortSignal): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (signal?.aborted) throw new DOMException('Upload cancelled.', 'AbortError');
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === attempts || signal?.aborted) throw error;
      await waitForRetry(500 * (2 ** (attempt - 1)), signal);
    }
  }
  throw lastError;
}

function waitForRetry(delayMs: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const handleAbort = () => {
      window.clearTimeout(timeout);
      reject(new DOMException('Upload cancelled.', 'AbortError'));
    };
    const timeout = window.setTimeout(() => {
      signal?.removeEventListener('abort', handleAbort);
      resolve();
    }, delayMs);
    signal?.addEventListener('abort', handleAbort, { once: true });
  });
}

function putFile(
  uploadUrl: string,
  file: File,
  contentType: string,
  onProgress?: (percent: number) => void,
  signal?: AbortSignal,
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.upload.addEventListener('progress', event => {
      if (event.lengthComputable) onProgress?.(Math.min(99, (event.loaded / event.total) * 100));
    });
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}.`));
      }
    });
    xhr.addEventListener('error', () => reject(new Error('The network interrupted this upload.')));
    xhr.addEventListener('abort', () => reject(new DOMException('Upload cancelled.', 'AbortError')));
    signal?.addEventListener('abort', () => xhr.abort(), { once: true });
    xhr.send(file);
  });
}
