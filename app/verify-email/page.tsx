import { Suspense } from 'react';
import { Mail } from 'lucide-react';
import { AuthLayout } from '@/components/layout/auth-layout';
import { SignupVerificationForm } from '@/components/forms/signup-verification-form';

export default function VerifyPage() {
  return (
    <AuthLayout image="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80">
      <div className="flex items-center gap-2.5 mb-9">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">D</span>
        <span className="serif text-2xl">Droptop</span>
      </div>
      <div className="w-14 h-14 grid place-items-center rounded-full bg-accent-soft text-accent mb-5">
        <Mail size={22}/>
      </div>
      <h1 className="serif text-4xl font-medium tracking-tight mb-1.5">Verify your email</h1>
      <div className="text-muted mb-7">Enter the code to finish creating your account.</div>
      <Suspense fallback={<div className="text-sm text-muted">Loading verification form...</div>}>
        <SignupVerificationForm />
      </Suspense>
    </AuthLayout>
  );
}
