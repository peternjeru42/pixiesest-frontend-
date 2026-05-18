'use client';
import * as React from 'react';
import { AlertCircle, Check, Download, Heart, Image as ImageIcon, Loader2, Lock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

export function MediaTile({ m, onClick, selected, onToggleSelect, onToggleFavorite, onDownload, anySelected }: {
  m: Media;
  onClick?: () => void;
  selected?: boolean;
  onToggleSelect?: () => void;
  onToggleFavorite?: () => void;
  onDownload?: () => void;
  anySelected?: boolean;
}) {
  const hasImage = Boolean(m.thumb || m.src);
  const isProcessing = m.status === 'processing' || m.status === 'uploading';
  const isFailed = m.status === 'failed';

  return (
    <div
      onClick={() => (anySelected && onToggleSelect ? onToggleSelect() : onClick?.())}
      className={cn(
        'group relative aspect-square overflow-hidden bg-panel rounded-sm cursor-pointer',
        selected && 'outline outline-[3px] -outline-offset-[3px] outline-ink',
      )}
    >
      {hasImage ? (
        <img src={m.thumb || m.src} alt="" loading="lazy" className="w-full h-full object-cover"/>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-panel px-3 text-center text-muted">
          {isFailed ? (
            <AlertCircle size={22} className="text-danger"/>
          ) : isProcessing ? (
            <Loader2 size={22} className="animate-spin text-muted"/>
          ) : (
            <ImageIcon size={22}/>
          )}
          <span className="mono text-[10px] uppercase tracking-wider">
            {isFailed ? 'Failed' : isProcessing ? 'Processing' : 'No preview'}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onToggleSelect?.(); }}
        className={cn(
          'absolute top-2 left-2 h-5 w-5 rounded-full grid place-items-center border-[1.5px] transition-opacity',
          selected ? 'bg-ink border-ink text-bg opacity-100' : 'bg-bg/85 border-bg/95 opacity-0 group-hover:opacity-100',
        )}
      >{selected && <Check size={11} strokeWidth={3}/>}</button>
      {m.type === 'video' && (
        <span className="absolute top-2 right-2 mono text-[9.5px] bg-ink/55 text-bg px-1.5 py-0.5 rounded inline-flex items-center gap-1">
          <Play size={8}/>{Math.floor((m.durationSec ?? 0) / 60)}:{String((m.durationSec ?? 0) % 60).padStart(2, '0')}
        </span>
      )}
      {m.private && (
        <span className="absolute top-2 right-2 mono text-[9.5px] bg-ink/55 text-bg px-1.5 py-0.5 rounded inline-flex items-center gap-1" style={{ top: m.type === 'video' ? 26 : 8 }}>
          <Lock size={9}/>
        </span>
      )}
      {(onDownload || onToggleFavorite) && (
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          {onDownload && (
            <button
              type="button"
              aria-label={`Download ${m.filename}`}
              onClick={(e) => { e.stopPropagation(); onDownload(); }}
              className="grid h-8 w-8 place-items-center rounded-full bg-ink/70 text-bg opacity-0 transition-opacity hover:bg-ink group-hover:opacity-100 focus:opacity-100"
            >
              <Download size={15}/>
            </button>
          )}
          {onToggleFavorite && (
            <button
              type="button"
              aria-label={m.faved ? `Remove ${m.filename} from favourites` : `Add ${m.filename} to favourites`}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
              className={cn(
                'grid h-8 w-8 place-items-center rounded-full bg-ink/70 transition-opacity hover:bg-ink',
                m.faved ? 'opacity-100 text-rose-400' : 'opacity-0 group-hover:opacity-100 text-bg focus:opacity-100',
              )}
            >
              <Heart size={18} fill={m.faved ? 'currentColor' : 'none'}/>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
