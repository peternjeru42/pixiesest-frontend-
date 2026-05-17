import { AuthLayout } from '@/components/layout/auth-layout';
import { PasswordResetRequestForm } from '@/components/forms/password-reset-request-form';

export default function ForgotPage() {
  return (
    <AuthLayout image="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=80">
      <div className="flex items-center gap-2.5 mb-9">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">D</span>
        <span className="serif text-2xl">Droptop</span>
      </div>
      <h1 className="serif text-4xl font-medium tracking-tight mb-1.5">Reset password</h1>
      <div className="text-muted mb-7">We&apos;ll email you a reset link that expires in 1 hour.</div>
      <PasswordResetRequestForm />
    </AuthLayout>
  );
}
