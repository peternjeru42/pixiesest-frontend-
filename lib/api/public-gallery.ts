import type { Collection, CollectionCounts, Folder, Media, Set, SetVisibility } from '../types';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');
const GALLERY_SESSION_KEY = 'droptop.gallerySession';

type Paginated<T> = {
  results: T[];
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
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(session ? { 'X-Gallery-Session': session } : {}),
      ...(init.headers ?? {}),
    },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const detail = data && typeof data === 'object' && 'detail' in data ? String((data as { detail: unknown }).detail) : `Public request failed with status ${response.status}`;
    throw new PublicApiError(response.status, detail);
  }

  return data as T;
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

export async function getPublicFolder(slug: string) {
  return toFolder(await publicRequest<BackendFolder>(`/public/folders/${slug}/`));
}

export async function listPublicFolderCollections(slug: string) {
  const data = await publicRequest<BackendCollection[] | Paginated<BackendCollection>>(`/public/folders/${slug}/collections/`);
  return unpackList(data).map(toCollection);
}

export async function getPublicCollection(slug: string) {
  return toCollection(await publicRequest<BackendCollection>(`/public/collections/${slug}/`));
}

export async function listPublicCollectionSets(slug: string) {
  const data = await publicRequest<BackendSet[] | Paginated<BackendSet>>(`/public/collections/${slug}/sets/`);
  return unpackList(data).map(toSet);
}

export async function listPublicCollectionMedia(slug: string) {
  const data = await publicRequest<BackendMedia[] | Paginated<BackendMedia>>(`/public/collections/${slug}/media/`);
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
