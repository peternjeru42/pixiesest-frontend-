'use client';
import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download, Trash2, Image as ImageIcon } from 'lucide-react';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ALL_MEDIA } from '@/lib/mock-data';
import { ActivityTimeline } from '@/components/data-display/activity-timeline';
import { ACTIVITY } from '@/lib/mock-data';

export default function MediaDetailPage({ params }: { params: { mediaId: string } }) {
  const m = ALL_MEDIA.find(x => x.id === params.mediaId);
  const [isPrivate, setPrivate] = React.useState(m?.private ?? false);
  const [downloadable, setDownloadable] = React.useState(m?.downloadable ?? false);

  if (!m) return notFound();

  return (
    <AdminLayout crumbs={[{ label: 'Studio' }, { label: 'Media', href: '/media' }, { label: m.filename }]}>
      <div className="px-6 lg:px-10 py-6 pb-20 max-w-[1500px] mx-auto">
        <Button asChild size="sm" variant="ghost" className="mb-4">
          <Link href="/media"><ArrowLeft size={12}/>Back to media</Link>
        </Button>
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <div className="bg-ink rounded-md aspect-[4/3] grid place-items-center overflow-hidden">
            <img src={m.src} alt="" className="max-w-full max-h-full object-contain"/>
          </div>
          <aside className="flex flex-col gap-6">
            <div>
              <div className="eyebrow">File</div>
              <div className="serif text-2xl mt-1">{m.filename}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <Meta label="Type" value={m.type.toUpperCase()}/>
              <Meta label="Size" value={`${m.sizeMB.toFixed(1)} MB`}/>
              <Meta label="Dimensions" value={`${m.width} × ${m.height}`}/>
              {m.durationSec && <Meta label="Duration" value={`${Math.floor(m.durationSec / 60)}:${String(m.durationSec % 60).padStart(2,'0')}`}/>}
              <Meta label="Status" value={m.status}/>
              <Meta label="Uploaded" value="May 4, 2026"/>
            </div>
            <div className="bg-surface border border-line rounded-md p-4 flex flex-col gap-4">
              <Row label="Private" sub="Hide from public gallery">
                <Switch checked={isPrivate} onCheckedChange={setPrivate}/>
              </Row>
              <Row label="Downloadable" sub="Allow client to download">
                <Switch checked={downloadable} onCheckedChange={setDownloadable}/>
              </Row>
            </div>
            {m.camera && (
              <div className="bg-surface border border-line rounded-md p-4">
                <div className="eyebrow mb-2">Camera</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mono">
                  <Meta inline label="Make" value={m.camera.make}/>
                  <Meta inline label="Model" value={m.camera.model}/>
                  <Meta inline label="Lens" value={m.camera.lens}/>
                  <Meta inline label="ISO" value={String(m.camera.iso)}/>
                  <Meta inline label="Shutter" value={m.camera.shutter}/>
                  <Meta inline label="Aperture" value={m.camera.aperture}/>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button variant="outline"><Download size={14}/>Download</Button>
              <Button variant="outline"><ImageIcon size={14}/>Set cover</Button>
              <Button variant="danger" size="icon"><Trash2 size={14}/></Button>
            </div>
            <div>
              <div className="eyebrow mb-3">Activity</div>
              <ActivityTimeline events={ACTIVITY.slice(0, 4)}/>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}

function Meta({ label, value, inline }: { label: string; value: React.ReactNode; inline?: boolean }) {
  if (inline) return (<><span className="text-muted">{label}</span><span>{value}</span></>);
  return (
    <div>
      <div className="mono text-[10.5px] uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-0.5">{value}</div>
    </div>
  );
}

function Row({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {sub && <div className="text-xs text-muted">{sub}</div>}
      </div>
      {children}
    </div>
  );
}
