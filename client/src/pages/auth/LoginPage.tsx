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

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/';

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
    <div className="min-h-screen bg-surface font-hanken text-on-surface flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 flex items-center justify-center px-gutter">
        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-xl shadow-xs space-y-space-md">
          <div className="text-center space-y- space-xs">
            <h1 className="font-headline-md text-headline-md text-primary font-bold">Welcome back</h1>
            <p className="font-body-sm text-on-surface-variant">Sign in to your BambiFound account</p>
          </div>

          {apiError && (
            <div className="p-space-sm rounded-lg bg-error-container text-on-error-container text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-space-md">
            <div className="space-y-1 text-left">
              <label className="block font-label-sm text-on-surface font-semibold">Email address</label>
              <input
                type="email"
                {...register('email')}
                placeholder="name@company.com"
                className="w-full h-11 px-space-md rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between">
                <label className="block font-label-sm text-on-surface font-semibold">Password</label>
                <Link to="/auth/forgot-password" className="text-xs text-primary font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="w-full h-11 px-space-md rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
              {errors.password && (
                <p className="text-xs text-error mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-lg bg-primary-container text-on-primary font-label-md hover:bg-primary transition-all disabled:opacity-50 font-semibold"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center text-sm text-on-surface-variant pt-space-xs">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-primary font-bold hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
