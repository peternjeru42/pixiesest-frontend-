import Link from 'next/link';
import { AuthLayout } from '@/components/layout/auth-layout';
import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1525772764200-be829a350797?auto=format&fit=crop&w=1400&q=80"
      eyebrow="Start free"
      title="Create a studio account built around gallery delivery."
      text="Launch your first collections, organize clients and keep the business side close to the work."
    >
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#786f61]">Sign up</p>
      <h1 className="font-display text-5xl font-medium leading-none tracking-normal">Create your Droptop account</h1>
      <p className="mt-3 text-sm leading-6 text-[#625c52]">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#171512] underline underline-offset-4">
          Log in
        </Link>
      </p>
      <RegisterForm />
    </AuthLayout>
  );
}
