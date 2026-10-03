import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        return;
      }
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between font-body-md text-on-surface antialiased">
      <Navbar />

      <main className="flex-1 w-full pt-24 pb-16 flex items-center justify-center px-margin relative overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-[460px] mx-auto flex flex-col items-center">
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-[0_12px_28px_-6px_rgba(20,40,29,0.06),0_2px_6px_rgba(20,40,29,0.02)] border border-outline-variant/40 text-center">

            {status === 'loading' && (
              <div className="space-y-space-md py-space-md">
                <div className="w-12 h-12 rounded-full bg-surface-container-low text-primary mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px] animate-spin">progress_activity</span>
                </div>
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Verifying email</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Please wait while we confirm your email verification link...
                  </p>
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-space-md py-space-md">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">task_alt</span>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-tint text-primary-container font-label-sm text-label-sm mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Account Activated
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Email Verified!</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Your BambiFound account is now verified. You are ready to complete your founder onboarding and start matching with builders.
                  </p>
                </div>
                <div className="pt-space-sm space-y-space-sm">
                  <Link
                    to="/onboarding"
                    className="w-full py-3 bg-primary-container text-on-primary hover:bg-primary font-headline-sm text-headline-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-space-sm active:scale-[0.98]"
                  >
                    <span>Proceed to Founder Onboarding</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="w-full py-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg flex items-center justify-center transition-colors"
                  >
                    Go directly to Dashboard
                  </Link>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-space-md py-space-md">
                <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">link_off</span>
                </div>
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Verification Failed</h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    This email verification link is invalid or has expired. Please request a new link or log in to resend.
                  </p>
                </div>
                <div className="pt-space-sm space-y-space-sm">
                  <Link
                    to="/auth/login"
                    className="w-full py-3 bg-primary-container text-on-primary hover:bg-primary font-headline-sm text-headline-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-space-sm active:scale-[0.98]"
                  >
                    <span>Return to Log In</span>
                    <span className="material-symbols-outlined text-[18px]">west</span>
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
