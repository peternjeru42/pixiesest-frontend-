'use client';
import * as React from 'react';
import { AlertTriangle, Check, FolderUp, Play, RefreshCw, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  checkUploadDuplicates,
  createFileFingerprint,
  deleteMedia,
  uploadMediaFile,
  type DuplicateMedia,
} from '@/lib/api/media';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

interface UploadFile {
  id: string;
  file: File;
  name: string;
  sizeMB: number;
  thumb: string;
  type: 'photo' | 'video';
  progress: number;
  status: 'checking' | 'queued' | 'uploading' | 'done' | 'failed' | 'skipped' | 'duplicate';
  targetSetId: string;
  error: string;
  checksum: string;
  allowDuplicate: boolean;
  media?: Media;
  duplicateOf?: DuplicateMedia;
  localDuplicateName?: string;
  resolvingDuplicate: boolean;
}

const MAX_CONCURRENT_UPLOADS = 3;
const DUPLICATE_CHECK_BATCH_SIZE = 12;

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

function duplicateKey(file: Pick<UploadFile, 'checksum' | 'file'>) {
  return file.checksum
    ? `${file.file.size}:${file.checksum}`
    : `${file.file.size}:${file.file.name.toLocaleLowerCase()}`;
}

export function UploadDropzone({
  collectionId,
  setId,
  fallbackThumb,
  onComplete,
}: {
  collectionId: string;
  setId: string;
  fallbackThumb: string;
  onComplete?: (media: Media[]) => void;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const folderInputRef = React.useRef<HTMLInputElement>(null);
  const filesRef = React.useRef<UploadFile[]>([]);
  const activeUploadsRef = React.useRef(new Set<string>());
  const uploadControllersRef = React.useRef(new Map<string, AbortController>());
  const mountedRef = React.useRef(true);
  const onCompleteRef = React.useRef(onComplete);
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [over, setOver] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    folderInputRef.current?.setAttribute('webkitdirectory', '');
    folderInputRef.current?.setAttribute('directory', '');
  }, []);

  React.useEffect(() => {
    filesRef.current = files;
  }, [files]);

  React.useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  React.useEffect(() => {
    mountedRef.current = true;
    const uploadControllers = uploadControllersRef.current;
    return () => {
      mountedRef.current = false;
      uploadControllers.forEach(controller => controller.abort());
      filesRef.current.forEach(file => URL.revokeObjectURL(file.thumb));
    };
  }, []);

  const total = files.length;
  const done = files.filter(file => file.status === 'done').length;
  const duplicates = files.filter(file => file.status === 'duplicate').length;
  const skipped = files.filter(file => file.status === 'skipped').length;
  const checking = files.filter(file => file.status === 'checking').length;
  const uploaded = done + duplicates;
  const uploading = files.filter(file => file.status === 'uploading').length;
  const queued = files.filter(file => file.status === 'queued').length;
  const failed = files.filter(file => file.status === 'failed').length;
  const allDone = total > 0 && done + skipped === total;
  const pending = checking + queued + uploading + duplicates > 0;
  const overallProgress = total > 0
    ? files.reduce((sum, file) => sum + (file.status === 'skipped' ? 100 : file.progress), 0) / total
    : 0;

  React.useEffect(() => {
    const availableSlots = MAX_CONCURRENT_UPLOADS - activeUploadsRef.current.size;
    if (availableSlots <= 0) return;

    files
      .filter(file => file.status === 'queued' && !activeUploadsRef.current.has(file.id))
      .slice(0, availableSlots)
      .forEach(file => {
        activeUploadsRef.current.add(file.id);
        const controller = new AbortController();
        uploadControllersRef.current.set(file.id, controller);
        setFiles(current => current.map(item => (
          item.id === file.id ? { ...item, status: 'uploading', progress: 0, error: '' } : item
        )));

        uploadMediaFile({
          collectionId,
          setId: file.targetSetId,
          file: file.file,
          checksum: file.checksum,
          signal: controller.signal,
          onProgress: progress => {
            if (!mountedRef.current) return;
            setFiles(current => current.map(item => (
              item.id === file.id ? { ...item, progress } : item
            )));
          },
        })
          .then(({ media, duplicateOf }) => {
            if (!mountedRef.current) return;
            setFiles(current => current.map(item => (
              item.id === file.id
                ? {
                  ...item,
                  status: duplicateOf && !file.allowDuplicate ? 'duplicate' : 'done',
                  progress: 100,
                  error: '',
                  media,
                  duplicateOf: duplicateOf ?? undefined,
                }
                : item
            )));
            if (!duplicateOf || file.allowDuplicate) onCompleteRef.current?.([media]);
          })
          .catch(uploadError => {
            if (!mountedRef.current) return;
            const message = uploadError instanceof Error ? uploadError.message : 'Unable to upload this file.';
            setFiles(current => current.map(item => (
              item.id === file.id ? { ...item, status: 'failed', progress: 0, error: message } : item
            )));
            setError('Some files could not be uploaded. They are still available below and can be retried.');
          })
          .finally(() => {
            activeUploadsRef.current.delete(file.id);
            uploadControllersRef.current.delete(file.id);
          });
      });
  }, [collectionId, files]);

  React.useEffect(() => {
    if (!pending) return;
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [pending]);

  function addFiles(fileList: FileList | File[]) {
    const selected = Array.from(fileList).filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
    if (selected.length === 0) {
      setError('Choose image or video files to upload.');
      return;
    }

    const now = Date.now();
    setError('');
    const added = selected.map((file, index): UploadFile => {
      const isVideo = file.type.startsWith('video/');
      const preview = URL.createObjectURL(file);
      return {
        id: `queue-${now}-${index}-${file.lastModified}`,
        file,
        name: file.webkitRelativePath || file.name,
        sizeMB: Number((file.size / (1024 * 1024)).toFixed(1)),
        thumb: preview || fallbackThumb,
        type: isVideo ? 'video' : 'photo',
        progress: 0,
        status: 'checking',
        targetSetId: setId,
        error: '',
        checksum: '',
        allowDuplicate: false,
        resolvingDuplicate: false,
      };
    });
    setFiles(current => [...added, ...current]);
    void prepareFiles(added);
  }

  async function prepareFiles(added: UploadFile[]) {
    const addedIds = new Set(added.map(file => file.id));
    const seen = new Map<string, UploadFile>();
    filesRef.current
      .filter(file => !addedIds.has(file.id) && file.status !== 'failed' && file.status !== 'checking')
      .forEach(file => seen.set(duplicateKey(file), file));

    for (let offset = 0; offset < added.length; offset += DUPLICATE_CHECK_BATCH_SIZE) {
      const batch = added.slice(offset, offset + DUPLICATE_CHECK_BATCH_SIZE);
      const fingerprinted = await mapWithConcurrency(batch, MAX_CONCURRENT_UPLOADS, async file => ({
        ...file,
        checksum: await createFileFingerprint(file.file).catch(() => ''),
      }));
      if (!mountedRef.current) return;

      let serverMatches = new Map<string, DuplicateMedia | null>();
      try {
        serverMatches = await checkUploadDuplicates({
          collectionId,
          files: fingerprinted.map(file => ({ clientId: file.id, file: file.file, checksum: file.checksum })),
        });
      } catch {
        // The post-upload duplicate check remains as a safety net if preflight is unavailable.
      }
      if (!mountedRef.current) return;

      const prepared = fingerprinted.map(file => {
        const key = duplicateKey(file);
        const localMatch = seen.get(key);
        const serverMatch = serverMatches.get(file.id) ?? null;
        if (!localMatch) seen.set(key, file);
        return {
          ...file,
          status: serverMatch || localMatch ? 'skipped' as const : 'queued' as const,
          duplicateOf: serverMatch ?? undefined,
          localDuplicateName: localMatch?.name,
        };
      });
      const preparedById = new Map(prepared.map(file => [file.id, file]));
      setFiles(current => current.map(file => preparedById.get(file.id) ?? file));
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = '';
  }

  function removeQueued(id: string) {
    setFiles(current => current.filter(file => {
      const keep = file.id !== id || file.status === 'uploading' || file.status === 'done';
      if (!keep) URL.revokeObjectURL(file.thumb);
      return keep;
    }));
  }

  function retryFile(id: string) {
    setError('');
    setFiles(current => current.map(file => (
      file.id === id ? { ...file, status: 'queued', progress: 0, error: '' } : file
    )));
  }

  function retryAllFailed() {
    setError('');
    setFiles(current => current.map(file => (
      file.status === 'failed' ? { ...file, status: 'queued', progress: 0, error: '' } : file
    )));
  }

  function uploadSkippedDuplicate(file: UploadFile) {
    setFiles(current => current.map(item => (
      item.id === file.id
        ? { ...item, status: 'queued', allowDuplicate: true, error: '' }
        : item
    )));
  }

  function keepDuplicate(file: UploadFile) {
    if (!file.media || file.resolvingDuplicate) return;
    setFiles(current => current.map(item => (
      item.id === file.id
        ? { ...item, status: 'done', duplicateOf: undefined, resolvingDuplicate: false }
        : item
    )));
    onCompleteRef.current?.([file.media]);
  }

  async function removeDuplicate(file: UploadFile) {
    if (!file.media || file.resolvingDuplicate) return;
    setFiles(current => current.map(item => (
      item.id === file.id ? { ...item, resolvingDuplicate: true } : item
    )));
    try {
      await deleteMedia(file.media.id);
      URL.revokeObjectURL(file.thumb);
      setFiles(current => current.filter(item => item.id !== file.id));
    } catch (removeError) {
      const message = removeError instanceof Error ? removeError.message : 'Unable to remove the duplicate.';
      setFiles(current => current.map(item => (
        item.id === file.id ? { ...item, resolvingDuplicate: false, error: message } : item
      )));
      setError(message);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*"
        multiple
        onChange={handleInputChange}
      />
      <input
        ref={folderInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*"
        multiple
        onChange={handleInputChange}
      />

      <div
        className={cn(
          'border-2 border-dashed rounded-md p-12 text-center bg-surface transition-colors',
          over ? 'border-ink bg-panel' : 'border-line-2',
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          addFiles(event.dataTransfer.files);
        }}
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-panel grid place-items-center mb-4 text-ink-2"><Upload size={22}/></div>
        <h3 className="serif text-2xl">Drop photos &amp; videos here</h3>
        <div className="text-sm text-muted mb-4">JPG, PNG, WEBP, MP4, MOV. Keep this page open until every file is uploaded.</div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button type="button" onClick={() => fileInputRef.current?.click()}><Upload size={14}/>Browse files</Button>
          <Button type="button" variant="ghost" onClick={() => folderInputRef.current?.click()}><FolderUp size={14}/>Select folder</Button>
        </div>
      </div>

      {error && (
        <div role="alert" className="rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="mono text-[11px] tracking-wider text-muted">
          {uploaded} OF {total} UPLOADED &middot; {skipped} SKIPPED &middot; {uploading} IN PROGRESS &middot; {queued + checking} QUEUED
        </div>
        {allDone ? <div className="mono text-[11px] tracking-wider text-ok">ALL DONE</div> : null}
      </div>
      <Progress value={overallProgress}/>

      {skipped > 0 ? (
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm text-amber-700">
          {skipped} duplicate{skipped === 1 ? '' : 's'} skipped before upload. Review or upload anyway below.
        </div>
      ) : null}

      {duplicates > 0 ? (
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-3 py-2 text-sm text-amber-700">
          {duplicates} duplicate{duplicates === 1 ? '' : 's'} uploaded. Review whether to keep or remove below.
        </div>
      ) : null}

      {failed > 0 ? (
        <div className="flex items-center justify-between gap-3 rounded-md border border-danger/30 bg-danger/5 px-3 py-2">
          <span className="text-sm text-danger">{failed} file{failed === 1 ? '' : 's'} failed and will not be lost while this page remains open.</span>
          <Button type="button" size="sm" variant="outline" onClick={retryAllFailed}>
            <RefreshCw size={13}/>Retry failed
          </Button>
        </div>
      ) : null}

      {files.length > 0 ? (
        <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto scrollbar-thin">
          {files.map(file => (
            <div key={file.id} className={cn('grid grid-cols-[40px_minmax(0,1fr)_120px_70px_28px] gap-3 items-center px-3.5 py-2.5 bg-surface border border-line rounded-lg text-[12.5px]', file.status === 'done' && 'opacity-90')}>
              <div className="relative h-9 w-9 overflow-hidden rounded bg-panel">
                {file.type === 'video' ? (
                  <>
                    <video src={file.thumb} className="h-full w-full object-cover" muted playsInline preload="metadata"/>
                    <Play size={10} className="absolute inset-0 m-auto text-bg drop-shadow"/>
                  </>
                ) : (
                  <img src={file.thumb} className="h-full w-full object-cover" alt=""/>
                )}
              </div>
              <div className="min-w-0">
                <div className="mono text-xs truncate">{file.name}</div>
                <div className="mono text-[10.5px] text-muted mt-0.5">{file.sizeMB.toFixed(1)} MB</div>
                {file.status === 'duplicate' || file.status === 'skipped' ? (
                  <div className="mt-0.5 truncate text-[10.5px] text-amber-700">
                    Matches {file.duplicateOf?.display_filename || file.duplicateOf?.original_filename || file.localDuplicateName || 'an existing file'}
                  </div>
                ) : null}
                {file.error ? <div className="mt-0.5 truncate text-[10.5px] text-danger" title={file.error}>{file.error}</div> : null}
              </div>
              <Progress value={file.status === 'skipped' ? 100 : file.progress} className="h-1" barClassName={file.status === 'done' ? 'bg-ok' : file.status === 'failed' ? 'bg-danger' : file.status === 'skipped' ? 'bg-amber-500' : ''}/>
              <div className={cn('mono text-[10.5px] tracking-wider', file.status === 'done' ? 'text-ok' : file.status === 'failed' ? 'text-danger' : file.status === 'duplicate' || file.status === 'skipped' ? 'text-amber-700' : 'text-muted')}>
                {file.status === 'done' ? 'READY' : file.status === 'failed' ? 'FAILED' : file.status === 'duplicate' ? 'DUPLICATE' : file.status === 'skipped' ? 'SKIPPED' : file.status === 'checking' ? 'CHECKING' : file.status === 'uploading' ? Math.round(file.progress) + '%' : 'QUEUED'}
              </div>
              {file.status === 'failed' ? (
                <button type="button" className="text-danger hover:text-ink" onClick={() => retryFile(file.id)} aria-label={`Retry ${file.name}`}>
                  <RefreshCw size={13}/>
                </button>
              ) : file.status === 'duplicate' || file.status === 'skipped' ? (
                <AlertTriangle size={14} className="text-amber-600" aria-label={`${file.name} is a duplicate`}/>
              ) : file.status === 'done' ? (
                <Check size={13} className="text-ok" aria-label={`${file.name} uploaded`}/>
              ) : (
                <button
                  type="button"
                  className="text-muted hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={file.status === 'uploading'}
                  onClick={() => removeQueued(file.id)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X size={13}/>
                </button>
              )}
              {file.status === 'duplicate' ? (
                <div className="col-span-5 flex flex-wrap items-center justify-between gap-2 border-t border-amber-500/20 pt-2">
                  <span className="text-[11px] text-amber-800">This upload is safely stored. Choose what to do with the new copy.</span>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={file.resolvingDuplicate}
                      onClick={() => removeDuplicate(file)}
                    >
                      <X size={12}/>{file.resolvingDuplicate ? 'Removing...' : 'Remove'}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={file.resolvingDuplicate}
                      onClick={() => keepDuplicate(file)}
                    >
                      <Check size={12}/>Keep
                    </Button>
                  </div>
                </div>
              ) : null}
              {file.status === 'skipped' ? (
                <div className="col-span-5 flex flex-wrap items-center justify-between gap-2 border-t border-amber-500/20 pt-2">
                  <span className="text-[11px] text-amber-800">Skipped before transfer, so no upload bandwidth or storage was used.</span>
                  <div className="flex items-center gap-2">
                    <Button type="button" size="sm" variant="ghost" onClick={() => removeQueued(file.id)}>
                      <X size={12}/>Remove from queue
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => uploadSkippedDuplicate(file)}>
                      <Upload size={12}/>Upload anyway
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-line bg-surface px-4 py-5 text-center text-sm text-muted">
          No files selected yet.
        </div>
      )}
    </div>
  );
}
