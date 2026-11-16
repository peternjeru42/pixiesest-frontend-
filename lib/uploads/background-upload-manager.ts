'use client';

import {
  checkUploadDuplicates,
  createFileFingerprint,
  deleteMedia,
  uploadMediaFile,
  type DuplicateMedia,
} from '@/lib/api/media';
import type { Media } from '@/lib/types';

export type BackgroundUploadStatus = 'checking' | 'queued' | 'uploading' | 'done' | 'failed' | 'skipped' | 'duplicate';

export type BackgroundUploadJob = {
  id: string;
  collectionId: string;
  targetSetId: string;
  file: File | null;
  fileSizeBytes: number;
  originalName: string;
  name: string;
  sizeMB: number;
  thumb: string;
  type: 'photo' | 'video';
  progress: number;
  status: BackgroundUploadStatus;
  error: string;
  checksum: string;
  allowDuplicate: boolean;
  media?: Media;
  duplicateOf?: DuplicateMedia;
  localDuplicateName?: string;
  resolvingDuplicate: boolean;
  createdAt: number;
};

type AddFilesInput = {
  collectionId: string;
  setId: string;
  files: File[];
  fallbackThumb: string;
};

const MAX_CONCURRENT_UPLOADS = 3;
const DUPLICATE_CHECK_BATCH_SIZE = 12;
const EMPTY_UPLOADS: BackgroundUploadJob[] = [];

async function mapWithConcurrency<T, R>(items: T[], limit: number, mapper: (item: T) => Promise<R>) {
  const results = new Array<R>(items.length);
  let nextIndex = 0;
  const workers = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workers }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index]);
    }
  }));
  return results;
}

function duplicateKey(file: Pick<BackgroundUploadJob, 'checksum' | 'fileSizeBytes' | 'originalName'>) {
  return file.checksum
    ? `${file.fileSizeBytes}:${file.checksum}`
    : `${file.fileSizeBytes}:${file.originalName.toLocaleLowerCase()}`;
}

function releaseObjectUrl(url: string) {
  if (url.startsWith('blob:')) URL.revokeObjectURL(url);
}

class BackgroundUploadManager {
  private jobs = new Map<string, BackgroundUploadJob>();
  private active = new Set<string>();
  private listeners = new Set<() => void>();
  private snapshot: BackgroundUploadJob[] = EMPTY_UPLOADS;
  private browserListenerInstalled = false;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    this.ensureBrowserListener();
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.snapshot;

  getServerSnapshot = () => EMPTY_UPLOADS;

  addFiles(input: AddFilesInput) {
    const selected = input.files.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
    if (!selected.length) return [];
    this.ensureBrowserListener();
    const now = Date.now();
    const added = selected.map((file, index): BackgroundUploadJob => {
      const preview = URL.createObjectURL(file);
      const job: BackgroundUploadJob = {
        id: `queue-${now}-${index}-${file.lastModified}`,
        collectionId: input.collectionId,
        targetSetId: input.setId,
        file,
        fileSizeBytes: file.size,
        originalName: file.name,
        name: file.webkitRelativePath || file.name,
        sizeMB: Number((file.size / (1024 * 1024)).toFixed(1)),
        thumb: preview || input.fallbackThumb,
        type: file.type.startsWith('video/') ? 'video' : 'photo',
        progress: 0,
        status: 'checking',
        error: '',
        checksum: '',
        allowDuplicate: false,
        resolvingDuplicate: false,
        createdAt: now + index,
      };
      this.jobs.set(job.id, job);
      return job;
    });
    this.emit();
    void this.prepareFiles(added);
    return added.map(job => job.id);
  }

  remove(id: string) {
    const job = this.jobs.get(id);
    if (!job || job.status === 'uploading' || job.status === 'done') return;
    releaseObjectUrl(job.thumb);
    this.jobs.delete(id);
    this.emit();
  }

  retry(id: string) {
    const job = this.jobs.get(id);
    if (!job || job.status !== 'failed') return;
    this.update(id, { status: 'queued', progress: 0, error: '' });
    this.pump();
  }

  retryAllFailed() {
    for (const job of this.jobs.values()) {
      if (job.status === 'failed') this.jobs.set(job.id, { ...job, status: 'queued', progress: 0, error: '' });
    }
    this.emit();
    this.pump();
  }

  uploadSkippedDuplicate(id: string) {
    const job = this.jobs.get(id);
    if (!job || job.status !== 'skipped') return;
    this.update(id, { status: 'queued', allowDuplicate: true, error: '' });
    this.pump();
  }

  keepDuplicate(id: string) {
    const job = this.jobs.get(id);
    if (!job?.media || job.status !== 'duplicate') return;
    this.update(id, { status: 'done', duplicateOf: undefined, resolvingDuplicate: false });
  }

  async removeDuplicate(id: string) {
    const job = this.jobs.get(id);
    if (!job?.media || job.resolvingDuplicate) return;
    this.update(id, { resolvingDuplicate: true, error: '' });
    try {
      await deleteMedia(job.media.id);
      releaseObjectUrl(job.thumb);
      this.jobs.delete(id);
      this.emit();
    } catch (error) {
      this.update(id, {
        resolvingDuplicate: false,
        error: error instanceof Error ? error.message : 'Unable to remove the duplicate.',
      });
    }
  }

  private async prepareFiles(added: BackgroundUploadJob[]) {
    const addedIds = new Set(added.map(job => job.id));
    const seen = new Map<string, BackgroundUploadJob>();
    for (const job of this.jobs.values()) {
      if (
        job.collectionId === added[0]?.collectionId
        && !addedIds.has(job.id)
        && job.status !== 'failed'
        && job.status !== 'checking'
      ) {
        seen.set(duplicateKey(job), job);
      }
    }

    for (let offset = 0; offset < added.length; offset += DUPLICATE_CHECK_BATCH_SIZE) {
      const batch = added.slice(offset, offset + DUPLICATE_CHECK_BATCH_SIZE).filter(job => this.jobs.has(job.id));
      if (!batch.length) continue;
      const fingerprinted = await mapWithConcurrency(batch, MAX_CONCURRENT_UPLOADS, async job => ({
        ...job,
        checksum: job.file ? await createFileFingerprint(job.file).catch(() => '') : '',
      }));

      let serverMatches = new Map<string, DuplicateMedia | null>();
      try {
        serverMatches = await checkUploadDuplicates({
          collectionId: fingerprinted[0].collectionId,
          files: fingerprinted.flatMap(job => job.file
            ? [{ clientId: job.id, file: job.file, checksum: job.checksum }]
            : []),
        });
      } catch {
        // Completion performs another duplicate check if preflight is temporarily unavailable.
      }

      for (const job of fingerprinted) {
        if (!this.jobs.has(job.id)) continue;
        const key = duplicateKey(job);
        const localMatch = seen.get(key);
        const serverMatch = serverMatches.get(job.id) ?? null;
        if (!localMatch) seen.set(key, job);
        this.jobs.set(job.id, {
          ...job,
          status: serverMatch || localMatch ? 'skipped' : 'queued',
          duplicateOf: serverMatch ?? undefined,
          localDuplicateName: localMatch?.name,
        });
      }
      this.emit();
      this.pump();
    }
  }

  private pump() {
    const slots = MAX_CONCURRENT_UPLOADS - this.active.size;
    if (slots <= 0) return;
    const nextJobs = Array.from(this.jobs.values())
      .filter(job => job.status === 'queued' && !this.active.has(job.id))
      .sort((a, b) => a.createdAt - b.createdAt)
      .slice(0, slots);
    for (const job of nextJobs) void this.run(job.id);
  }

  private async run(id: string) {
    const job = this.jobs.get(id);
    if (!job || !job.file || this.active.has(id)) return;
    this.active.add(id);
    this.update(id, { status: 'uploading', progress: 0, error: '' });
    try {
      const { media, duplicateOf } = await uploadMediaFile({
        collectionId: job.collectionId,
        setId: job.targetSetId,
        file: job.file,
        checksum: job.checksum,
        onProgress: progress => this.update(id, { progress }),
      });
      const current = this.jobs.get(id);
      if (!current) return;
      releaseObjectUrl(current.thumb);
      this.update(id, {
        status: duplicateOf && !current.allowDuplicate ? 'duplicate' : 'done',
        progress: 100,
        error: '',
        media,
        file: null,
        thumb: media.thumb || media.src,
        duplicateOf: duplicateOf ?? undefined,
      });
    } catch (error) {
      this.update(id, {
        status: 'failed',
        progress: 0,
        error: error instanceof Error ? error.message : 'Unable to upload this file.',
      });
    } finally {
      this.active.delete(id);
      this.emit();
      this.pump();
    }
  }

  private update(id: string, patch: Partial<BackgroundUploadJob>) {
    const current = this.jobs.get(id);
    if (!current) return;
    this.jobs.set(id, { ...current, ...patch });
    this.emit();
  }

  private emit() {
    this.snapshot = Array.from(this.jobs.values()).sort((a, b) => b.createdAt - a.createdAt);
    for (const listener of this.listeners) listener();
  }

  private ensureBrowserListener() {
    if (this.browserListenerInstalled || typeof window === 'undefined') return;
    this.browserListenerInstalled = true;
    window.addEventListener('beforeunload', event => {
      const hasPendingUploads = this.snapshot.some(job => ['checking', 'queued', 'uploading'].includes(job.status));
      if (!hasPendingUploads) return;
      event.preventDefault();
      event.returnValue = '';
    });
  }
}

export const backgroundUploadManager = new BackgroundUploadManager();
