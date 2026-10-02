import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  const getStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (/[A-Z]/.test(pwd)) score += 25;
    if (/[0-9]/.test(pwd)) score += 25;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 25;
    return score;
  };

  const strength = getStrength(password);

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
        <div className="w-full p-space-xl rounded-xl bg-surface-container-lowest shadow-md border border-outline-variant/30">
          <div className="text-center mb-space-lg">
            <h1 className="font-headline-md text-headline-md text-primary font-bold">
              Set New Password
            </h1>
            <p className="font-body-sm text-body-sm text-secondary mt-1">
              Choose a strong secure password for your BambiFound account.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-space-md rounded-lg bg-primary-fixed/30 text-primary font-body-md font-semibold text-center flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Password updated successfully! Redirecting to login...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-space-md">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter secure password"
                  className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary transition-all"
                />

                {/* Strength Bar */}
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength <= 25
                          ? 'bg-error'
                          : strength <= 50
                          ? 'bg-tertiary-fixed-dim'
                          : strength <= 75
                          ? 'bg-on-tertiary-container'
                          : 'bg-primary-container'
                      }`}
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-secondary flex justify-between">
                    <span>Password Strength</span>
                    <span className="font-semibold">
                      {strength === 0
                        ? ''
                        : strength <= 25
                        ? 'Weak'
                        : strength <= 50
                        ? 'Fair'
                        : strength <= 75
                        ? 'Good'
                        : 'Strong'}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary transition-all"
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-error mt-1">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!password || password !== confirmPassword}
                className="w-full py-3 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-md disabled:opacity-50"
              >
                Update Password
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="py-space-md text-center text-xs text-secondary">
        © 2025 BambiFound Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
};
