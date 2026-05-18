'use client';
import * as React from 'react';
import { getCurrentUser, getStoredAuthUser, type AuthUser } from '@/lib/api/auth';
import { getStoredAccessToken } from '@/lib/api/session';

export function useAuthRole() {
  const [user, setUser] = React.useState<AuthUser | null>(() => getStoredAuthUser());
  const [resolved, setResolved] = React.useState(() => {
    const stored = getStoredAuthUser();
    return Boolean(stored && (typeof stored.is_staff === 'boolean' || typeof stored.is_superuser === 'boolean'));
  });

  React.useEffect(() => {
    const token = getStoredAccessToken();
    if (!token) {
      setResolved(true);
      return;
    }

    let mounted = true;
    getCurrentUser(token)
      .then(nextUser => {
        if (mounted) setUser(nextUser);
      })
      .catch(() => {
        // Keep the stored user if the profile refresh fails; nav should not block the app.
      })
      .finally(() => {
        if (mounted) setResolved(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return {
    isAdmin: Boolean(user?.is_staff || user?.is_superuser),
    resolved,
  };
}
