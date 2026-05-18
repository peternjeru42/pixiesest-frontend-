import type { Collection, CollectionCounts, Folder, Media, Set, SetVisibility } from '../types';
import { getStoredAccessToken } from './session';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');
const GALLERY_SESSION_KEY = 'droptop.gallerySession';

type Paginated<T> = {
  results: T[];
};

type PublicRequestOptions = {
  preview?: boolean;
};

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

type BackendFolder = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  cover_url?: string;
  collections_count?: number;
  is_password_enabled?: boolean;
  show_on_homepage?: boolean;
  created_at?: string;
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
  status?: Collection['status'];
  counts?: BackendCounts;
};

type BackendSet = {
  id: string;
  slug: string;
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
  collection: string;
  set: string;
  media_type?: string;
  display_filename?: string;
  original_filename?: string;
  preview_url?: string;
  thumbnail_url?: string;
  original_width?: number | null;
  original_height?: number | null;
  file_size_bytes?: number;
  duration_seconds?: number | null;
  status?: string;
  is_private?: boolean;
  is_downloadable?: boolean;
  uploaded_at?: string | null;
};

type BackendDownloadJob = {
  id: string;
  collection: string;
  favorite_list?: string | null;
  requested_by_email?: string;
  download_type: string;
  download_quality: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'expired';
  zip_file_key?: string;
  file_size_bytes?: number | null;
  expires_at?: string | null;
  started_at?: string | null;
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type PublicDownloadJob = {
  id: string;
  collectionId: string;
  favoriteListId?: string | null;
  requestedByEmail: string;
  type: string;
  quality: string;
  status: BackendDownloadJob['status'];
  fileSizeBytes: number | null;
  expiresAt: string | null;
  completedAt: string | null;
  createdAt: string;
};

export class PublicApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function unpackList<T>(data: T[] | Paginated<T>) {
  return Array.isArray(data) ? data : data.results;
}

function getStoredGallerySession() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(GALLERY_SESSION_KEY) ?? '';
}

export function storeGallerySession(token: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(GALLERY_SESSION_KEY, token);
}

async function publicRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const session = getStoredGallerySession();
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (session) headers.set('X-Gallery-Session', session);
  if (path.includes('preview=1')) {
    const token = getStoredAccessToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      cache: 'no-store',
      headers,
    });
  } catch {
    throw new PublicApiError(0, 'Unable to reach the gallery service. Check the API URL and allowed frontend origins.');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = data && typeof data === 'object' && 'detail' in data ? String((data as { detail: unknown }).detail) : `Public request failed with status ${response.status}`;
    throw new PublicApiError(response.status, detail);
  }

  return data as T;
}

function withPreview(path: string, options?: PublicRequestOptions) {
  if (!options?.preview) return path;
  return `${path}${path.includes('?') ? '&' : '?'}preview=1`;
}

function formatDisplayDate(value?: string | null) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function emptyCounts(counts?: BackendCounts): CollectionCounts {
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

function toFolder(folder: BackendFolder): Folder {
  return {
    id: String(folder.id),
    slug: folder.slug,
    name: folder.name,
    description: folder.description,
    cover: folder.cover_url ?? '',
    collectionsCount: folder.collections_count ?? 0,
    hasPassword: Boolean(folder.is_password_enabled),
    showOnHomepage: folder.show_on_homepage ?? true,
    createdAt: folder.created_at ?? '',
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
    status: collection.status ?? 'published',
    downloadPin: '',
    counts: emptyCounts(collection.counts),
    sets: [],
    createdAt: collection.created_at ?? '',
  };
}

function toSet(set: BackendSet): Set & { slug: string } {
  return {
    id: String(set.id),
    slug: set.slug,
    title: set.title,
    description: set.description,
    cover: set.cover_url ?? '',
    visibility: mapSetVisibility(set.visibility),
    photoCount: set.photo_count ?? 0,
    videoCount: set.video_count ?? 0,
    videoDurationSec: set.video_duration_sec ?? 0,
    order: set.sort_order ?? 0,
  };
}

function toMedia(media: BackendMedia): Media {
  const width = media.original_width ?? 1600;
  const height = media.original_height ?? 1067;
  return {
    id: String(media.id),
    filename: media.display_filename ?? media.original_filename ?? 'Untitled file',
    src: media.preview_url ?? media.thumbnail_url ?? '',
    thumb: media.thumbnail_url ?? media.preview_url ?? '',
    width,
    height,
    sizeMB: (media.file_size_bytes ?? 0) / 1024 / 1024,
    type: media.media_type === 'video' ? 'video' : 'photo',
    status: media.status === 'failed' ? 'failed' : 'ready',
    durationSec: media.duration_seconds ?? undefined,
    faved: false,
    private: Boolean(media.is_private),
    downloadable: media.is_downloadable ?? true,
    setId: String(media.set),
    collectionId: String(media.collection),
    uploadedAt: media.uploaded_at ?? '',
  };
}

function toDownloadJob(job: BackendDownloadJob): PublicDownloadJob {
  return {
    id: String(job.id),
    collectionId: String(job.collection),
    favoriteListId: job.favorite_list ? String(job.favorite_list) : null,
    requestedByEmail: job.requested_by_email ?? '',
    type: job.download_type,
    quality: job.download_quality,
    status: job.status,
    fileSizeBytes: job.file_size_bytes ?? null,
    expiresAt: job.expires_at ?? null,
    completedAt: job.completed_at ?? null,
    createdAt: job.created_at ?? '',
  };
}

export async function getPublicFolder(slug: string) {
  return toFolder(await publicRequest<BackendFolder>(`/public/folders/${slug}/`));
}

export async function listPublicFolderCollections(slug: string) {
  const data = await publicRequest<BackendCollection[] | Paginated<BackendCollection>>(`/public/folders/${slug}/collections/`);
  return unpackList(data).map(toCollection);
}

export async function getPublicCollection(slug: string, options?: PublicRequestOptions) {
  return toCollection(await publicRequest<BackendCollection>(withPreview(`/public/collections/${slug}/`, options)));
}

export async function listPublicCollectionSets(slug: string, options?: PublicRequestOptions) {
  const data = await publicRequest<BackendSet[] | Paginated<BackendSet>>(withPreview(`/public/collections/${slug}/sets/`, options));
  return unpackList(data).map(toSet);
}

export async function listPublicCollectionMedia(slug: string, options?: PublicRequestOptions) {
  const data = await publicRequest<BackendMedia[] | Paginated<BackendMedia>>(withPreview(`/public/collections/${slug}/media/`, options));
  return unpackList(data).map(toMedia);
}

async function verifyPassword(path: string, password: string, email?: string) {
  const data = await publicRequest<{ gallery_session: string }>(path, {
    method: 'POST',
    body: JSON.stringify({ password, email: email || '' }),
  });
  storeGallerySession(data.gallery_session);
  return data.gallery_session;
}

export function verifyCollectionPassword(slug: string, password: string, email?: string) {
  return verifyPassword(`/gallery-access/collections/${slug}/verify/`, password, email);
}

export function verifyFolderPassword(slug: string, password: string, email?: string) {
  return verifyPassword(`/gallery-access/folders/${slug}/verify/`, password, email);
}

export async function downloadOriginalMedia(mediaId: string, pin: string) {
  const data = await publicRequest<{ url: string }>(`/public/downloads/media/${mediaId}/original/`, {
    method: 'POST',
    body: JSON.stringify({ pin }),
  });
  return data.url;
}

export async function createPublicCollectionOriginalZip(collectionSlug: string, pin: string) {
  const data = await publicRequest<BackendDownloadJob>(`/public/downloads/collections/${collectionSlug}/original-zip/`, {
    method: 'POST',
    body: JSON.stringify({ pin }),
  });
  return toDownloadJob(data);
}

export async function getPublicDownloadJob(jobId: string) {
  return toDownloadJob(await publicRequest<BackendDownloadJob>(`/public/download-jobs/${jobId}/`));
}

export async function getPublicDownloadJobSignedUrl(jobId: string) {
  const data = await publicRequest<{ url: string }>(`/public/download-jobs/${jobId}/signed-url/`);
  return data.url;
}
