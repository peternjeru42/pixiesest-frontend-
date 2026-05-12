'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormSwitch } from './privacy-settings-form';
import { cn } from '@/lib/utils';

export function DesignSettingsForm() {
  const [theme, setTheme] = React.useState('editorial');
  const [layout, setLayout] = React.useState('vertical');
  const [cover, setCover] = React.useState('full-bleed');
  const [grid, setGrid] = React.useState('standard');
  const [font, setFont] = React.useState('Cormorant');
  const [primary, setPrimary] = React.useState('#c4a47a');
  const [showFilenames, setShowFilenames] = React.useState(false);
  const [showCount, setShowCount] = React.useState(true);

  return (
    <div className="grid lg:grid-cols-2 gap-7">
      <div className="flex flex-col gap-5">
        <Seg label="Theme"          value={theme}  onChange={setTheme}  options={['editorial', 'minimal', 'dark']}/>
        <Seg label="Layout"         value={layout} onChange={setLayout} options={['vertical', 'horizontal', 'masonry']}/>
        <Seg label="Cover style"    value={cover}  onChange={setCover}  options={['full-bleed', 'centered', 'split']}/>
        <Seg label="Grid density"   value={grid}   onChange={setGrid}   options={['loose', 'standard', 'dense']}/>
        <Seg label="Font family"    value={font}   onChange={setFont}   options={['Cormorant', 'Instrument', 'DM Serif']}/>
        <div className="flex flex-col gap-2">
          <Label>Primary color</Label>
          <div className="flex gap-2">
            {['#c4a47a', '#1a1816', '#7a8a6b', '#cb6e4a', '#9b8acc'].map(c => (
              <button key={c} onClick={() => setPrimary(c)} className={cn('w-9 h-9 rounded-full border-2', primary === c ? 'border-ink' : 'border-line')} style={{ background: c }}/>
            ))}
          </div>
        </div>
        <FormSwitch label="Show filenames"   checked={showFilenames} onCheckedChange={setShowFilenames}/>
        <FormSwitch label="Show media count" checked={showCount}     onCheckedChange={setShowCount}/>
        <div className="flex justify-end pt-3 border-t border-line">
          <Button variant="default">Save design</Button>
        </div>
      </div>
      <div className="bg-panel rounded-md p-5 sticky top-24 h-fit">
        <div className="eyebrow mb-3">Live preview</div>
        <div className="aspect-[4/3] bg-bg border border-line rounded-md overflow-hidden">
          <div className="h-2/3 bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1606490194859-07c18c9f0968?auto=format&fit=crop&w=1200&q=80)' }}/>
          <div className="p-4">
            <div className="serif text-xl">Amelia &amp; James</div>
            <div className="mono text-[10px] tracking-wider text-muted mt-1">MAY 4, 2026 · {grid.toUpperCase()} GRID · {theme.toUpperCase()} THEME</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Seg<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: T[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="inline-flex bg-surface border border-line rounded-lg p-0.5 w-fit">
        {options.map(o => (
          <button key={o} onClick={() => onChange(o)} className={cn(
            'px-2.5 py-1 text-xs rounded-md capitalize',
            value === o ? 'bg-panel text-ink font-medium' : 'text-muted hover:text-ink',
          )}>{o}</button>
        ))}
      </div>
    </div>
  );
}
