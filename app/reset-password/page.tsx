import Link from 'next/link';
import { AuthLayout } from '@/components/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  return (
    <AuthLayout image="https://images.unsplash.com/photo-1606490194859-07c18c9f0968?auto=format&fit=crop&w=1400&q=80">
      <div className="flex items-center gap-2.5 mb-9">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">L</span>
        <span className="serif text-2xl">Lumen</span>
      </div>
      <h1 className="serif text-4xl font-medium tracking-tight mb-1.5">Set a new password</h1>
      <div className="text-muted mb-7">Pick something memorable.</div>
      <form className="flex flex-col gap-4" action="/login">
        <div className="flex flex-col gap-1.5"><Label>New password</Label><Input type="password" required/></div>
        <div className="flex flex-col gap-1.5"><Label>Confirm password</Label><Input type="password" required/></div>
        <Button size="lg">Reset password</Button>
        <div className="text-sm text-muted text-center mt-1"><Link href="/login" className="text-ink underline">Back to sign in</Link></div>
      </form>
    </AuthLayout>
  );
}