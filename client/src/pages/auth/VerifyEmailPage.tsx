import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const VerifyEmailPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface font-hanken text-on-surface flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 flex items-center justify-center px-gutter">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-xl shadow-xs space-y-space-md text-center">
          <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">mark_email_read</span>
          </div>

          <div className="space-y-space-xs">
            <h1 className="font-headline-md text-headline-md text-primary font-bold">Check your inbox</h1>
            <p className="font-body-sm text-on-surface-variant">
              We have sent a verification link to your email address. Click the link to verify your account and continue.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface-variant space-y-1">
            <p className="font-semibold text-on-surface">Didn't receive the email?</p>
            <p>Check your spam folder or request a new verification link below.</p>
          </div>

          <button
            onClick={() => alert('Verification email resent')}
            className="w-full h-11 rounded-lg bg-surface-container border border-outline-variant text-primary font-label-md hover:bg-surface-container-high transition-all font-semibold"
          >
            Resend Verification Email
          </button>

          <div className="pt-space-xs text-sm">
            <Link to="/" className="text-primary font-bold hover:underline">
              Return to Home Page
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
