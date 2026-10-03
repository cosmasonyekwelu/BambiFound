import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const INTENT_OPTIONS = [
  { id: 'cofounder', label: 'Find a Co-Founder', desc: 'I am building a venture and need a partner' },
  { id: 'join', label: 'Join an Early Startup', desc: 'I want to build at a pre-seed or seed startup' },
  { id: 'hire', label: 'Hire Founding Talent', desc: 'Looking for engineering, product, or growth leads' },
  { id: 'explore', label: 'Explore Ecosystem', desc: 'Connecting with builders and venture ideas' },
];

export const RegisterPage: React.FC = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const [selectedIntents, setSelectedIntents] = useState<string[]>(['cofounder']);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const toggleIntent = (id: string) => {
    setSelectedIntents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError(null);
      await registerAuth(data);
      navigate('/');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
      setApiError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-hanken text-on-surface flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 flex items-center justify-center px-gutter">
        <div className="w-full max-w-xl bg-surface-container-lowest rounded-xl border border-outline-variant/60 p-space-xl shadow-xs space-y-space-md">
          <div className="text-center space-y-space-xs">
            <span className="inline-block px-space-md py-0.5 rounded-full bg-secondary-container text-primary font-label-sm uppercase text-xs">
              Step 1 of 2 · Account & Intent
            </span>
            <h1 className="font-headline-md text-headline-md text-primary font-bold">Create your account</h1>
            <p className="font-body-sm text-on-surface-variant">
              Select your primary intentions to help our AI align your synergy match
            </p>
          </div>

          {apiError && (
            <div className="p-space-sm rounded-lg bg-error-container text-on-error-container text-sm">
              {apiError}
            </div>
          )}

          {/* Intent Selection */}
          <div className="space-y-space-xs text-left">
            <label className="block font-label-sm text-on-surface font-semibold">
              Select Your Current Objectives
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
              {INTENT_OPTIONS.map((intent) => {
                const isSelected = selectedIntents.includes(intent.id);
                return (
                  <button
                    key={intent.id}
                    type="button"
                    onClick={() => toggleIntent(intent.id)}
                    className={`p-space-sm rounded-lg text-left border transition-all ${
                      isSelected
                        ? 'border-primary bg-secondary-container/40 text-primary'
                        : 'border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-sm font-semibold">{intent.label}</span>
                      {isSelected && (
                        <span className="material-symbols-outlined text-sm text-primary">check_circle</span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-0.5">{intent.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-space-md pt-space-xs">
            <div className="space-y-1 text-left">
              <label className="block font-label-sm text-on-surface font-semibold">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                placeholder="Ada Lovelace"
                className="w-full h-11 px-space-md rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
              {errors.fullName && (
                <p className="text-xs text-error mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-1 text-left">
              <label className="block font-label-sm text-on-surface font-semibold">Email address</label>
              <input
                type="email"
                {...register('email')}
                placeholder="ada@startup.com"
                className="w-full h-11 px-space-md rounded-lg bg-surface border border-outline-variant text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              />
              {errors.email && (
                <p className="text-xs text-error mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1 text-left">
              <label className="block font-label-sm text-on-surface font-semibold">Password</label>
              <input
                type="password"
                {...register('password')}
                placeholder="At least 8 characters"
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
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center text-sm text-on-surface-variant pt-space-xs">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
