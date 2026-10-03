import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

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

  const onSubmit = async (_data: ForgotPasswordFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
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
                <span className="material-symbols-outlined text-[20px]">lock_reset</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Reset password</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
                Enter your registered email address and we'll send password recovery instructions.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center space-y-space-md py-space-md">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container mx-auto flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">Check your email</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    We sent password reset instructions to your email inbox.
                  </p>
                </div>
                <Link
                  to="/auth/login"
                  className="w-full py-3 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">west</span>
                  Return to Log In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-space-md">
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

                <div className="pt-space-sm">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary-container text-on-primary hover:bg-primary font-headline-sm text-headline-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-space-sm active:scale-[0.98] disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Sending Instructions...' : 'Send Reset Instructions'}</span>
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <Link to="/auth/login" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">west</span>
                    Back to Log In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
