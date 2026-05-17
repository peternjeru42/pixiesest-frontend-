import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { AuthLayout } from '@/components/layout/auth-layout';
import { Button } from '@/components/ui/button';

export default function VerifyPage() {
  return (
    <AuthLayout image="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=80">
      <div className="flex items-center gap-2.5 mb-9">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-ink text-bg serif italic text-base">L</span>
        <span className="serif text-2xl">Droptop</span>
      </div>
      <div className="w-14 h-14 grid place-items-center rounded-full bg-accent-soft text-accent mb-5">
        <Mail size={22}/>
      </div>
      <h1 className="serif text-4xl font-medium tracking-tight mb-1.5">Check your inbox</h1>
      <div className="text-muted mb-7">We sent a verification link to <b className="text-ink">mara@droptop.studio</b>. Click it to continue.</div>
      <Button size="lg" variant="outline" className="w-full">Resend email</Button>
      <Link href="/login" className="text-sm text-muted inline-flex items-center gap-1.5 justify-center mt-5 hover:text-ink">
        <ArrowLeft size={13}/>Back to sign in
      </Link>
    </AuthLayout>
  );
}
