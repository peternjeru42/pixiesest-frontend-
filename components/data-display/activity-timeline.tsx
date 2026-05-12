import * as React from 'react';
import { Heart, Download, Eye, MessageSquare, Send, Upload, Mail } from 'lucide-react';
import type { ActivityEvent } from '@/lib/types';

const ICONS: Record<ActivityEvent['type'], any> = {
  favorite: Heart, download: Download, view: Eye, comment: MessageSquare,
  publish: Send, upload: Upload, invite: Mail,
};

export function ActivityTimeline({ events }: { events: ActivityEvent[] }) {
  return (
    <div className="relative flex flex-col">
      <div className="absolute left-[13px] top-2 bottom-2 w-px bg-line"/>
      {events.map(e => {
        const Icon = ICONS[e.type] ?? Eye;
        return (
          <div key={e.id} className="flex gap-3.5 py-2.5 relative">
            <div className="w-7 h-7 rounded-full bg-panel border border-line grid place-items-center text-ink-2 relative z-[1] shrink-0">
              <Icon size={12}/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px]"><span className="font-medium">{e.actor}</span> · {e.note}</div>
              <div className="text-xs text-muted mt-0.5 truncate">{e.target}</div>
            </div>
            <div className="mono text-[10.5px] text-muted shrink-0">{e.time}</div>
          </div>
        );
      })}
    </div>
  );
}
