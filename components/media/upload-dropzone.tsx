'use client';
import * as React from 'react';
import { Check, FolderUp, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { addUploadedMedia } from '@/lib/api/media';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

interface UploadFile {
  id: string;
  file: File;
  name: string;
  sizeMB: number;
  thumb: string;
  progress: number;
  status: 'queued' | 'uploading' | 'done' | 'failed';
  committed: boolean;
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
  const committingRef = React.useRef(false);
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const [over, setOver] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    folderInputRef.current?.setAttribute('webkitdirectory', '');
    folderInputRef.current?.setAttribute('directory', '');
  }, []);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setFiles(current => current.map(file => {
        if (file.status === 'done' || file.status === 'failed') return file;
        if (file.status === 'queued') return { ...file, status: 'uploading', progress: Math.max(file.progress, 4) };

        const next = file.progress + 10 + Math.random() * 18;
        if (next >= 100) return { ...file, progress: 100, status: 'done' };
        return { ...file, progress: next };
      }));
    }, 240);

    return () => window.clearInterval(interval);
  }, []);

  const total = files.length;
  const done = files.filter(file => file.status === 'done').length;
  const uploading = files.filter(file => file.status === 'uploading').length;
  const allDone = total > 0 && done === total;

  React.useEffect(() => {
    const uncommitted = files.filter(file => file.status === 'done' && !file.committed);
    if (!allDone || uncommitted.length === 0 || committingRef.current) return;

    committingRef.current = true;
    setError('');
    addUploadedMedia({
      collectionId,
      setId,
      files: uncommitted.map(file => file.file),
    })
      .then(media => {
        setFiles(current => current.map(file => (
          uncommitted.some(doneFile => doneFile.id === file.id) ? { ...file, committed: true } : file
        )));
        onComplete?.(media);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Unable to finish upload.');
        setFiles(current => current.map(file => (
          uncommitted.some(doneFile => doneFile.id === file.id) ? { ...file, status: 'failed' } : file
        )));
      })
      .finally(() => {
        committingRef.current = false;
      });
  }, [allDone, collectionId, files, onComplete, setId]);

  function addFiles(fileList: FileList | File[]) {
    const selected = Array.from(fileList).filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
    if (selected.length === 0) {
      setError('Choose image or video files to upload.');
      return;
    }

    const now = Date.now();
    setError('');
    setFiles(current => [
      ...selected.map((file, index): UploadFile => {
        const isImage = file.type.startsWith('image/');
        const preview = isImage ? URL.createObjectURL(file) : fallbackThumb;
        return {
          id: `queue-${now}-${index}`,
          file,
          name: file.webkitRelativePath || file.name,
          sizeMB: Number((file.size / (1024 * 1024)).toFixed(1)),
          thumb: preview,
          progress: 0,
          status: 'queued',
          committed: false,
        };
      }),
      ...current,
    ]);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addFiles(event.target.files);
    event.target.value = '';
  }

  function removeQueued(id: string) {
    setFiles(current => current.filter(file => file.id !== id || file.status === 'done'));
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
        <div className="text-sm text-muted mb-4">JPG, PNG, WEBP, MP4, MOV. Originals are represented in this local workspace.</div>
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
          {done} OF {total} UPLOADED &middot; {uploading} IN PROGRESS
        </div>
        {allDone && <div className="mono text-[11px] tracking-wider text-ok">ALL DONE</div>}
      </div>
      <Progress value={total ? (done / total) * 100 : 0}/>

      {files.length > 0 ? (
        <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto scrollbar-thin">
          {files.map(file => (
            <div key={file.id} className={cn('grid grid-cols-[40px_1fr_120px_64px_24px] gap-3 items-center px-3.5 py-2.5 bg-surface border border-line rounded-lg text-[12.5px]', file.status === 'done' && 'opacity-90')}>
              <img src={file.thumb} className="w-9 h-9 rounded object-cover" alt=""/>
              <div className="min-w-0">
                <div className="mono text-xs truncate">{file.name}</div>
                <div className="mono text-[10.5px] text-muted mt-0.5">{file.sizeMB.toFixed(1)} MB</div>
              </div>
              <Progress value={file.progress} className="h-1" barClassName={file.status === 'done' ? 'bg-ok' : file.status === 'failed' ? 'bg-danger' : ''}/>
              <div className={cn('mono text-[10.5px] tracking-wider', file.status === 'done' ? 'text-ok' : file.status === 'failed' ? 'text-danger' : 'text-muted')}>
                {file.status === 'done' ? 'READY' : file.status === 'failed' ? 'FAILED' : file.status === 'uploading' ? Math.round(file.progress) + '%' : 'QUEUED'}
              </div>
              <button type="button" className="text-muted hover:text-ink" onClick={() => removeQueued(file.id)} aria-label={`Remove ${file.name}`}>
                {file.status === 'done' ? <Check size={13}/> : <X size={13}/>}
              </button>
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
