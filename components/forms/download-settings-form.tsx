'use client';
import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FormSwitch } from './privacy-settings-form';
import type { Collection } from '@/lib/types';

export function DownloadSettingsForm({ collection }: { collection: Collection }) {
  const [orig, setOrig] = React.useState(true);
  const [web, setWeb] = React.useState(true);
  const [high, setHigh] = React.useState(true);
  const [video, setVideo] = React.useState(true);
  const [single, setSingle] = React.useState(true);
  const [full, setFull] = React.useState(true);
  const [favs, setFavs] = React.useState(true);

  return (
    <div className="flex flex-col gap-5">
      <FormSwitch label="Original photos" sub="Full-resolution downloads."  checked={orig} onCheckedChange={setOrig}/>
      <FormSwitch label="Web-size photos" sub="Long edge 2048 px."          checked={web}  onCheckedChange={setWeb}/>
      <FormSwitch label="High-res photos" sub="Long edge 4096 px."          checked={high} onCheckedChange={setHigh}/>
      <FormSwitch label="Videos"                                            checked={video} onCheckedChange={setVideo}/>
      <FormSwitch label="Single photo download"                             checked={single} onCheckedChange={setSingle}/>
      <FormSwitch label="Full gallery ZIP"      sub="Generates on demand."  checked={full} onCheckedChange={setFull}/>
      <FormSwitch label="Favorites ZIP"                                     checked={favs} onCheckedChange={setFavs}/>
      <FormSwitch label="Require PIN"           sub="4-digit PIN before download."  checked disabled onCheckedChange={() => {}}/>
      <div className="ml-11 flex flex-col gap-1.5 -mt-2">
        <Label>Download PIN</Label>
        <Input className="max-w-[140px]" value={collection.downloadPin} readOnly/>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <div className="flex flex-col gap-1.5">
          <Label>Web size (px)</Label>
          <Input defaultValue="2048"/>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>High-res size (px)</Label>
          <Input defaultValue="4096"/>
        </div>
      </div>
      <div className="flex justify-end pt-3 border-t border-line">
        <Button variant="default">Save changes</Button>
      </div>
    </div>
  );
}
