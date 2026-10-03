import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const displayName = user?.fullName || user?.email?.split('@')[0] || 'Builder';

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between font-body-md text-on-surface antialiased">
      <Navbar />

      <main className="flex-1 w-full pt-24 pb-16 px-margin flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto space-y-space-lg text-center">

          {/* Skipped Onboarding Banner */}
          {user?.onboardingSkipped && !user?.onboardingCompleted && (
            <div className="p-space-md rounded-xl bg-secondary-container/40 border border-secondary/30 text-on-surface flex flex-col sm:flex-row items-center justify-between gap-space-md text-left shadow-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">info</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary">Onboarding Skipped</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    You can complete your builder profile anytime to unlock accurate AI co-builder matches.
                  </p>
                </div>
              </div>
              <Link
                to="/onboarding"
                className="px-space-lg py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors shrink-0"
              >
                Complete Onboarding
              </Link>
            </div>
          )}

          {/* Main Dashboard Placeholder Hero */}
          <div className="bg-surface-container-lowest rounded-2xl p-space-xl border border-outline-variant/40 shadow-md space-y-space-md">
            <div className="w-16 h-16 rounded-full bg-surface-container-low text-primary mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">dashboard</span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-primary">
              Welcome, {displayName}!
            </h1>

            <p className="font-headline-sm text-headline-sm text-on-surface-variant max-w-xl mx-auto font-normal">
              Your dashboard is under construction.
            </p>

            <div className="pt-space-md flex flex-wrap items-center justify-center gap-space-sm">
              <Link
                to="/onboarding"
                className="px-space-xl py-space-sm rounded-full bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary shadow-sm transition-all"
              >
                {user?.onboardingCompleted ? 'Edit Onboarding Profile' : 'Complete Onboarding'}
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
