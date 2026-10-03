import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // API Call goes here
    console.log('Sending reset email to', data.email);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 flex items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-level-1">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-newsreader text-[28px] font-medium text-primary">Reset your password</CardTitle>
            <CardDescription className="text-ink-secondary text-sm">
              Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {isSubmitted ? (
              <div className="text-center space-y-6">
                <div className="w-12 h-12 rounded-full bg-sage-tint text-primary mx-auto flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <p className="text-sm text-ink-primary font-medium">Check your email for the reset link.</p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to="/auth/login">Return to Log In</Link>
                </Button>
              </div>
            ) : (
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

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Sending link...' : 'Send Reset Link'}
                </Button>

                <div className="text-center text-sm pt-4">
                  <Link to="/auth/login" className="text-primary font-semibold hover:underline">
                    Back to Log In
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
