import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-hanken text-on-surface flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 flex items-center justify-center px-gutter">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-xl shadow-xs space-y-space-md text-center">
          <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">lock_reset</span>
          </div>

          <div className="space-y-space-xs">
            <h1 className="font-headline-md text-headline-md text-primary font-bold">Reset your password</h1>
            <p className="font-body-sm text-on-surface-variant">
              Enter your account email and we'll send you password recovery instructions.
            </p>
          </div>

          {submitted ? (
            <div className="p-space-md rounded-lg bg-secondary-container/50 text-primary space-y-space-xs">
              <p className="font-label-sm font-bold">Recovery link sent!</p>
              <p className="text-xs text-on-surface-variant">
                If an account exists for {email}, you will receive an email shortly with steps to reset your password.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-space-md text-left">
              <div className="space-y-1">
                <label className="block font-label-sm text-on-surface font-semibold">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-11 px-space-md rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-primary-container text-on-primary font-label-md hover:bg-primary transition-all font-semibold"
              >
                Send Reset Link
              </button>
            </form>
          )}

          <div className="pt-space-xs text-sm">
            <Link to="/auth/login" className="text-primary font-bold hover:underline flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
