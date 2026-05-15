'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { logout } from '@/lib/api/auth';
import { cn } from '@/lib/utils';

type LogoutButtonProps = {
  className?: string;
  mobile?: boolean;
  onSignedOut?: () => void;
};

export function LogoutButton({ className, mobile = false, onSignedOut }: LogoutButtonProps) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  async function handleLogout() {
    if (pending) return;

    setPending(true);

    try {
      await logout();
    } finally {
      disableGoogleAutoSelect();
      onSignedOut?.();
      router.replace('/login');
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className={cn(
        mobile
          ? 'flex min-h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-[15px] text-danger transition-colors hover:bg-panel disabled:opacity-60'
          : 'flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-left text-[13.5px] text-danger transition-colors hover:bg-panel disabled:opacity-60',
        className,
      )}
    >
      <span className={cn('grid place-items-center', mobile ? 'h-8 w-8 rounded-md bg-bg' : '')}>
        <LogOut size={mobile ? 17 : 15} strokeWidth={mobile ? 1.7 : 1.6} />
      </span>
      <span>{pending ? 'Signing out...' : 'Log out'}</span>
    </button>
  );
}

function disableGoogleAutoSelect() {
  const google = (window as typeof window & {
    google?: {
      accounts?: {
        id?: {
          disableAutoSelect?: () => void;
        };
      };
    };
  }).google;

  google?.accounts?.id?.disableAutoSelect?.();
}
