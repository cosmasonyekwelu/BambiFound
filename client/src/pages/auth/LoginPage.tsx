import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

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
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 flex items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-level-1">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-newsreader text-[28px] font-medium text-primary">Welcome back</CardTitle>
            <CardDescription className="text-ink-secondary text-sm">Sign in to your BambiFound account</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {apiError && (
              <div className="p-3 mb-4 rounded-md bg-[#ffdad6] text-[#93000a] text-sm">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-ink-secondary uppercase tracking-[0.04em]">Email address</label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="text-xs text-[#ba1a1a] mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-semibold text-ink-secondary uppercase tracking-[0.04em]">Password</label>
                  <Link to="/auth/forgot-password" className="text-xs text-primary font-semibold hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-xs text-[#ba1a1a] mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center text-sm text-ink-secondary pt-6">
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-primary font-semibold hover:underline">
                Create account
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
