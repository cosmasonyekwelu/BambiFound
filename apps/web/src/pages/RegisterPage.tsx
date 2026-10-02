import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterInput } from '@bambifound/validation';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export const RegisterPage: React.FC = () => {
  const [selectedIntents, setSelectedIntents] = useState<string[]>(['builder']);
  const [step, setStep] = useState<'intent' | 'credentials'>('intent');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const toggleIntent = (intent: string) => {
    if (selectedIntents.includes(intent)) {
      if (selectedIntents.length > 1) {
        setSelectedIntents(selectedIntents.filter((i) => i !== intent));
      }
    } else {
      setSelectedIntents([...selectedIntents, intent]);
    }
  };

  const onSubmit = async (data: RegisterInput) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await api.post('/auth/register', {
        ...data,
        intents: selectedIntents,
      });
      const { user, tokens } = res.data;
      login(tokens.accessToken, tokens.refreshToken, user);
      navigate('/verify-email');
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Registration failed. Please check your credentials and try again.'
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

      <main className="flex-1 flex flex-col items-center justify-center px-gutter-sm py-space-lg w-full max-w-xl mx-auto">
        <div className="flex flex-col w-full">
          {step === 'intent' ? (
            <div className="relative w-full overflow-hidden flex flex-col items-center">
              <div className="text-center max-w-lg mb-space-lg">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/60 text-primary-container font-label-sm text-label-sm mb-space-sm shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-pulse"></span>
                  <span>Fluid Venture Profile</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  What brings you to BambiFound?
                </h1>
                <p className="font-body-md text-body-md text-secondary mt-space-xs leading-relaxed">
                  Find the people who help you build. Tell us what you're building or looking for.
                </p>
              </div>

              {/* Intent Cards */}
              <div className="w-full flex flex-col gap-space-md mb-space-md">
                {/* Builder Card */}
                <div
                  onClick={() => toggleIntent('builder')}
                  className={`p-space-lg rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    selectedIntents.includes('builder')
                      ? 'bg-surface-container-low border-primary-container shadow-md'
                      : 'bg-surface-container-lowest border-outline-variant/30 hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-start gap-space-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[26px]">potted_plant</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-headline-sm text-headline-sm text-primary">I'm building</h2>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm">
                          Founder / Startup
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary mb-space-sm">
                        I'm a founder or startup looking for co-founders or early team members.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Explorer Card */}
                <div
                  onClick={() => toggleIntent('explorer')}
                  className={`p-space-lg rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    selectedIntents.includes('explorer')
                      ? 'bg-surface-container-low border-primary-container shadow-md'
                      : 'bg-surface-container-lowest border-outline-variant/30 hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-start gap-space-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-on-tertiary-container shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-[26px]">explore</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-headline-sm text-headline-sm text-primary">I'm looking for opportunities</h2>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-label-sm">
                          Talent / Explorer
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary mb-space-sm">
                        I'm looking for co-founder roles, startup opportunities, or collaborative projects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep('credentials')}
                className="w-full py-3.5 px-space-lg rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold transition-all shadow-md active:scale-[0.985] flex items-center justify-center gap-space-sm"
              >
                <span>Continue to Account Creation</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>

              <p className="text-center mt-space-md text-body-sm text-secondary">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto p-space-xl rounded-xl bg-surface-container-lowest shadow-md border border-outline-variant/30">
              <button
                onClick={() => setStep('intent')}
                className="text-body-sm text-secondary hover:text-primary mb-space-md flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Back to intent selection</span>
              </button>

              <h1 className="font-headline-md text-headline-md text-primary font-bold mb-space-xs">
                Create your account
              </h1>
              <p className="font-body-sm text-body-sm text-secondary mb-space-lg">
                Enter your details to register and start discovering matches.
              </p>

              {errorMessage && (
                <div className="p-space-sm mb-space-md rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1">
                    Full Name
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    placeholder="Cosmas"
                    className="w-full h-11 px-space-md bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest border border-transparent focus:border-primary transition-all"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-error mt-1">{errors.fullName.message}</p>
                  )}
                </div>

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
                  <label className="block font-label-md text-label-md text-on-surface mb-1">
                    Password
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="At least 8 characters"
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
                  {isSubmitting ? 'Creating Account...' : 'Create Free Account'}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <footer className="py-space-md text-center text-xs text-secondary">
        © 2025 BambiFound Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
};
