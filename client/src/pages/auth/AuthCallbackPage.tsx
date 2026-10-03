import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { setAccessToken } from '../../lib/api';

export const AuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, refreshUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setAccessToken(token);
    }

    const initCallbackSession = async () => {
      try {
        await refreshUser();
      } catch {
        navigate('/auth/login?error=oauth_failed', { replace: true });
      }
    };

    initCallbackSession();
  }, [searchParams, refreshUser, navigate]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.onboardingCompleted || user.onboardingSkipped) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/onboarding', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-space-md text-on-surface">
      <div className="flex flex-col items-center space-y-4 bg-surface-container-lowest p-space-xl rounded-xl border border-outline-variant/40 shadow-sm">
        <div className="w-10 h-10 rounded-full border-2 border-secondary border-t-transparent animate-spin"></div>
        <p className="font-headline-sm text-headline-sm text-on-surface">
          Completing authentication...
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Please wait while we finalize your session.
        </p>
      </div>
    </div>
  );
};
