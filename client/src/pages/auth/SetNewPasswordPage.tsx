import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const SetNewPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setError(null);
    setSubmitted(true);
    setTimeout(() => {
      navigate('/auth/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-surface font-hanken text-on-surface flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 flex items-center justify-center px-gutter">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-xl shadow-xs space-y-space-md text-center">
          <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">key</span>
          </div>

          <div className="space-y-space-xs">
            <h1 className="font-headline-md text-headline-md text-primary font-bold">Set new password</h1>
            <p className="font-body-sm text-on-surface-variant">Your new password must be at least 8 characters long.</p>
          </div>

          {error && (
            <div className="p-space-sm rounded-lg bg-error-container text-on-error-container text-sm">
              {error}
            </div>
          )}

          {submitted ? (
            <div className="p-space-md rounded-lg bg-secondary-container/50 text-primary space-y-space-xs">
              <p className="font-label-sm font-bold">Password reset successfully!</p>
              <p className="text-xs text-on-surface-variant">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-space-md text-left">
              <div className="space-y-1">
                <label className="block font-label-sm text-on-surface font-semibold">New Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-space-md rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-label-sm text-on-surface font-semibold">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-space-md rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-primary-container text-on-primary font-label-md hover:bg-primary transition-all font-semibold"
              >
                Reset Password
              </button>
            </form>
          )}

          <div className="pt-space-xs text-sm">
            <Link to="/auth/login" className="text-primary font-bold hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
