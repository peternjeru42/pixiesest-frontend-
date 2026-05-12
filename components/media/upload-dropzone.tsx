'use client';
import * as React from 'react';
import { Upload, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { unsplash } from '@/lib/utils';

interface UploadFile { id: string; name: string; sizeMB: number; thumb: string; progress: number; status: 'queued' | 'uploading' | 'done' | 'failed'; }

export function UploadDropzone({ onComplete }: { onComplete?: () => void }) {
  const [files, setFiles] = React.useState<UploadFile[]>(() => initialFiles());
  const [over, setOver] = React.useState(false);

  React.useEffect(() => {
    const iv = setInterval(() => {
      setFiles(arr => arr.map(f => {
        if (f.status === 'done' || f.status === 'failed') return f;
        if (f.status === 'queued' && Math.random() < 0.2) return { ...f, status: 'uploading', progress: 2 };
        if (f.status === 'uploading') {
          const next = f.progress + 4 + Math.random() * 12;
          if (next >= 100) return { ...f, progress: 100, status: 'done' };
          return { ...f, progress: next };
        }
        return f;
      }));
    }, 220);
    return () => clearInterval(iv);
  }, []);

  const total = files.length;
  const done = files.filter(f => f.status === 'done').length;
  const allDone = done === total;
  React.useEffect(() => { if (allDone) onComplete?.(); }, [allDone, onComplete]);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          'border-2 border-dashed rounded-md p-12 text-center bg-surface transition-colors',
          over ? 'border-ink bg-panel' : 'border-line-2',
        )}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); }}
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-panel grid place-items-center mb-4 text-ink-2"><Upload size={22}/></div>
        <h3 className="serif text-2xl">Drop photos &amp; videos here</h3>
        <div className="text-sm text-muted mb-4">RAW, JPG, PNG, MP4, MOV · Originals are preserved.</div>
        <div className="flex gap-2 justify-center">
          <Button>Browse files</Button>
          <Button variant="ghost">Select folder</Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="mono text-[11px] tracking-wider text-muted">
          {done} OF {total} UPLOADED · {files.filter(f => f.status === 'uploading').length} IN PROGRESS
        </div>
        {allDone && <div className="mono text-[11px] tracking-wider text-ok">ALL DONE</div>}
      </div>
      <Progress value={(done / total) * 100}/>

      <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto scrollbar-thin">
        {files.map(f => (
          <div key={f.id} className={cn('grid grid-cols-[40px_1fr_120px_64px_24px] gap-3 items-center px-3.5 py-2.5 bg-surface border border-line rounded-lg text-[12.5px]', f.status === 'done' && 'opacity-90')}>
            <img src={f.thumb} className="w-9 h-9 rounded object-cover" alt=""/>
            <div>
              <div className="mono text-xs">{f.name}</div>
              <div className="mono text-[10.5px] text-muted mt-0.5">{f.sizeMB.toFixed(1)} MB</div>
            </div>
            <Progress value={f.progress} className="h-1" barClassName={f.status === 'done' ? 'bg-ok' : ''}/>
            <div className={cn('mono text-[10.5px] tracking-wider', f.status === 'done' ? 'text-ok' : 'text-muted')}>
              {f.status === 'done' ? 'READY' : f.status === 'uploading' ? Math.round(f.progress) + '%' : 'QUEUED'}
            </div>
            <button className="text-muted hover:text-ink">
              {f.status === 'done' ? <Check size={13}/> : <X size={13}/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function initialFiles(): UploadFile[] {
  const ids = ['photo-1519741497674-611481863552','photo-1465495976277-4387d4b0b4c6','photo-1606490194859-07c18c9f0968','photo-1511795409834-ef04bbd61622','photo-1525772764200-be829a350797','photo-1583939003579-730e3918a45a'];
  return ids.map((p, i) => ({
    id: 'u' + i,
    name: `IMG_${4823 + i}.CR3`,
    sizeMB: 28 + Math.random() * 18,
    thumb: unsplash(p, 200),
    progress: i < 2 ? 100 : i < 4 ? 30 + Math.random() * 40 : 0,
    status: i < 2 ? 'done' : i < 4 ? 'uploading' : 'queued',
  }));
}
