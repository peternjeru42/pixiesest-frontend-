'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertCircle, Check, CreditCard, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  cancelSubscription,
  getBillingSummary,
  getPaymentMethodLink,
  listBillingPlans,
  resumeSubscription,
  startCheckout,
  type BillingPlan,
  type BillingSummary,
} from '@/lib/api/billing';
import { cn } from '@/lib/utils';

const PLAN_SLUGS = new Set(['basic', 'plus', 'pro']);

export function BillingDashboard() {
  const searchParams = useSearchParams();
  const requestedPlan = searchParams.get('plan');
  const [summary, setSummary] = React.useState<BillingSummary | null>(null);
  const [plans, setPlans] = React.useState<BillingPlan[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [pendingAction, setPendingAction] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState(searchParams.get('checkout') === 'cancelled' ? 'Checkout was cancelled. Your current plan is unchanged.' : '');
  const [error, setError] = React.useState('');

  const load = React.useCallback(async () => {
    setError('');
    try {
      const [nextSummary, nextPlans] = await Promise.all([getBillingSummary(), listBillingPlans()]);
      setSummary(nextSummary);
      setPlans(nextPlans);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Billing details could not be loaded.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  async function checkout(plan: BillingPlan) {
    setPendingAction(plan.slug);
    setError('');
    setMessage('');
    try {
      const result = await startCheckout(plan.slug);
      window.location.assign(result.authorization_url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Checkout could not be started.');
      setPendingAction(null);
    }
  }

  async function cancel() {
    if (!window.confirm('Cancel renewal? Your existing files will stay in your account. New uploads may be blocked if you are over the free 5 GB limit.')) return;
    setPendingAction('cancel');
    setError('');
    try {
      const result = await cancelSubscription();
      setMessage(result.detail);
      await load();
    } catch (cancelError) {
      setError(cancelError instanceof Error ? cancelError.message : 'The subscription could not be cancelled.');
    } finally {
      setPendingAction(null);
    }
  }

  async function resume() {
    setPendingAction('resume');
    setError('');
    try {
      const result = await resumeSubscription();
      setMessage(result.detail);
      await load();
    } catch (resumeError) {
      setError(resumeError instanceof Error ? resumeError.message : 'The subscription could not be resumed.');
    } finally {
      setPendingAction(null);
    }
  }

  async function updatePaymentMethod() {
    setPendingAction('payment-method');
    setError('');
    try {
      const result = await getPaymentMethodLink();
      window.location.assign(result.link);
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : 'The payment-method page could not be opened.');
      setPendingAction(null);
    }
  }

  if (loading) {
    return <div className="flex min-h-64 items-center justify-center text-sm text-muted"><Loader2 className="mr-2 animate-spin" size={17} />Loading billing…</div>;
  }

  if (!summary) {
    return <Notice tone="error">{error || 'Billing details are unavailable.'}</Notice>;
  }

  const usagePercent = summary.quota.storage_limit_bytes > 0
    ? Math.min((summary.quota.storage_used_bytes / summary.quota.storage_limit_bytes) * 100, 100)
    : 0;
  const subscription = summary.subscription;
  const isNonRenewing = subscription?.status === 'non_renewing' || subscription?.cancel_at_period_end;

  return (
    <div className="space-y-7">
      {error ? <Notice tone="error">{error}</Notice> : null}
      {message ? <Notice tone="success">{message}</Notice> : null}
      {requestedPlan && PLAN_SLUGS.has(requestedPlan) && summary.current_plan.slug !== requestedPlan ? (
        <Notice tone="info">Your {capitalize(requestedPlan)} plan is selected below. Continue to Paystack when you are ready.</Notice>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-xl border border-line bg-surface p-6">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="eyebrow mb-2">Current plan</div>
              <div className="flex items-center gap-3">
                <h2 className="serif text-3xl">{summary.current_plan.name}</h2>
                <Status status={subscription?.status ?? 'active'} label={subscription ? undefined : 'Free'} />
              </div>
              <p className="mt-2 text-sm text-muted">
                {summary.current_plan.amount_minor === 0
                  ? 'No recurring payment.'
                  : `$${summary.current_plan.price} USD billed monthly.`}
              </p>
              {subscription?.next_payment_at ? (
                <p className="mt-1 text-sm text-muted">Next payment: {formatDate(subscription.next_payment_at)}</p>
              ) : null}
              {subscription?.grace_period_ends_at ? (
                <p className="mt-2 text-sm font-medium text-danger">Payment failed. Update your card by {formatDate(subscription.grace_period_ends_at)} to keep this plan.</p>
              ) : null}
            </div>
            {subscription ? (
              <div className="flex flex-wrap gap-2">
                <Button onClick={updatePaymentMethod} disabled={pendingAction !== null}>
                  <CreditCard size={14} />{pendingAction === 'payment-method' ? 'Opening…' : 'Update card'}
                </Button>
                {isNonRenewing ? (
                  <Button onClick={resume} disabled={pendingAction !== null}>{pendingAction === 'resume' ? 'Resuming…' : 'Resume renewal'}</Button>
                ) : (
                  <Button variant="danger" onClick={cancel} disabled={pendingAction !== null}>{pendingAction === 'cancel' ? 'Cancelling…' : 'Cancel renewal'}</Button>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface p-6">
          <div className="eyebrow mb-2">Storage</div>
          <div className="serif text-2xl">{formatBytes(summary.quota.storage_used_bytes)} of {formatBytes(summary.quota.storage_limit_bytes)}</div>
          <Progress value={usagePercent} className="mt-4" />
          <p className="mt-3 text-xs text-muted">{formatBytes(summary.quota.storage_remaining_bytes)} available</p>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="serif text-2xl">Choose a plan</h2>
          <p className="mt-1 text-sm text-muted">Plan changes start immediately after payment. Existing files are never deleted when a plan ends.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const current = plan.slug === summary.current_plan.slug;
            const selected = requestedPlan === plan.slug;
            return (
              <article key={plan.slug} className={cn('flex flex-col rounded-xl border bg-surface p-5', selected ? 'border-ink ring-1 ring-ink' : 'border-line')}>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold">{plan.name}</h3>
                  {current ? <span className="rounded-full bg-panel px-2 py-1 mono text-[9px] uppercase tracking-wider">Current</span> : null}
                </div>
                <div className="mt-5"><span className="serif text-4xl">${Number(plan.price).toFixed(0)}</span><span className="text-xs text-muted"> / month</span></div>
                <p className="mt-2 text-sm font-medium">{plan.storage_gb.toLocaleString()} GB storage</p>
                <ul className="my-5 flex-1 space-y-2.5 border-t border-line pt-4">
                  {plan.features.map((feature) => <li key={feature} className="flex gap-2 text-xs leading-5 text-ink-2"><Check className="mt-0.5 shrink-0 text-accent" size={13} /><span>{feature}</span></li>)}
                </ul>
                {plan.amount_minor === 0 ? (
                  <Button disabled className="w-full">{current ? 'Current plan' : 'Available after cancellation'}</Button>
                ) : (
                  <Button
                    variant={selected ? 'default' : 'outline'}
                    className="w-full"
                    disabled={current || pendingAction !== null}
                    onClick={() => checkout(plan)}
                  >
                    {pendingAction === plan.slug ? <><Loader2 className="animate-spin" size={14} />Opening Paystack…</> : current ? 'Current plan' : `Choose ${plan.name}`}
                  </Button>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="serif mb-4 text-2xl">Payment history</h2>
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          {summary.transactions.length ? summary.transactions.map((item) => (
            <div key={item.id} className="grid gap-2 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6">
              <div><div className="text-sm font-medium">{item.plan_name}</div><div className="mt-1 mono text-[10px] text-muted">{item.reference}</div></div>
              <div className="text-sm">${(item.expected_amount_minor / 100).toFixed(2)} {item.currency}</div>
              <div className="flex items-center justify-between gap-3 sm:justify-end"><Status status={item.status} /><span className="text-xs text-muted">{formatDate(item.paid_at ?? item.created_at)}</span></div>
            </div>
          )) : <div className="px-5 py-8 text-center text-sm text-muted">No payments yet.</div>}
        </div>
      </section>

      <p className="flex items-start gap-2 text-xs leading-5 text-muted"><ExternalLink className="mt-0.5 shrink-0" size={12} />Card details are collected and stored by Paystack. Droptop never receives your full card number.</p>
    </div>
  );
}

function Notice({ children, tone }: { children: React.ReactNode; tone: 'error' | 'success' | 'info' }) {
  return <div className={cn('flex items-start gap-2 rounded-lg border px-4 py-3 text-sm', tone === 'error' ? 'border-danger/30 bg-danger/5 text-danger' : tone === 'success' ? 'border-green-700/20 bg-green-700/5 text-green-800' : 'border-accent/20 bg-accent/5 text-ink-2')}><AlertCircle className="mt-0.5 shrink-0" size={15} />{children}</div>;
}

function Status({ status, label }: { status: string; label?: string }) {
  const positive = ['active', 'success'].includes(status);
  return <span className={cn('rounded-full px-2 py-1 mono text-[9px] uppercase tracking-wider', positive ? 'bg-green-700/10 text-green-800' : status === 'failed' || status === 'past_due' ? 'bg-danger/10 text-danger' : 'bg-panel text-muted')}>{label ?? status.replace('_', ' ')}</span>;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

function formatBytes(bytes: number) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value >= 10 || exponent === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[exponent]}`;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
