export type CollectionStatus = 'draft' | 'published' | 'archived';
export type MediaType = 'photo' | 'video';
export type MediaStatus = 'uploading' | 'processing' | 'ready' | 'failed';
export type SetVisibility = 'public' | 'client' | 'hidden';
export type FavoriteStatus = 'active' | 'submitted' | 'locked' | 'archived';
export type DownloadStatus = 'preparing' | 'complete' | 'failed' | 'expired';
export type DownloadType = 'original' | 'web' | 'highres' | 'favorites' | 'gallery';

export interface Folder {
  id: string;
  slug: string;
  name: string;
  description?: string;
  cover: string;
  collectionsCount: number;
  hasPassword: boolean;
  showOnHomepage: boolean;
  createdAt: string;
}

export interface Set {
  id: string;
  title: string;
  description?: string;
  cover: string;
  visibility: SetVisibility;
  photoCount: number;
  videoCount: number;
  videoDurationSec: number;
  order: number;
}

export interface CollectionCounts {
  photos: number;
  videos: number;
  videoDurationSec: number;
  favorites: number;
  downloads: number;
  views: number;
  sets: number;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description?: string;
  couple?: string;
  venue?: string;
  date: string;
  cover: string;
  folderId: string | null;
  folderName: string | null;
  status: CollectionStatus;
  password?: string;
  downloadPin: string;
  counts: CollectionCounts;
  sets: Set[];
  createdAt: string;
}

export interface Media {
  id: string;
  filename: string;
  src: string;
  thumb: string;
  width: number;
  height: number;
  sizeMB: number;
  type: MediaType;
  status: MediaStatus;
  durationSec?: number;
  faved: boolean;
  private: boolean;
  downloadable: boolean;
  setId: string;
  collectionId: string;
  uploadedAt: string;
  camera?: { make: string; model: string; lens: string; iso: number; shutter: string; aperture: string };
}

export interface FavoriteList {
  id: string;
  clientName: string;
  clientEmail: string;
  collectionId: string;
  collectionTitle: string;
  status: FavoriteStatus;
  mediaIds: string[];
  notes: { mediaId: string; text: string }[];
  shareToken: string;
  updatedAt: string;
}

export interface DownloadLog {
  id: string;
  clientEmail: string;
  collectionId: string;
  collectionTitle: string;
  fileLabel: string;
  type: DownloadType;
  sizeMB: number;
  status: DownloadStatus;
  date: string;
}

export interface ActivityEvent {
  id: string;
  type: 'favorite' | 'download' | 'view' | 'comment' | 'publish' | 'upload' | 'invite';
  actor: string;
  target: string;
  note: string;
  collectionId?: string;
  time: string;
}

export interface Photographer {
  id: string;
  email: string;
  displayName: string;
  businessName: string;
  bio?: string;
  website?: string;
  instagram?: string;
  phone?: string;
  avatar?: string;
  storage: { usedGB: number; totalGB: number; originalsGB: number; previewsGB: number; thumbsGB: number };
}
