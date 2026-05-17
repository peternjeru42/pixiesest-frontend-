'use client';

import Link from 'next/link';
import * as React from 'react';
import { ArrowLeft } from 'lucide-react';
import { requestPasswordReset } from '@/lib/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PasswordResetRequestForm() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await requestPasswordReset(email);
      setStatus(response.detail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send reset instructions.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="reset-email">Email</Label>
        <Input
          id="reset-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      {status && <p className="text-sm leading-6 text-muted">{status}</p>}
      {error && <p className="text-sm leading-6 text-danger">{error}</p>}
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send reset link'}
      </Button>
      <Link href="/login" className="text-sm text-muted inline-flex items-center gap-1.5 justify-center mt-2 hover:text-ink">
        <ArrowLeft size={13} />Back to sign in
      </Link>
    </form>
  );
}
