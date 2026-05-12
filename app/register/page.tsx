import { AuthLayout } from '@/components/layout/auth-layout';
import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
  return (
    <AuthLayout image="https://images.unsplash.com/photo-1525772764200-be829a350797?auto=format&fit=crop&w=1400&q=80">
      <div className="flex items-center gap-2.5 mb-9">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">L</span>
        <span className="serif text-2xl">Lumen</span>
      </div>
      <h1 className="serif text-4xl font-medium tracking-tight mb-1.5">Create your studio</h1>
      <div className="text-muted mb-7">Try Lumen free for 14 days.</div>
      <RegisterForm/>
    </AuthLayout>
  );
}