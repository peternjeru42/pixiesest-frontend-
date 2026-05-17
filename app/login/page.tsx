import Link from 'next/link';
import { AuthLayout } from '@/components/layout/auth-layout';
import { LoginForm } from '@/components/forms/login-form';

type LoginPageProps = {
  searchParams?: {
    google?: string;
    next?: string;
  };
};

function getSafeRedirectPath(path?: string) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return '/dashboard';
  }

  return path;
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const initialMessage =
    searchParams?.google === 'existing'
      ? 'That Google account already exists. Continue with Google to sign in.'
      : '';
  const redirectTo = getSafeRedirectPath(searchParams?.next);

  return (
    <AuthLayout
      image="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80"
      eyebrow="Client gallery workspace"
      title="Deliver beautiful galleries without slowing the studio down."
      text="Access collections, favorites, print orders and client delivery tools from one calm account area."
    >
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#786f61]">Log in</p>
      <h1 className="font-display text-5xl font-medium leading-none tracking-normal">Log in to Droptop</h1>
      <p className="mt-3 text-sm leading-6 text-[#625c52]">
        Do not have an account?{' '}
        <Link href="/register" className="font-semibold text-[#171512] underline underline-offset-4">
          Sign up
        </Link>
      </p>
      <LoginForm initialMessage={initialMessage} redirectTo={redirectTo} />
    </AuthLayout>
  );
}
