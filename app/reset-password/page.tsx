import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout/auth-layout';
import { PasswordResetForm } from '@/components/forms/password-reset-form';

export default function ResetPasswordPage() {
  return (
    <AuthLayout image="https://images.unsplash.com/photo-1606490194859-07c18c9f0968?auto=format&fit=crop&w=1400&q=80">
      <div className="flex items-center gap-2.5 mb-9">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">D</span>
        <span className="serif text-2xl">Droptop</span>
      </div>
      <h1 className="serif text-4xl font-medium tracking-tight mb-1.5">Set a new password</h1>
      <div className="text-muted mb-7">Pick something memorable.</div>
      <Suspense fallback={<div className="text-sm text-muted">Loading reset form...</div>}>
        <PasswordResetForm />
      </Suspense>
    </AuthLayout>
  );
}
