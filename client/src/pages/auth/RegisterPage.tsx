import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

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
      // We pass selectedIntents via state or context later, for now just register
      await registerAuth(data);
      navigate('/onboarding');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
      setApiError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 flex items-center justify-center px-6">
        <Card className="w-full max-w-xl shadow-level-1">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Badge variant="default" className="uppercase text-[10px] tracking-wider">Step 1 of 2 — Account & Intent</Badge>
            </div>
            <CardTitle className="font-newsreader text-[28px] font-medium text-primary">Create your account</CardTitle>
            <CardDescription className="text-ink-secondary text-sm">Select your primary intentions to help our AI align your synergy match</CardDescription>
          </CardHeader>
          
          <CardContent>
            {apiError && (
              <div className="p-3 mb-6 rounded-md bg-[#ffdad6] text-[#93000a] text-sm">
                {apiError}
              </div>
            )}

            {/* Intent Selection */}
            <div className="space-y-3 mb-8">
              <label className="block text-[11px] font-semibold text-ink-secondary uppercase tracking-[0.04em]">
                Select Your Current Objectives
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTENT_OPTIONS.map((intent) => {
                  const isSelected = selectedIntents.includes(intent.id);
                  return (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() => toggleIntent(intent.id)}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-center ${
                        isSelected
                          ? 'border-primary bg-sage-tint text-primary'
                          : 'border-hairline bg-surface hover:bg-surface-cream text-ink-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-[13px]">{intent.label}</span>
                        {isSelected && (
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p className={`text-[11px] mt-1 ${isSelected ? 'text-primary' : 'text-ink-muted'}`}>{intent.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-ink-secondary uppercase tracking-[0.04em]">Full Name</label>
                <Input
                  type="text"
                  {...register('fullName')}
                  placeholder="Ada Lovelace"
                />
                {errors.fullName && (
                  <p className="text-xs text-[#ba1a1a] mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-ink-secondary uppercase tracking-[0.04em]">Email address</label>
                <Input
                  type="email"
                  {...register('email')}
                  placeholder="ada@startup.com"
                />
                {errors.email && (
                  <p className="text-xs text-[#ba1a1a] mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-ink-secondary uppercase tracking-[0.04em]">Password</label>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="At least 8 characters"
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
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center text-sm text-ink-secondary pt-6">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
