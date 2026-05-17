import { FOLDERS } from '../mock-data';
import type { Folder } from '../types';
import { listCollections } from './collections';
import { unsplash } from '../utils';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));
const FOLDERS_STORAGE_KEY = 'droptop.folders.v2';
const FOLDERS_CHANGED_EVENT = 'droptop.folders.changed';

function cloneFolder(folder: Folder): Folder {
  return { ...folder };
}

function readFolders(): Folder[] {
  if (typeof window === 'undefined') return FOLDERS.map(cloneFolder);

  const stored = window.localStorage.getItem(FOLDERS_STORAGE_KEY);
  if (stored) {
    try {
      return (JSON.parse(stored) as Folder[]).map(cloneFolder);
    } catch {
      window.localStorage.removeItem(FOLDERS_STORAGE_KEY);
    }
  }

  const seeded = FOLDERS.map(cloneFolder);
  writeFolders(seeded);
  return seeded;
}

function writeFolders(folders: Folder[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(FOLDERS_STORAGE_KEY, JSON.stringify(folders));
  window.dispatchEvent(new Event(FOLDERS_CHANGED_EVENT));
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `folder-${Date.now()}`;
}

function nextUniqueSlug(name: string, folders: Folder[]) {
  const base = makeSlug(name);
  let slug = base;
  let suffix = 2;
  while (folders.some(folder => folder.slug === slug)) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

export function subscribeToFolderChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(FOLDERS_CHANGED_EVENT, callback);
  return () => window.removeEventListener(FOLDERS_CHANGED_EVENT, callback);
}

export async function listFolders(filter?: { search?: string }) {
  await wait();
  const collections = await listCollections();
  const query = filter?.search?.trim().toLowerCase();
  let folders = readFolders();
  if (query) {
    folders = folders.filter(folder =>
      folder.name.toLowerCase().includes(query) ||
      folder.slug.toLowerCase().includes(query),
    );
  }
  return folders.map(folder => ({
    ...folder,
    collectionsCount: collections.filter(collection => collection.folderId === folder.id).length,
  }));
}

export async function searchFolders(search: string) {
  return listFolders({ search });
}
export async function getFolder(id: string): Promise<Folder | null> {
  await wait();
  const folders = await listFolders();
  return folders.find(f => f.id === id || f.slug === id) ?? null;
}
export async function createFolder(input: Partial<Folder>) {
  await wait(400);
  const folders = readFolders();
  const name = input.name?.trim() || 'Untitled folder';
  const folder: Folder = {
    id: `new-${Date.now()}`,
    slug: nextUniqueSlug(name, folders),
    name,
    description: input.description?.trim(),
    cover: input.cover || unsplash('photo-1519741497674-611481863552', 1200),
    collectionsCount: 0,
    hasPassword: Boolean(input.hasPassword),
    showOnHomepage: input.showOnHomepage ?? true,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  writeFolders([folder, ...folders]);
  return folder;
}
export async function updateFolder(id: string, patch: Partial<Folder>) {
  await wait();
  const folders = readFolders();
  const index = folders.findIndex(folder => folder.id === id);
  if (index === -1) throw new Error('Folder not found');
  const updated = { ...folders[index], ...patch };
  if (patch.name) updated.slug = nextUniqueSlug(patch.name, folders.filter(folder => folder.id !== id));
  folders[index] = updated;
  writeFolders(folders);
  return updated;
}
export async function deleteFolder(id: string) {
  await wait();
  writeFolders(readFolders().filter(folder => folder.id !== id));
  return { ok: true };
}
