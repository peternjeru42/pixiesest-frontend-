'use client';
import * as React from 'react';
import { Play, Lock, Check, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

export function MediaTile({ m, onClick, selected, onToggleSelect, onToggleFavorite, anySelected }: {
  m: Media;
  onClick?: () => void;
  selected?: boolean;
  onToggleSelect?: () => void;
  onToggleFavorite?: () => void;
  anySelected?: boolean;
}) {
  return (
    <div
      onClick={() => (anySelected && onToggleSelect ? onToggleSelect() : onClick?.())}
      className={cn(
        'group relative aspect-square overflow-hidden bg-panel rounded-sm cursor-pointer',
        selected && 'outline outline-[3px] -outline-offset-[3px] outline-ink',
      )}
    >
      <img src={m.thumb} alt="" loading="lazy" className="w-full h-full object-cover"/>
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
      {onToggleFavorite && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className={cn(
            'absolute bottom-2 right-2 transition-opacity',
            m.faved ? 'opacity-100 text-rose-400' : 'opacity-0 group-hover:opacity-100 text-bg',
          )}
        >
          <Heart size={18} fill={m.faved ? 'currentColor' : 'none'}/>
        </button>
      )}
    </div>
  );
}
