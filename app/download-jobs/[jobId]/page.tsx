'use client';
import * as React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getPublicDownloadJob, getPublicDownloadJobSignedUrl, type PublicDownloadJob } from '@/lib/api/public-gallery';
import { formatBytes } from '@/lib/utils';

type Stage = 'preparing' | 'ready' | 'expired' | 'failed';

export default function DownloadJobPage({ params }: { params: { jobId: string } }) {
  const isDemoJob = params.jobId === 'expired' || params.jobId === 'failed' || params.jobId === 'ready';
  const initialStage: Stage =
    params.jobId === 'expired' ? 'expired' :
    params.jobId === 'failed' ? 'failed' :
    params.jobId === 'ready' ? 'ready' : 'preparing';
  const [stage, setStage] = React.useState<Stage>(initialStage);
  const [progress, setProgress] = React.useState(0);
  const [job, setJob] = React.useState<PublicDownloadJob | null>(null);
  const [error, setError] = React.useState('');
  const [downloading, setDownloading] = React.useState(false);

  React.useEffect(() => {
    if (isDemoJob) return;

    let active = true;
    async function loadJob() {
      try {
        const nextJob = await getPublicDownloadJob(params.jobId);
        if (!active) return;
        setJob(nextJob);
        setError('');
        setStage(
          nextJob.status === 'completed' ? 'ready' :
          nextJob.status === 'failed' ? 'failed' :
          nextJob.status === 'expired' ? 'expired' :
          'preparing',
        );
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unable to load this download job.');
        setStage('failed');
      }
    }

    loadJob();
    const interval = window.setInterval(loadJob, 2500);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [isDemoJob, params.jobId]);

  React.useEffect(() => {
    if (stage !== 'preparing') return;
    const iv = window.setInterval(() => {
      setProgress(current => {
        if (current >= 95 && !isDemoJob) return 95;
        if (current >= 100) {
          window.clearInterval(iv);
          setStage('ready');
          return 100;
        }
        return current + 1.5 + Math.random() * 4;
      });
    }, 200);
    return () => window.clearInterval(iv);
  }, [isDemoJob, stage]);

  async function downloadZip() {
    if (isDemoJob) return;

    setDownloading(true);
    setError('');
    try {
      const url = await getPublicDownloadJobSignedUrl(params.jobId);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'gallery-originals.zip';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to download this ZIP.');
    } finally {
      setDownloading(false);
    }
  }

  const fileLabel = job?.type === 'gallery_original_zip' ? 'Gallery originals.zip' : 'Gallery download.zip';
  const fileMeta = [
    job?.fileSizeBytes ? formatBytes(job.fileSizeBytes) : null,
    job?.expiresAt ? `expires ${new Date(job.expiresAt).toLocaleDateString()}` : null,
  ].filter(Boolean).join(' - ');

  return (
    <div className="min-h-screen bg-bg text-ink grid place-items-center px-6">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="serif text-2xl inline-flex items-center gap-2 mb-12">
          <span className="w-7 h-7 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">D</span>
          Droptop
        </Link>
        {stage === 'preparing' && (
          <>
            <div className="eyebrow mb-3">Preparing your archive</div>
            <h1 className="serif text-4xl font-medium mb-2">Packaging your photos</h1>
            <p className="text-muted mb-7">This usually takes 30-60 seconds for large galleries.</p>
            <Progress value={progress} className="mb-2"/>
            <div className="mono text-xs text-muted">{Math.round(progress)}%</div>
          </>
        )}
        {stage === 'ready' && (
          <>
            <div className="w-16 h-16 rounded-full bg-accent-soft text-accent grid place-items-center mx-auto mb-6"><Check size={28}/></div>
            <h1 className="serif text-4xl font-medium mb-2">Ready to download</h1>
            <p className="text-muted mb-1">{isDemoJob ? 'Amelia-James-Originals.zip' : fileLabel}</p>
            <p className="mono text-[10.5px] uppercase tracking-wider text-muted mb-7">{isDemoJob ? '1.21 GB - 412 photos - expires in 7 days' : fileMeta || 'Original ZIP'}</p>
            {error && (
              <div role="alert" className="mb-4 rounded-md border border-danger/30 bg-danger/5 px-3 py-2 text-sm text-danger">
                {error}
              </div>
            )}
            <Button size="lg" className="w-full" onClick={downloadZip} disabled={downloading}>
              <Download size={15}/>{downloading ? 'Opening...' : 'Download ZIP'}
            </Button>
          </>
        )}
        {stage === 'expired' && (
          <>
            <div className="w-16 h-16 rounded-full bg-panel text-muted grid place-items-center mx-auto mb-6"><AlertCircle size={28}/></div>
            <h1 className="serif text-4xl font-medium mb-2">This link has expired</h1>
            <p className="text-muted mb-7">Download links expire after 7 days. Ask your photographer for a fresh link.</p>
            <Button asChild variant="outline"><Link href="/">Open gallery instead</Link></Button>
          </>
        )}
        {stage === 'failed' && (
          <>
            <div className="w-16 h-16 rounded-full bg-panel text-danger grid place-items-center mx-auto mb-6"><AlertCircle size={28}/></div>
            <h1 className="serif text-4xl font-medium mb-2">Something went wrong</h1>
            <p className="text-muted mb-7">{error || "We couldn't prepare your archive. Retry or contact your photographer."}</p>
            <Button size="lg" className="w-full" onClick={() => { setStage('preparing'); setProgress(0); }}>Retry</Button>
          </>
        )}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted mt-10 hover:text-ink"><ArrowLeft size={11}/>Back to studio</Link>
      </div>
    </div>
  );
}
