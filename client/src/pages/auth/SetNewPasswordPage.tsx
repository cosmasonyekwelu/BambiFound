import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { api } from '../../lib/api';

const setNewPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SetNewPasswordFormData = z.infer<typeof setNewPasswordSchema>;

export const SetNewPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(setNewPasswordSchema),
  });

  const onSubmit = async (data: SetNewPasswordFormData) => {
    if (!token) {
      setApiError('Invalid or missing password reset token. Please request a new reset email.');
      return;
    }

    try {
      setApiError(null);
      await api.post('/auth/reset-password', {
        token,
        password: data.password,
      });
      navigate('/auth/login', {
        state: { message: 'Password reset successful. Please log in with your new password.' },
      });
    } catch (err: any) {
      setApiError(
        err.response?.data?.message || 'Failed to reset password. The reset link may be expired or invalid.',
      );
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between font-body-md text-on-surface antialiased">
      <Navbar />

      <main className="flex-1 w-full pt-24 pb-16 flex items-center justify-center px-margin relative overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-[460px] mx-auto flex flex-col items-center">
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-[0_12px_28px_-6px_rgba(20,40,29,0.06),0_2px_6px_rgba(20,40,29,0.02)] border border-outline-variant/40">
            <div className="text-center mb-space-lg">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low mb-space-sm text-primary">
                <span className="material-symbols-outlined text-[20px]">key</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Set new password</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
                Choose a strong password with at least 8 characters.
              </p>
            </div>

            {apiError && (
              <div className="p-3 mb-4 rounded-lg bg-red-900/20 text-red-200 border border-red-800/40 font-body-sm text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{apiError}</span>
              </div>
            )}

            {!token && (
              <div className="p-3 mb-4 rounded-lg bg-amber-900/20 text-amber-200 border border-amber-800/40 font-body-sm text-xs flex flex-col gap-2">
                <span>Missing reset token in URL parameters.</span>
                <Link to="/auth/forgot-password" className="underline text-amber-300 font-bold">
                  Request a new password reset email →
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-space-md">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1.5" htmlFor="password">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="••••••••••••"
                    className="w-full h-11 pl-3.5 pr-10 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none placeholder:text-outline/60 focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.password && (
                  <p className="font-body-sm text-body-sm text-error mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1.5" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    placeholder="••••••••••••"
                    className="w-full h-11 pl-3.5 pr-10 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none placeholder:text-outline/60 focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D] transition-all"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="font-body-sm text-body-sm text-error mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="pt-space-sm">
                <button
                  type="submit"
                  disabled={isSubmitting || !token}
                  className="w-full h-12 bg-primary-container text-on-primary hover:bg-primary font-headline-sm text-headline-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-space-sm active:scale-[0.98] disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Updating Password...' : 'Reset Password'}</span>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
