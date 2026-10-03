import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const oauthError = queryParams.get('error');

  const getErrorMessage = (code: string | null) => {
    if (!code) return null;
    switch (code) {
      case 'account_exists_link_required':
        return 'An account with this email address already exists. Please sign in with your email and password.';
      case 'missing_email':
        return 'Unable to retrieve your email address from the social provider. Please sign in using your email.';
      case 'oauth_canceled':
        return 'Social authentication was canceled.';
      case 'oauth_failed':
      default:
        return 'Social login failed. Please try again or use your email and password.';
    }
  };

  const displayError = apiError || getErrorMessage(oauthError);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${API_URL}/api/auth/github`;
  };

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError(null);
      await login(data);
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Login failed. Please check your credentials.';
      setApiError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between font-body-md text-on-surface antialiased">
      <Navbar />

      <main className="flex-1 w-full pt-24 pb-16 flex items-center justify-center px-margin relative overflow-hidden">
        {/* Ambient organic gradient background accents */}
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-[460px] mx-auto flex flex-col items-center">
          {/* Contextual Reassurance Pill */}
          <div className="mb-space-lg flex items-center gap-space-xs bg-surface-container-low px-space-md py-1.5 rounded-full shadow-sm max-w-full border border-outline-variant/30">
            <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">domain_verification</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Looking for your startup listing? <span className="text-on-surface font-medium">Use your team email.</span>
            </p>
          </div>

          {/* Core Auth Surface Card */}
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg sm:p-space-xl shadow-[0_12px_28px_-6px_rgba(20,40,29,0.06),0_2px_6px_rgba(20,40,29,0.02)] border border-outline-variant/40">
            {/* Header Segment */}
            <div className="text-center mb-space-lg">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low mb-space-sm text-primary">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Welcome back</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
                Log in to continue finding builders, managing introductions, and exploring opportunities.
              </p>
            </div>

            {/* Social Single Sign-on Stack */}
            <div className="grid grid-cols-2 gap-space-sm mb-space-lg">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="group flex items-center justify-center gap-space-sm py-2.5 px-space-md bg-surface-container-low hover:bg-surface-container transition-all duration-150 rounded-lg text-on-surface font-label-md text-label-md active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
                </svg>
                Continue with Google
              </button>
              <button
                type="button"
                onClick={handleGithubLogin}
                className="group flex items-center justify-center gap-space-sm py-2.5 px-space-md bg-surface-container-low hover:bg-surface-container transition-all duration-150 rounded-lg text-on-surface font-label-md text-label-md active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0 fill-current text-on-surface" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Sectional Divider */}
            <div className="relative flex items-center justify-center mb-space-lg">
              <div className="w-full h-px bg-surface-container-high"></div>
              <span className="absolute px-space-md bg-surface-container-lowest font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">or sign in with email</span>
            </div>

            {/* API Error Notification */}
            {displayError && (
              <div className="p-space-sm mb-space-md rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{displayError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-space-md">
              {/* Email */}
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1.5" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="you@example.com"
                    className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none placeholder:text-outline/60 focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D] transition-all"
                  />
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline/50 pointer-events-none text-[18px]">mail</span>
                </div>
                {errors.email && (
                  <p className="font-body-sm text-body-sm text-error mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <Link to="/auth/forgot-password" className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors underline decoration-outline-variant underline-offset-4">
                    Forgot password?
                  </Link>
                </div>
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

              {/* Persistence Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-space-sm cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded border-outline text-primary focus:ring-primary" defaultChecked />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Remember this device for 30 days</span>
                </label>
              </div>

              {/* Primary CTA Button */}
              <div className="pt-space-sm">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary-container text-on-primary hover:bg-primary font-headline-sm text-headline-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-space-sm active:scale-[0.98] disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Logging In...' : 'Log In'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Prompt to Sign Up */}
            <div className="mt-space-lg text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Don’t have an account?{' '}
                <Link to="/auth/register" className="text-on-surface font-headline-sm text-headline-sm font-semibold hover:text-secondary underline decoration-secondary underline-offset-4 transition-colors">
                  Create one
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Signatures */}
          <div className="mt-space-lg flex items-center justify-center gap-space-lg text-on-surface-variant font-label-sm text-label-sm">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
              <span>End-to-end encrypted</span>
            </div>
            <span className="text-outline-variant font-thin">•</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-secondary">shield_lock</span>
              <span>SOC2 Compliant</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
