import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@bambifound/validation';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await api.post('/auth/login', data);
      const { user, tokens } = res.data;
      login(tokens.accessToken, tokens.refreshToken, user);
      navigate('/');
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Invalid email or password. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
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
        <Link
          to="/"
          className="font-label-md text-label-md text-secondary hover:text-on-surface transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">help_outline</span>
          <span>Support & Guide</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-gutter-sm py-space-lg w-full max-w-md mx-auto">
        <div className="w-full p-space-xl rounded-xl bg-surface-container-lowest shadow-md border border-outline-variant/30">
          <div className="text-center mb-space-lg">
            <h1 className="font-headline-md text-headline-md text-primary font-bold">
              Welcome back to BambiFound
            </h1>
            <p className="font-body-sm text-body-sm text-secondary mt-1">
              Find the people who help you build. Log in to continue.
            </p>
          </div>

          {errorMessage && (
            <div className="p-space-sm mb-space-md rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-space-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="founder@bambifound.com"
                className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary transition-all"
              />
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-label-md text-label-md text-on-surface">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="font-label-sm text-label-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                {...register('password')}
                type="password"
                placeholder="••••••••"
                className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary transition-all"
              />
              {errors.password && (
                <p className="text-xs text-error mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="text-center mt-space-md text-body-sm text-secondary">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create a free account
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
