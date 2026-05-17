import type { Folder } from '../types';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');
const FOLDERS_CHANGED_EVENT = 'droptop.folders.changed';

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

function getStoredAccessToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('droptop.accessToken');
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getStoredAccessToken();
  if (!token) throw new Error('You need to sign in before loading folders.');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return data as T;
}

function notifyFolderChanges() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(FOLDERS_CHANGED_EVENT));
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

function folderBody(input: Partial<Folder>, mode: 'create' | 'patch' = 'patch') {
  const body: Record<string, string | boolean> = {};
  if (mode === 'create' || input.name !== undefined) body.name = input.name ?? 'Untitled folder';
  if (mode === 'create' || input.description !== undefined) body.description = input.description ?? '';
  if (mode === 'create' || input.showOnHomepage !== undefined) body.show_on_homepage = input.showOnHomepage ?? true;
  return body;
}

export function subscribeToFolderChanges(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(FOLDERS_CHANGED_EVENT, callback);
  return () => window.removeEventListener(FOLDERS_CHANGED_EVENT, callback);
}

export async function listFolders(filter?: { search?: string }) {
  const query = filter?.search ? `?search=${encodeURIComponent(filter.search)}` : '';
  return (await request<BackendFolder[]>(`/folders/${query}`)).map(toFolder);
}

export async function searchFolders(search: string) {
  return listFolders({ search });
}

export async function getFolder(id: string): Promise<Folder | null> {
  try {
    return toFolder(await request<BackendFolder>(`/folders/${id}/`));
  } catch (error) {
    if (error instanceof Error && /404/.test(error.message)) return null;
    throw error;
  }
}

export async function createFolder(input: Partial<Folder>) {
  const folder = toFolder(await request<BackendFolder>('/folders/', {
    method: 'POST',
    body: JSON.stringify(folderBody(input, 'create')),
  }));
  notifyFolderChanges();
  return folder;
}

export async function updateFolder(id: string, patch: Partial<Folder>) {
  const folder = toFolder(await request<BackendFolder>(`/folders/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(folderBody(patch)),
  }));
  notifyFolderChanges();
  return folder;
}

export async function deleteFolder(id: string) {
  await request(`/folders/${id}/`, { method: 'DELETE' });
  notifyFolderChanges();
  return { ok: true };
}
