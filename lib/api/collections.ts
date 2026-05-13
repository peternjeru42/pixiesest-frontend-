import { COLLECTIONS } from '../mock-data';
import type { Collection, CollectionStatus } from '../types';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function listCollections(filter?: { status?: CollectionStatus; folderId?: string }) {
  await wait();
  let r = [...COLLECTIONS];
  if (filter?.status) r = r.filter(c => c.status === filter.status);
  if (filter?.folderId) r = r.filter(c => c.folderId === filter.folderId);
  return r;
}
export async function getCollection(id: string): Promise<Collection | null> {
  await wait();
  return COLLECTIONS.find(c => c.id === id || c.slug === id) ?? null;
}
export async function createCollection(input: Partial<Collection>) {
  await wait(400);
  return { ...COLLECTIONS[0], ...input, id: 'new-' + Date.now(), downloadPin: String(Math.floor(Math.random() * 10000)).padStart(4, '0') };
}
export async function updateCollection(id: string, patch: Partial<Collection>) {
  await wait(); return { ...COLLECTIONS.find(c => c.id === id)!, ...patch };
}
export async function deleteCollection(_id: string) { await wait(); return { ok: true }; }
export async function publishCollection(id: string) { return updateCollection(id, { status: 'published' }); }
export async function unpublishCollection(id: string) { return updateCollection(id, { status: 'draft' }); }
export async function archiveCollection(id: string) { return updateCollection(id, { status: 'archived' }); }
