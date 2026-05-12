'use client';
import * as React from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Download, Info, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

export function MediaLightbox({ items, index, onClose, onIndex, onToggleFavorite, allowFavorite = true, allowDownload = true }: {
  items: Media[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  onToggleFavorite?: (id: string) => void;
  allowFavorite?: boolean;
  allowDownload?: boolean;
}) {
  const cur = items[index];
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onIndex(Math.max(0, index - 1));
      if (e.key === 'ArrowRight') onIndex(Math.min(items.length - 1, index + 1));
      if (e.key.toLowerCase() === 'f' && cur && allowFavorite) onToggleFavorite?.(cur.id);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [index, items.length, cur, allowFavorite, onClose, onIndex, onToggleFavorite]);

  if (!cur) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/95 text-bg grid grid-rows-[56px_1fr_84px] animate-in fade-in-0">
      <div className="flex items-center justify-between px-5 border-b border-bg/10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <LbButton onClick={onClose}><X size={14}/></LbButton>
          <div className="mono text-[11.5px] tracking-wider">{cur.filename} <span className="opacity-50 ml-1.5">· {index + 1} / {items.length}</span></div>
        </div>
        <div className="flex gap-2">
          {allowFavorite && (
            <LbButton onClick={() => onToggleFavorite?.(cur.id)} className={cn(cur.faved && 'bg-bg text-rose-500 border-bg')}>
              <Heart size={14} fill={cur.faved ? 'currentColor' : 'none'}/>
            </LbButton>
          )}
          {allowDownload && <LbButton><Download size={14}/></LbButton>}
          <LbButton><Info size={14}/></LbButton>
        </div>
      </div>
      <div className="grid place-items-center relative p-6 min-h-0" onClick={onClose}>
        <img src={cur.src} alt="" className="max-w-full max-h-full object-contain shadow-deep" onClick={(e) => e.stopPropagation()}/>
        <button onClick={(e) => { e.stopPropagation(); onIndex(Math.max(0, index - 1)); }}
          disabled={index === 0}
          className="absolute top-1/2 -translate-y-1/2 left-5 w-11 h-11 rounded-full bg-bg/[0.06] border border-bg/15 grid place-items-center hover:bg-bg/15 disabled:opacity-30">
          <ChevronLeft size={18}/>
        </button>
        <button onClick={(e) => { e.stopPropagation(); onIndex(Math.min(items.length - 1, index + 1)); }}
          disabled={index === items.length - 1}
          className="absolute top-1/2 -translate-y-1/2 right-5 w-11 h-11 rounded-full bg-bg/[0.06] border border-bg/15 grid place-items-center hover:bg-bg/15 disabled:opacity-30">
          <ChevronRight size={18}/>
        </button>
      </div>
      <div className="flex gap-1 px-5 py-3 overflow-x-auto items-center border-t border-bg/10" onClick={(e) => e.stopPropagation()}>
        {items.map((m, i) => (
          <button key={m.id} onClick={() => onIndex(i)} className={cn(
            'w-12 h-12 shrink-0 rounded overflow-hidden relative',
            i === index ? 'opacity-100 outline outline-[1.5px] outline-bg outline-offset-[2px]' : 'opacity-50 hover:opacity-90',
          )}>
            <img src={m.thumb} alt="" className="w-full h-full object-cover"/>
            {m.type === 'video' && <Play size={10} className="absolute inset-0 m-auto"/>}
          </button>
        ))}
      </div>
    </div>
  );
}

function LbButton({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={cn('h-9 w-9 rounded-full bg-bg/[0.06] border border-bg/12 grid place-items-center hover:bg-bg/15', className)}>
      {children}
    </button>
  );
}
