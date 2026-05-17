import { ALL_MEDIA, SET_MEDIA } from '../mock-data';
import type { Media } from '../types';
import { getCollection, updateCollection } from './collections';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));
const MEDIA_STORAGE_KEY = 'droptop.media.v2';
const MEDIA_CHANGED_EVENT = 'droptop.media.changed';

function cloneMedia(media: Media): Media {
  return {
    ...media,
    camera: media.camera ? { ...media.camera } : undefined,
  };
}

function readMedia(): Media[] {
  if (typeof window === 'undefined') return ALL_MEDIA.map(cloneMedia);

  const stored = window.localStorage.getItem(MEDIA_STORAGE_KEY);
  if (stored) {
    try {
      return (JSON.parse(stored) as Media[]).map(cloneMedia);
    } catch {
      window.localStorage.removeItem(MEDIA_STORAGE_KEY);
    }
  }

  const seeded = ALL_MEDIA.map(cloneMedia);
  writeMedia(seeded);
  return seeded;
}

function writeMedia(media: Media[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(media));
  window.dispatchEvent(new Event(MEDIA_CHANGED_EVENT));
}

function isVideo(file: File) {
  return file.type.startsWith('video/') || /\.(mp4|mov|m4v|webm)$/i.test(file.name);
}

function objectUrlFor(file: File) {
  return typeof URL !== 'undefined' ? URL.createObjectURL(file) : '';
}

export function subscribeToMediaChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(MEDIA_CHANGED_EVENT, callback);
  return () => window.removeEventListener(MEDIA_CHANGED_EVENT, callback);
}

export async function listMedia(filter?: { collectionId?: string; setId?: string }) {
  await wait();
  let r = readMedia();
  if (filter?.collectionId) r = r.filter(m => m.collectionId === filter.collectionId);
  if (filter?.setId) r = r.filter(m => m.setId === filter.setId);
  return r;
}
export async function getMedia(id: string): Promise<Media | null> {
  await wait();
  return readMedia().find(m => m.id === id) ?? null;
}
export async function setMediaPrivacy(_id: string, _private: boolean) { await wait(); return { ok: true }; }
export async function setMediaDownloadable(_id: string, _on: boolean) { await wait(); return { ok: true }; }
export async function deleteMedia(id: string) {
  await wait();
  writeMedia(readMedia().filter(media => media.id !== id));
  return { ok: true };
}
export async function bulkMove(_mediaIds: string[], _setId: string) { await wait(); return { ok: true }; }
export async function setCover(_collectionOrSetId: string, _mediaId: string) { await wait(); return { ok: true }; }

export async function addUploadedMedia(input: { collectionId: string; setId: string; files: File[] }) {
  await wait(250);
  const collection = await getCollection(input.collectionId);
  if (!collection) throw new Error('Collection not found');

  const now = new Date();
  const uploadedAt = now.toISOString();
  const existing = readMedia();
  const media: Media[] = input.files.map((file, index) => {
    const video = isVideo(file);
    const src = objectUrlFor(file);
    return {
      id: `upload-${now.getTime()}-${index}`,
      filename: file.name,
      src,
      thumb: video ? collection.cover : src,
      width: video ? 1920 : 1600,
      height: video ? 1080 : 1067,
      sizeMB: Number((file.size / (1024 * 1024)).toFixed(1)),
      type: video ? 'video' : 'photo',
      status: 'ready',
      durationSec: video ? 0 : undefined,
      faved: false,
      private: false,
      downloadable: true,
      setId: input.setId,
      collectionId: input.collectionId,
      uploadedAt,
    };
  });

  writeMedia([...media, ...existing]);

  const photos = media.filter(item => item.type === 'photo').length;
  const videos = media.length - photos;
  await updateCollection(collection.id, {
    counts: {
      ...collection.counts,
      photos: collection.counts.photos + photos,
      videos: collection.counts.videos + videos,
    },
    cover: collection.counts.photos === 0 && media[0]?.thumb ? media[0].thumb : collection.cover,
  });

  return media;
}
export { SET_MEDIA };
