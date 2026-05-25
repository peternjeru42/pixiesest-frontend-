'use client';

import * as React from 'react';
import { Film, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Media } from '@/lib/types';

function videoFrameUrl(url?: string) {
  if (!url) return '';
  if (url.includes('#t=')) return url;
  return `${url}#t=0.1`;
}

function durationLabel(seconds?: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds ?? 0));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, '0')}`;
}

export function VideoPreview({
  item,
  className,
  fit = 'cover',
  showDuration = true,
  badgePosition = 'top-right',
}: {
  item: Media;
  className?: string;
  fit?: 'cover' | 'contain';
  showDuration?: boolean;
  badgePosition?: 'top-left' | 'top-right' | 'center';
}) {
  const [frameReady, setFrameReady] = React.useState(false);
  const poster = item.thumb && item.thumb !== item.playbackUrl ? item.thumb : '';
  const previewSource = videoFrameUrl(item.playbackUrl || item.src);

  React.useEffect(() => {
    setFrameReady(false);
  }, [previewSource]);

  return (
    <div className={cn('relative h-full w-full overflow-hidden bg-panel', className)}>
      {!poster && (
        <div className="absolute inset-0 grid place-items-center text-muted">
          <Film size={24}/>
        </div>
      )}
      {poster ? (
        <img src={poster} alt="" loading="lazy" className={cn('h-full w-full', fit === 'cover' ? 'object-cover' : 'object-contain')}/>
      ) : previewSource ? (
        <video
          src={previewSource}
          preload="metadata"
          muted
          playsInline
          disablePictureInPicture
          controls={false}
          aria-hidden="true"
          onLoadedData={() => setFrameReady(true)}
          className={cn(
            'video-preview-frame relative h-full w-full transition-opacity',
            fit === 'cover' ? 'object-cover' : 'object-contain',
            frameReady ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-muted">
          <Film size={24}/>
        </div>
      )}
      <span className={cn(
        'pointer-events-none absolute inline-flex items-center gap-1 rounded bg-ink/60 px-1.5 py-0.5 text-bg',
        badgePosition === 'top-left' && 'left-2 top-2',
        badgePosition === 'top-right' && 'right-2 top-2',
        badgePosition === 'center' && 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
      )}>
        <Play size={badgePosition === 'center' ? 14 : 10}/>
        {showDuration && <span className="mono text-[9.5px]">{durationLabel(item.durationSec)}</span>}
      </span>
    </div>
  );
}
