'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RegisterInput } from '@/lib/api/auth';
import { getPendingRegistration, resendVerification, verifySignupCode } from '@/lib/api/auth';

export function SignupVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = React.useState<RegisterInput | null>(null);
  const [code, setCode] = React.useState('');
  const [status, setStatus] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const email = pending?.email ?? searchParams.get('email') ?? '';

  React.useEffect(() => {
    const stored = getPendingRegistration();
    setPending(stored);
    if (!stored) setError('Signup details are missing. Start signup again.');
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus(null);

    if (!pending) {
      setError('Signup details are missing. Start signup again.');
      return;
    }

    setIsSubmitting(true);
    try {
      await verifySignupCode(code, pending);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to verify this code.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!email) return;
    setError(null);
    setStatus(null);
    setIsResending(true);
    try {
      const response = await resendVerification(email);
      setStatus(response.detail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send a new code.');
    } finally {
      setIsResending(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="text-muted">
        Enter the 6-digit code sent to <b className="text-ink">{email || 'your email'}</b>. It expires in 5 minutes.
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="signup-code">Verification code</Label>
        <Input
          id="signup-code"
          autoFocus
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
          className="text-center text-2xl tracking-[0.45em]"
          required
        />
      </div>
      {status && <p className="text-sm leading-6 text-muted">{status}</p>}
      {error && <p className="text-sm leading-6 text-danger">{error}</p>}
      <Button type="submit" size="lg" disabled={isSubmitting || code.length !== 6 || !pending}>
        {isSubmitting ? 'Verifying...' : 'Complete signup'}
      </Button>
      <Button type="button" size="lg" variant="outline" disabled={isResending || !email} onClick={handleResend}>
        {isResending ? 'Sending...' : 'Resend code'}
      </Button>
      <Link href="/register" className="text-sm text-muted inline-flex items-center gap-1.5 justify-center mt-2 hover:text-ink">
        <ArrowLeft size={13}/>Back to signup
      </Link>
    </form>
  );
}
