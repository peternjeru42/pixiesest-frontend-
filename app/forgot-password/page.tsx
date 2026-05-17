import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AuthLayout } from '@/components/layout/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPage() {
  return (
    <AuthLayout image="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1400&q=80">
      <div className="flex items-center gap-2.5 mb-9">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">D</span>
        <span className="serif text-2xl">Droptop</span>
      </div>
      <h1 className="serif text-4xl font-medium tracking-tight mb-1.5">Reset password</h1>
      <div className="text-muted mb-7">We&apos;ll email you a reset link.</div>
      <form className="flex flex-col gap-4" action="/verify-email">
        <div className="flex flex-col gap-1.5">
          <Label>Email</Label>
          <Input type="email" required/>
        </div>
        <Button size="lg">Send reset link</Button>
        <Link href="/login" className="text-sm text-muted inline-flex items-center gap-1.5 justify-center mt-2 hover:text-ink">
          <ArrowLeft size={13}/>Back to sign in
        </Link>
      </form>
    </AuthLayout>
  );
}
