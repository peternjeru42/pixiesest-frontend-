import type { DownloadLog, DownloadStatus, DownloadType } from '../types';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');

type BackendDownload = {
  id: string;
  collection?: string;
  media_asset?: string | null;
  client_email?: string;
  requested_by_email?: string;
  download_type?: string;
  download_quality?: string;
  file_key_served?: string;
  file_size_bytes?: number | null;
  status?: string;
  created_at?: string;
};

function getStoredAccessToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('droptop.accessToken');
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getStoredAccessToken();
  if (!token) throw new Error('You need to sign in before loading downloads.');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
  const data = await response.json().catch(() => null);

  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return data as T;
}

function mapStatus(status?: string): DownloadStatus {
  if (status === 'completed') return 'complete';
  if (status === 'failed' || status === 'expired') return status;
  return 'preparing';
}

function mapType(type?: string): DownloadType {
  if (!type) return 'gallery';
  if (type.includes('favorite')) return 'favorites';
  if (type.includes('web')) return 'web';
  if (type.includes('high')) return 'highres';
  if (type.includes('single')) return 'original';
  return 'gallery';
}

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function fileLabel(download: BackendDownload) {
  if (download.file_key_served) return download.file_key_served.split('/').pop() || download.file_key_served;
  return download.download_quality ? `${download.download_quality} download` : 'Download';
}

function toDownload(download: BackendDownload): DownloadLog {
  return {
    id: String(download.id),
    clientEmail: download.client_email || download.requested_by_email || '',
    collectionId: download.collection ? String(download.collection) : '',
    collectionTitle: '',
    fileLabel: fileLabel(download),
    type: mapType(download.download_type),
    sizeMB: Number(((download.file_size_bytes ?? 0) / (1024 * 1024)).toFixed(1)),
    status: mapStatus(download.status),
    date: formatDate(download.created_at),
  };
}

export async function listDownloads(filter?: { collectionId?: string }) {
  const path = filter?.collectionId ? `/collections/${filter.collectionId}/downloads/logs/` : '/downloads/logs/';
  return (await request<BackendDownload[]>(path)).map(toDownload);
}

export async function requestDownload(input: { collectionId: string; type: DownloadType; setId?: string; pin?: string }) {
  const response = await request<{ id?: string; job_id?: string; status?: string }>(`/public/downloads/collections/${input.collectionId}/original-zip/`, {
    method: 'POST',
    body: JSON.stringify({ pin: input.pin ?? '' }),
  });
  return { jobId: response.job_id ?? response.id ?? '', ...input, status: 'preparing' as const };
}

export async function getDownloadJob(id: string) {
  return request(`/downloads/jobs/${id}/`);
}

export async function retryDownload(id: string) {
  await request(`/downloads/jobs/${id}/retry/`, { method: 'POST' });
  return { ok: true };
}

export async function deleteDownload(id: string) {
  await request(`/downloads/jobs/${id}/`, { method: 'DELETE' });
  return { ok: true };
}
