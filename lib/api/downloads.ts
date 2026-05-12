import { DOWNLOAD_LOGS } from '../mock-data';
import type { DownloadType } from '../types';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function listDownloads(filter?: { collectionId?: string }) {
  await wait();
  return filter?.collectionId
    ? DOWNLOAD_LOGS.filter(d => d.collectionId === filter.collectionId)
    : [...DOWNLOAD_LOGS];
}
export async function requestDownload(input: { collectionId: string; type: DownloadType; setId?: string; pin?: string }) {
  await wait(400);
  return { jobId: 'job-' + Date.now(), ...input, status: 'preparing' as const };
}
export async function getDownloadJob(id: string) {
  await wait();
  return { id, status: 'ready' as const, url: '#', sizeMB: 1200, expiresAt: '2026-05-20T00:00:00Z' };
}
export async function retryDownload(_id: string) { await wait(); return { ok: true }; }
export async function deleteDownload(_id: string) { await wait(); return { ok: true }; }
