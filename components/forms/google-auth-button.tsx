'use client';

import * as React from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import * as api from '@/lib/api';

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleButtonText = 'signin_with' | 'signup_with' | 'continue_with';

type GoogleAuthButtonProps = {
  text: GoogleButtonText;
  onError: (message: string) => void;
  onLoadingChange: (loading: boolean) => void;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
            auto_select?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              text?: GoogleButtonText;
              width?: number;
            }
          ) => void;
          cancel: () => void;
        };
      };
    };
  }
}

export function GoogleAuthButton({ text, onError, onLoadingChange }: GoogleAuthButtonProps) {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = React.useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleCredential = React.useCallback(
    async (response: GoogleCredentialResponse) => {
      if (!response.credential) {
        onError('Google did not return a sign-in credential.');
        return;
      }

      onLoadingChange(true);
      onError('');

      try {
        await api.googleAuth(response.credential);
        router.push('/dashboard');
      } catch (error) {
        onError(error instanceof Error ? error.message : 'Google authentication failed');
        onLoadingChange(false);
      }
    },
    [onError, onLoadingChange, router]
  );

  React.useEffect(() => {
    if (!scriptReady || !clientId || !containerRef.current || !window.google?.accounts?.id) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = '';

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredential,
      auto_select: false,
    });

    const buttonWidth = Math.min(Math.max(container.offsetWidth || 320, 240), 400);

    window.google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'large',
      shape: 'rectangular',
      text,
      width: buttonWidth,
    });

    return () => {
      window.google?.accounts.id.cancel();
    };
  }, [clientId, handleCredential, scriptReady, text]);

  if (!clientId) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex h-11 w-full items-center justify-center rounded-[4px] border border-[#d8d1c4] bg-white text-sm font-semibold text-[#7a7265]"
      >
        Google auth is not configured
      </button>
    );
  }

  return (
    <>
      <Script
        id="google-identity-services"
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="min-h-11 w-full [&>div]:mx-auto" />
    </>
  );
}
