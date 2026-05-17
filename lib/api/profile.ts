import type { Photographer } from '../types';

const PRODUCTION_API_BASE_URL = 'https://pixiesest-backend-production.up.railway.app/api/v1';

type ProfileResponse = {
  id: string;
  user: string;
  email: string;
  display_name: string;
  business_name: string;
  website: string;
  instagram: string;
  phone_number: string;
  bio: string;
  logo_url: string;
  profile_photo_url?: string;
};

type ProfileStorageResponse = {
  total_storage_bytes: number;
  total_original_storage_bytes: number;
  total_preview_storage_bytes: number;
  total_thumbnail_storage_bytes: number;
};

export type StudioStats = {
  photos: number;
  videos: number;
  videoDurationSec: number;
  collections: number;
  folders: number;
  sets: number;
  favoriteLists: number;
  downloads: number;
  galleryViews: number;
};

type ProfileStatsResponse = {
  total_photos: number;
  total_videos: number;
  total_video_duration_seconds: number;
  total_collections: number;
  total_folders: number;
  total_sets: number;
  total_favorite_lists: number;
  total_downloads: number;
  total_gallery_views: number;
};

export class ProfileApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ProfileApiError';
    this.status = status;
  }
}

function getApiBaseUrl() {
  const configuredUrl = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
  const fallbackUrl = process.env.NODE_ENV === 'production' ? PRODUCTION_API_BASE_URL : 'http://localhost:8000/api/v1';
  return (configuredUrl ?? fallbackUrl).replace(/\/$/, '');
}

function getStoredAccessToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('droptop.accessToken');
}

async function request<T>(path: string, accessToken: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ProfileApiError(response.status, getErrorMessage(data) || `Profile request failed with status ${response.status}`);
  }

  return data as T;
}

function getErrorMessage(data: unknown): string {
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

export async function getProfile(accessToken: string): Promise<Photographer> {
  const [profile, storage] = await Promise.all([
    request<ProfileResponse>('/profile/', accessToken),
    request<ProfileStorageResponse>('/profile/storage/', accessToken),
  ]);

  return mapProfile(profile, storage);
}

export async function updateProfile(patch: Partial<Photographer>) {
  const accessToken = getStoredAccessToken();
  if (!accessToken) throw new ProfileApiError(401, 'You need to sign in again before updating your profile.');

  const profile = await request<ProfileResponse>('/profile/', accessToken, {
    method: 'PATCH',
    body: JSON.stringify(toProfilePatch(patch)),
  });
  const storage = await request<ProfileStorageResponse>('/profile/storage/', accessToken);

  return mapProfile(profile, storage);
}

export async function getStudioStats(accessToken: string): Promise<StudioStats> {
  const stats = await request<ProfileStatsResponse>('/profile/stats/', accessToken);

  return {
    photos: stats.total_photos,
    videos: stats.total_videos,
    videoDurationSec: stats.total_video_duration_seconds,
    collections: stats.total_collections,
    folders: stats.total_folders,
    sets: stats.total_sets,
    favoriteLists: stats.total_favorite_lists,
    downloads: stats.total_downloads,
    galleryViews: stats.total_gallery_views,
  };
}

function mapProfile(profile: ProfileResponse, storage: ProfileStorageResponse): Photographer {
  const usedGB = bytesToGB(storage.total_storage_bytes);

  return {
    id: profile.id,
    email: profile.email,
    displayName: profile.display_name,
    businessName: profile.business_name,
    bio: profile.bio,
    website: profile.website,
    instagram: profile.instagram,
    phone: profile.phone_number,
    avatar: profile.profile_photo_url || profile.logo_url,
    storage: {
      usedGB,
      totalGB: usedGB,
      originalsGB: bytesToGB(storage.total_original_storage_bytes),
      previewsGB: bytesToGB(storage.total_preview_storage_bytes),
      thumbsGB: bytesToGB(storage.total_thumbnail_storage_bytes),
    },
  };
}

function toProfilePatch(patch: Partial<Photographer>) {
  return {
    ...(patch.displayName !== undefined ? { display_name: patch.displayName } : {}),
    ...(patch.businessName !== undefined ? { business_name: patch.businessName } : {}),
    ...(patch.bio !== undefined ? { bio: patch.bio } : {}),
    ...(patch.website !== undefined ? { website: patch.website } : {}),
    ...(patch.instagram !== undefined ? { instagram: patch.instagram } : {}),
    ...(patch.phone !== undefined ? { phone_number: patch.phone } : {}),
    ...(patch.avatar !== undefined ? { logo_url: patch.avatar } : {}),
  };
}

function bytesToGB(bytes: number) {
  return Math.round((bytes / 1024 ** 3) * 10) / 10;
}
