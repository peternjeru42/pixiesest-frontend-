'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verifyPayment } from '@/lib/api/billing';

export function PaymentCallback() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') ?? searchParams.get('trxref');
  const [state, setState] = React.useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = React.useState('Verifying your payment with Paystack…');

  React.useEffect(() => {
    if (!reference) {
      setState('error');
      setMessage('The payment reference is missing. Your plan has not been changed.');
      return;
    }
    let active = true;
    verifyPayment(reference)
      .then((result) => {
        if (!active) return;
        setState('success');
        setMessage(result.detail);
      })
      .catch((error) => {
        if (!active) return;
        setState('error');
        setMessage(error instanceof Error ? error.message : 'Payment verification failed.');
      });
    return () => { active = false; };
  }, [reference]);

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center px-5 py-16">
      <div className="w-full rounded-2xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-panel">
          {state === 'loading' ? <Loader2 className="animate-spin" size={24} /> : state === 'success' ? <CheckCircle2 className="text-green-700" size={26} /> : <XCircle className="text-danger" size={26} />}
        </div>
        <p className="eyebrow mb-3">Paystack checkout</p>
        <h1 className="serif text-4xl">{state === 'loading' ? 'Confirming payment' : state === 'success' ? 'Your plan is active' : 'We could not confirm payment'}</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">{message}</p>
        {state !== 'loading' ? <Button asChild size="lg" className="mt-8"><Link href="/dashboard/billing">Return to billing</Link></Button> : null}
      </div>
    </div>
  );
}
