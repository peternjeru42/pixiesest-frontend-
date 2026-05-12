'use client';
import * as React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FavoriteButton({ faved, onClick, className, size = 18 }: {
  faved: boolean; onClick: () => void; className?: string; size?: number;
}) {
  return (
    <button onClick={onClick} className={cn('grid place-items-center transition-colors', faved ? 'text-rose-500' : 'text-ink-2 hover:text-ink', className)}>
      <Heart size={size} fill={faved ? 'currentColor' : 'none'}/>
    </button>
  );
}
