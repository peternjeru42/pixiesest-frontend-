import { Suspense } from 'react';
import { PaymentCallback } from '@/components/billing/payment-callback';

export default function BillingCallbackPage() {
  return <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-muted">Loading payment result…</div>}><PaymentCallback /></Suspense>;
}
