import { COLLECTIONS, FOLDERS } from '../mock-data';
import type { Collection, CollectionStatus } from '../types';
import { unsplash } from '../utils';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));
const COLLECTIONS_STORAGE_KEY = 'lumen.collections.v2';
const COLLECTIONS_CHANGED_EVENT = 'lumen.collections.changed';

function cloneCollection(collection: Collection): Collection {
  return {
    ...collection,
    counts: { ...collection.counts },
    sets: [...collection.sets],
  };
}

function readCollections(): Collection[] {
  if (typeof window === 'undefined') return COLLECTIONS.map(cloneCollection);

  const stored = window.localStorage.getItem(COLLECTIONS_STORAGE_KEY);
  if (stored) {
    try {
      return (JSON.parse(stored) as Collection[]).map(cloneCollection);
    } catch {
      window.localStorage.removeItem(COLLECTIONS_STORAGE_KEY);
    }
  }

  const seeded = COLLECTIONS.map(cloneCollection);
  writeCollections(seeded);
  return seeded;
}

function writeCollections(collections: Collection[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(collections));
  window.dispatchEvent(new Event(COLLECTIONS_CHANGED_EVENT));
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `collection-${Date.now()}`;
}

function nextUniqueSlug(title: string, collections: Collection[]) {
  const base = makeSlug(title);
  let slug = base;
  let suffix = 2;
  while (collections.some(collection => collection.slug === slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

function randomPin() {
  return String(Math.floor(Math.random() * 10000)).padStart(4, '0');
}

export function subscribeToCollectionChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(COLLECTIONS_CHANGED_EVENT, callback);
  return () => window.removeEventListener(COLLECTIONS_CHANGED_EVENT, callback);
}

export async function listCollections(filter?: { status?: CollectionStatus; folderId?: string }) {
  await wait();
  let r = readCollections();
  if (filter?.status) r = r.filter(c => c.status === filter.status);
  if (filter?.folderId) r = r.filter(c => c.folderId === filter.folderId);
  return r;
}
export async function getCollection(id: string): Promise<Collection | null> {
  await wait();
  return readCollections().find(c => c.id === id || c.slug === id) ?? null;
}
export async function createCollection(input: Partial<Collection>) {
  await wait(400);
  const collections = readCollections();
  const folder = input.folderId ? FOLDERS.find(f => f.id === input.folderId) ?? null : null;
  const title = input.title?.trim() || 'Untitled collection';
  const now = new Date();
  const collection: Collection = {
    id: `new-${now.getTime()}`,
    slug: nextUniqueSlug(title, collections),
    title,
    description: input.description,
    date: input.date || now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    cover: input.cover || unsplash('photo-1519741497674-611481863552', 1600),
    folderId: folder?.id ?? null,
    folderName: folder?.name ?? null,
    status: 'draft',
    password: input.password || randomPin(),
    downloadPin: input.downloadPin || randomPin(),
    counts: input.counts ?? { photos: 0, videos: 0, videoDurationSec: 0, favorites: 0, downloads: 0, views: 0, sets: 0 },
    sets: input.sets ?? [],
    createdAt: now.toISOString().slice(0, 10),
  };
  writeCollections([collection, ...collections]);
  return collection;
}
export async function updateCollection(id: string, patch: Partial<Collection>) {
  await wait();
  const collections = readCollections();
  const index = collections.findIndex(c => c.id === id);
  if (index === -1) throw new Error('Collection not found');

  const next = { ...collections[index], ...patch };
  if ('folderId' in patch) {
    const folder = patch.folderId ? FOLDERS.find(f => f.id === patch.folderId) : null;
    if (patch.folderId && !folder) throw new Error('Folder not found');
    next.folderId = folder?.id ?? null;
    next.folderName = folder?.name ?? null;
  }

  collections[index] = next;
  writeCollections(collections);
  return next;
}
export async function deleteCollection(_id: string) { await wait(); return { ok: true }; }
export async function publishCollection(id: string) { return updateCollection(id, { status: 'published' }); }
export async function unpublishCollection(id: string) { return updateCollection(id, { status: 'draft' }); }
export async function archiveCollection(id: string) { return updateCollection(id, { status: 'archived' }); }
export async function moveCollectionToFolder(id: string, folderId: string | null) {
  return updateCollection(id, { folderId });
}
