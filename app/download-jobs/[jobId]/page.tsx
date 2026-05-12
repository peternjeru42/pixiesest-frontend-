'use client';
import * as React from 'react';
import Link from 'next/link';
import { Check, Download, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Stage = 'preparing' | 'ready' | 'expired' | 'failed';

export default function DownloadJobPage({ params }: { params: { jobId: string } }) {
  const initialStage: Stage =
    params.jobId === 'expired' ? 'expired' :
    params.jobId === 'failed' ? 'failed' :
    params.jobId === 'ready' ? 'ready' : 'preparing';
  const [stage, setStage] = React.useState<Stage>(initialStage);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (stage !== 'preparing') return;
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setStage('ready'); return 100; }
        return p + 1.5 + Math.random() * 4;
      });
    }, 200);
    return () => clearInterval(iv);
  }, [stage]);

  return (
    <div className="min-h-screen bg-bg text-ink grid place-items-center px-6">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="serif text-2xl inline-flex items-center gap-2 mb-12">
          <span className="w-7 h-7 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">L</span>
          Lumen
        </Link>
        {stage === 'preparing' && (
          <>
            <div className="eyebrow mb-3">Preparing your archive</div>
            <h1 className="serif text-4xl font-medium mb-2">Packaging your photos</h1>
            <p className="text-muted mb-7">This usually takes 30–60 seconds for large galleries.</p>
            <Progress value={progress} className="mb-2"/>
            <div className="mono text-xs text-muted">{Math.round(progress)}% · ~{Math.max(1, Math.round((100-progress)/3))}s remaining</div>
          </>
        )}
        {stage === 'ready' && (
          <>
            <div className="w-16 h-16 rounded-full bg-accent-soft text-accent grid place-items-center mx-auto mb-6"><Check size={28}/></div>
            <h1 className="serif text-4xl font-medium mb-2">Ready to download</h1>
            <p className="text-muted mb-1">Amelia-James-Originals.zip</p>
            <p className="mono text-[10.5px] uppercase tracking-wider text-muted mb-7">1.21 GB · 412 photos · expires in 7 days</p>
            <Button size="lg" className="w-full"><Download size={15}/>Download ZIP</Button>
          </>
        )}
        {stage === 'expired' && (
          <>
            <div className="w-16 h-16 rounded-full bg-panel text-muted grid place-items-center mx-auto mb-6"><AlertCircle size={28}/></div>
            <h1 className="serif text-4xl font-medium mb-2">This link has expired</h1>
            <p className="text-muted mb-7">Download links expire after 7 days. Ask your photographer for a fresh link.</p>
            <Button asChild variant="outline"><Link href="/galleries/amelia-james">Open gallery instead</Link></Button>
          </>
        )}
        {stage === 'failed' && (
          <>
            <div className="w-16 h-16 rounded-full bg-panel text-danger grid place-items-center mx-auto mb-6"><AlertCircle size={28}/></div>
            <h1 className="serif text-4xl font-medium mb-2">Something went wrong</h1>
            <p className="text-muted mb-7">We couldn't prepare your archive. Retry or contact your photographer.</p>
            <Button size="lg" className="w-full" onClick={() => { setStage('preparing'); setProgress(0); }}>Retry</Button>
          </>
        )}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted mt-10 hover:text-ink"><ArrowLeft size={11}/>Back to studio</Link>
      </div>
    </div>
  );
}
