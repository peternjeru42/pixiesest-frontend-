import { FAVORITE_LISTS } from '../mock-data';
import type { FavoriteList, FavoriteStatus } from '../types';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function listFavorites(filter?: { collectionId?: string; status?: FavoriteStatus }) {
  await wait();
  let r = [...FAVORITE_LISTS];
  if (filter?.collectionId) r = r.filter(f => f.collectionId === filter.collectionId);
  if (filter?.status) r = r.filter(f => f.status === filter.status);
  return r;
}
export async function getFavoriteList(id: string): Promise<FavoriteList | null> {
  await wait();
  return FAVORITE_LISTS.find(f => f.id === id || f.shareToken === id) ?? null;
}
export async function createFavoriteList(_collectionId: string, input: Partial<FavoriteList>) {
  await wait(400);
  return { ...FAVORITE_LISTS[0], ...input, id: 'new-' + Date.now() } as FavoriteList;
}
export async function toggleFavorite(_listId: string, _mediaId: string) { await wait(50); return { ok: true }; }
export async function addNote(_listId: string, _mediaId: string, _text: string) { await wait(); return { ok: true }; }
export async function submitFavorites(_listId: string) { await wait(500); return { ok: true }; }
export async function lockFavoriteList(_id: string) { await wait(); return { ok: true }; }
export async function unlockFavoriteList(_id: string) { await wait(); return { ok: true }; }
