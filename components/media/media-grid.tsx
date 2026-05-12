'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { MediaTile } from '@/components/data-display/media-card';
import type { Media } from '@/lib/types';

export function MediaGrid({ media, onOpen, onToggleFavorite, density = 'regular', selectable, selected, onToggleSelect }: {
  media: Media[];
  onOpen?: (index: number) => void;
  onToggleFavorite?: (id: string) => void;
  density?: 'compact' | 'regular' | 'comfy';
  selectable?: boolean;
  selected?: Set<string>;
  onToggleSelect?: (id: string) => void;
}) {
  const gap = density === 'compact' ? 'gap-1' : density === 'comfy' ? 'gap-3' : 'gap-2';
  const cols = density === 'compact'
    ? 'grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8'
    : density === 'comfy'
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
  return (
    <div className={cn('grid', cols, gap)}>
      {media.map((m, i) => (
        <MediaTile
          key={m.id}
          m={m}
          onClick={() => onOpen?.(i)}
          selected={selected?.has(m.id)}
          anySelected={selectable && (selected?.size ?? 0) > 0}
          onToggleSelect={selectable ? () => onToggleSelect?.(m.id) : undefined}
          onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(m.id) : undefined}
        />
      ))}
    </div>
  );
}
