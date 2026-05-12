'use client';
import * as React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CoverImagePicker({ value, onChange }: { value?: string; onChange?: (url: string) => void }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 h-24 rounded-md bg-panel border border-line overflow-hidden">
        {value
          ? <img src={value} alt="" className="w-full h-full object-cover"/>
          : <div className="w-full h-full grid place-items-center text-muted text-xs">No cover</div>}
      </div>
      <div className="flex flex-col gap-2">
        <Button size="sm"><Upload size={12}/>Replace cover</Button>
        <Button size="sm" variant="ghost">Choose from gallery</Button>
      </div>
    </div>
  );
}
