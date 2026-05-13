import { FOLDERS } from '../mock-data';
import type { Folder } from '../types';
import { listCollections } from './collections';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function listFolders() {
  await wait();
  const collections = await listCollections();
  return FOLDERS.map(folder => ({
    ...folder,
    collectionsCount: collections.filter(collection => collection.folderId === folder.id).length,
  }));
}
export async function getFolder(id: string): Promise<Folder | null> {
  await wait();
  const folders = await listFolders();
  return folders.find(f => f.id === id || f.slug === id) ?? null;
}
export async function createFolder(input: Partial<Folder>) {
  await wait(400);
  return { ...FOLDERS[0], ...input, id: 'new-' + Date.now() } as Folder;
}
export async function updateFolder(id: string, patch: Partial<Folder>) {
  await wait();
  return { ...FOLDERS.find(f => f.id === id)!, ...patch };
}
export async function deleteFolder(_id: string) { await wait(); return { ok: true }; }
