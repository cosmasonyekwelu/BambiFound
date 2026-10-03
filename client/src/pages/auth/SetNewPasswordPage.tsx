import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

const setNewPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SetNewPasswordFormData = z.infer<typeof setNewPasswordSchema>;

export const SetNewPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(setNewPasswordSchema),
  });

  const onSubmit = async (data: SetNewPasswordFormData) => {
    try {
      setApiError(null);
      // API call to set new password
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/auth/login', { state: { message: 'Password reset successful. Please log in.' } });
    } catch (err: any) {
      setApiError('Failed to reset password. The link might be expired.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 flex items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-level-1">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-newsreader text-[28px] font-medium text-primary">Set new password</CardTitle>
            <CardDescription className="text-ink-secondary text-sm">
              Please enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {apiError && (
              <div className="p-3 mb-6 rounded-md bg-[#ffdad6] text-[#93000a] text-sm">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-ink-secondary uppercase tracking-[0.04em]">New Password</label>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="At least 8 characters"
                />
                {errors.password && (
                  <p className="text-xs text-[#ba1a1a] mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-ink-secondary uppercase tracking-[0.04em]">Confirm New Password</label>
                <Input
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="At least 8 characters"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-[#ba1a1a] mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? 'Saving...' : 'Reset Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
