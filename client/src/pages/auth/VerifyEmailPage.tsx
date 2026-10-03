import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        return;
      }
      try {
        // API Call goes here
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('success');
      } catch (error) {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-32 pb-16 flex items-center justify-center px-6">
        <Card className="w-full max-w-md shadow-level-1 text-center">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 bg-sage-tint text-primary">
              {status === 'loading' && (
                <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {status === 'success' && (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              )}
              {status === 'error' && (
                <svg className="w-6 h-6 text-[#ba1a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              )}
            </div>
            <CardTitle className="font-newsreader text-[28px] font-medium text-primary">
              {status === 'loading' && 'Verifying your email'}
              {status === 'success' && 'Email verified'}
              {status === 'error' && 'Verification failed'}
            </CardTitle>
            <CardDescription className="text-ink-secondary text-sm mt-2">
              {status === 'loading' && 'Please wait while we verify your email address.'}
              {status === 'success' && 'Your email has been successfully verified. You can now access all features.'}
              {status === 'error' && 'The verification link is invalid or has expired.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {status === 'success' && (
              <Button className="w-full" size="lg" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            )}
            {status === 'error' && (
              <Button className="w-full" size="lg" asChild>
                <Link to="/auth/login">Return to Log In</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
