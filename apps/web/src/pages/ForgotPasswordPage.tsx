import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col justify-between">
      <header className="w-full py-space-lg px-gutter flex items-center justify-between max-w-[1360px] mx-auto">
        <Link to="/" className="flex items-center gap-space-sm">
          <div className="h-8 w-8 rounded-md bg-primary-container flex items-center justify-center text-on-primary font-bold text-lg">
            B
          </div>
          <span className="font-title-md text-title-md text-primary font-bold tracking-tight">
            BambiFound
          </span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-gutter-sm py-space-lg w-full max-w-md mx-auto">
        <div className="w-full p-space-xl rounded-xl bg-surface-container-lowest shadow-md border border-outline-variant/30 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center mx-auto mb-space-md">
            <span className="material-symbols-outlined text-[32px]">lock_reset</span>
          </div>

          <h1 className="font-headline-md text-headline-md text-primary font-bold mb-space-xs">
            Forgot Password
          </h1>
          <p className="font-body-sm text-body-sm text-secondary mb-space-lg">
            Enter your registered email address and we'll send you link to reset your password.
          </p>

          {isSubmitted ? (
            <div className="p-space-md rounded-lg bg-primary-fixed/30 text-primary font-body-md text-left space-y-2">
              <p className="font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>Recovery Link Sent</span>
              </p>
              <p className="text-body-sm text-on-surface-variant">
                If an account exists for <strong>{email}</strong>, check your email inbox for password reset instructions.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-space-md text-left">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">
                  Recovery Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@domain.com"
                  className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-md"
              >
                Send Password Reset Link
              </button>
            </form>
          )}

          <p className="text-body-sm text-secondary mt-space-md">
            Remember password?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>

      <footer className="py-space-md text-center text-xs text-secondary">
        © 2025 BambiFound Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
};
