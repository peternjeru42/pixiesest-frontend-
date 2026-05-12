import Link from 'next/link';
import { AuthLayout } from '@/components/layout/auth-layout';
import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
      quote={{ text: 'Lumen finally makes delivering wedding galleries feel like a finished print, not a folder.', cite: 'Studio Aster · Featured photographer' }}
    >
      <div className="flex items-center gap-2.5 mb-9">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">L</span>
        <span className="serif text-2xl">Lumen</span>
      </div>
      <h1 className="serif text-4xl font-medium tracking-tight mb-1.5">Welcome back</h1>
      <div className="text-muted mb-7">Sign in to your studio.</div>
      <LoginForm/>
      <div className="mono text-[10.5px] tracking-[0.14em] text-muted text-center mt-12">© 2026 LUMEN STUDIO · <Link href="#">PRIVACY</Link> · <Link href="#">TERMS</Link></div>
    </AuthLayout>
  );
}