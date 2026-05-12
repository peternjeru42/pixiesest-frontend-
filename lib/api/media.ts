import { ALL_MEDIA, SET_MEDIA } from '../mock-data';
import type { Media } from '../types';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function listMedia(filter?: { collectionId?: string; setId?: string }) {
  await wait();
  let r = ALL_MEDIA;
  if (filter?.collectionId) r = r.filter(m => m.collectionId === filter.collectionId);
  if (filter?.setId) r = r.filter(m => m.setId === filter.setId);
  return r;
}
export async function getMedia(id: string): Promise<Media | null> {
  await wait();
  return ALL_MEDIA.find(m => m.id === id) ?? null;
}
export async function setMediaPrivacy(_id: string, _private: boolean) { await wait(); return { ok: true }; }
export async function setMediaDownloadable(_id: string, _on: boolean) { await wait(); return { ok: true }; }
export async function deleteMedia(_id: string) { await wait(); return { ok: true }; }
export async function bulkMove(_mediaIds: string[], _setId: string) { await wait(); return { ok: true }; }
export async function setCover(_collectionOrSetId: string, _mediaId: string) { await wait(); return { ok: true }; }
export { SET_MEDIA };
