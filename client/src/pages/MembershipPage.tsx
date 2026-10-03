import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export const MembershipPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState<boolean>(false);
  const [upgradedTier, setUpgradedTier] = useState<string>('PLUS');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if returning from checkout with reference
  useEffect(() => {
    const reference = searchParams.get('reference');

    if (reference) {
      verifyTransaction(reference);
    }
  }, [searchParams]);

  const verifyTransaction = async (reference: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await api.get(`/payments/verify/${reference}`);
      if (res.data?.status) {
        setUpgradedTier(res.data.payment?.planTier || res.data.user?.membershipTier || 'PLUS');
        setPaymentSuccessModal(true);
        await refreshUser();
      } else {
        setErrorMessage(res.data?.message || 'Payment verification failed.');
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to verify payment reference.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (planTier: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await api.post('/payments/initialize', { planTier });
      if (res.data?.data?.authorization_url) {
        const authUrl = res.data.data.authorization_url;
        const ref = res.data.data.reference;

        // If local test authorization url
        if (authUrl.includes('/settings/membership')) {
          // Direct local verification simulation
          await verifyTransaction(ref);
        } else {
          // Redirect to Paystack Hosted Checkout
          window.location.href = authUrl;
        }
      } else {
        setErrorMessage('Failed to initialize subscription checkout.');
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Error initializing payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const currentTier = user?.membershipTier || 'FREE';

  return (
    <div className="min-h-screen bg-[#0c1511] text-[#e1e3df] font-sans flex flex-col">
      {/* Top Header Navigation */}
      <header className="border-b border-[#23352b] bg-[#0c1511]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="font-newsreader text-2xl font-semibold text-[#82dbac] tracking-tight">
              BambiFound
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors">
                Dashboard
              </Link>
              <Link to="/discover" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors">
                Discover Builders
              </Link>
              <Link to="/ventures" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors">
                Venture Listings
              </Link>
              <Link to="/messages" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors">
                Intros & Messages
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/settings/membership" className="text-sm font-medium text-[#82dbac] bg-[#1d2b24] px-3 py-1.5 rounded-full border border-[#2e4338]">
              {currentTier} Tier
            </Link>
            <Link to="/profile/edit" className="w-8 h-8 rounded-full bg-[#1e2e26] border border-[#2e4338] flex items-center justify-center text-[#82dbac] hover:bg-[#25392f] transition-colors">
              <span className="material-symbols-outlined text-sm">person</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-10">
        {/* Settings Header & Tabs */}
        <div className="mb-8">
          <h1 className="text-3xl font-newsreader font-semibold text-[#f0f2ee] mb-2">
            Settings & Workspace
          </h1>
          <p className="text-sm text-[#a1aca4]">
            Manage your BambiFound ecosystem plan, matching preferences, and account security.
          </p>

          <div className="flex items-center gap-6 border-b border-[#23352b] mt-6">
            <Link to="/profile/edit" className="pb-3 text-sm font-medium text-[#a1aca4] hover:text-[#e1e3df] transition-colors">
              Profile Details
            </Link>
            <button className="pb-3 text-sm font-medium text-[#82dbac] border-b-2 border-[#82dbac]">
              Membership & Plans
            </button>
            <button className="pb-3 text-sm font-medium text-[#a1aca4] hover:text-[#e1e3df] transition-colors cursor-not-allowed">
              Notifications
            </button>
            <button className="pb-3 text-sm font-medium text-[#a1aca4] hover:text-[#e1e3df] transition-colors cursor-not-allowed">
              Integrations
            </button>
          </div>
        </div>

        {/* Current Plan Banner */}
        <div className="bg-[#15221c] border border-[#2a3d33] rounded-2xl p-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1d3026] text-[#82dbac] text-xs font-semibold mb-2">
              <span className="material-symbols-outlined text-sm">verified</span>
              ACTIVE SUBSCRIPTION
            </div>
            <h2 className="text-xl font-semibold text-[#f0f2ee]">
              Current Plan: BambiFound {currentTier} Tier
            </h2>
            <p className="text-xs text-[#a1aca4] mt-1">
              {currentTier === 'FREE'
                ? 'Standard builder matching with limited monthly intro requests.'
                : `Active subscription renewed monthly. Plan status: ${currentTier}.`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {currentTier !== 'FREE' && (
              <span className="text-xs text-[#82dbac] bg-[#1c2e25] px-3 py-2 rounded-xl border border-[#2e4539]">
                Expires: {user?.membershipExpiresAt ? new Date(user.membershipExpiresAt).toLocaleDateString() : 'Next Billing Cycle'}
              </span>
            )}
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-newsreader font-semibold text-[#f0f2ee] mb-2">
            Supercharge Your Venture Matching & Discovery
          </h2>
          <p className="text-sm text-[#a1aca4]">
            Choose a tier that matches your building momentum. Upgrade or downgrade anytime.
          </p>
        </div>

        {errorMessage && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-[#3d1a1d] border border-[#63292e] rounded-xl text-red-200 text-sm text-center">
            {errorMessage}
          </div>
        )}

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Free Tier */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#a1aca4]">Standard</span>
                {currentTier === 'FREE' && (
                  <span className="text-xs font-medium text-[#82dbac] bg-[#1c2e25] px-2.5 py-1 rounded-full border border-[#2e4539]">
                    Current Plan
                  </span>
                )}
              </div>
              <div className="mb-6">
                <span className="text-4xl font-semibold text-[#f0f2ee] font-newsreader">$0</span>
                <span className="text-sm text-[#a1aca4]"> / month</span>
              </div>
              <p className="text-xs text-[#a1aca4] mb-6">
                Essential discovery features for emerging builders exploring potential co-founders.
              </p>
              <ul className="space-y-3 text-xs text-[#c1c8c2]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  Public Builder Profile
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  Standard Vector Match Score
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  2 Monthly Intro Requests
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  Public Venture Directory Access
                </li>
              </ul>
            </div>
            <button
              disabled={currentTier === 'FREE'}
              className="mt-8 w-full py-3 rounded-xl border border-[#2b3e32] text-xs font-semibold text-[#a1aca4] bg-[#18241e] disabled:opacity-50 cursor-default"
            >
              {currentTier === 'FREE' ? 'Active Plan' : 'Downgrade to Standard'}
            </button>
          </div>

          {/* Plus Tier (Recommended) */}
          <div className="bg-[#16251e] border-2 border-[#82dbac] rounded-2xl p-8 flex flex-col justify-between relative shadow-lg">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#82dbac] text-[#0c1511] font-bold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full">
              Most Popular
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#82dbac]">BambiFound Plus</span>
                {currentTier === 'PLUS' && (
                  <span className="text-xs font-medium text-[#82dbac] bg-[#1c2e25] px-2.5 py-1 rounded-full border border-[#2e4539]">
                    Current Plan
                  </span>
                )}
              </div>
              <div className="mb-6">
                <span className="text-4xl font-semibold text-[#f0f2ee] font-newsreader">$15</span>
                <span className="text-sm text-[#a1aca4]"> / month (~₦15,000)</span>
              </div>
              <p className="text-xs text-[#a1aca4] mb-6">
                Designed for active builders seeking high-conviction partners and direct messaging.
              </p>
              <ul className="space-y-3 text-xs text-[#e1e3df]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check_circle</span>
                  Priority Vector Matching Engine
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check_circle</span>
                  Unlimited Intro Requests
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check_circle</span>
                  Verified Builder Pedigree Badge
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check_circle</span>
                  Direct Messaging & Intros Access
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check_circle</span>
                  Up to 3 Venture Listings
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('PLUS')}
              disabled={isLoading || currentTier === 'PLUS'}
              className="mt-8 w-full py-3 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? 'Processing Paystack...' : currentTier === 'PLUS' ? 'Active Subscription' : 'Subscribe to Plus'}
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#a1aca4]">BambiFound Pro</span>
                {currentTier === 'PRO' && (
                  <span className="text-xs font-medium text-[#82dbac] bg-[#1c2e25] px-2.5 py-1 rounded-full border border-[#2e4539]">
                    Current Plan
                  </span>
                )}
              </div>
              <div className="mb-6">
                <span className="text-4xl font-semibold text-[#f0f2ee] font-newsreader">$45</span>
                <span className="text-sm text-[#a1aca4]"> / month (~₦45,000)</span>
              </div>
              <p className="text-xs text-[#a1aca4] mb-6">
                Full venture spin-out suite, tailored concierge matches, and priority spotlighting.
              </p>
              <ul className="space-y-3 text-xs text-[#c1c8c2]">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  Everything in Plus Tier
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  Dedicated AI Matching Concierge
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  Unlimited Venture Spin-Out Listings
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  Priority Match Directory Spotlighting
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[#82dbac]">check</span>
                  Custom Conviction Analytics
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe('PRO')}
              disabled={isLoading || currentTier === 'PRO'}
              className="mt-8 w-full py-3 rounded-xl border border-[#82dbac] text-xs font-bold text-[#82dbac] hover:bg-[#1a2d23] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? 'Processing Paystack...' : currentTier === 'PRO' ? 'Active Subscription' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>
      </main>

      {/* Payment Success Modal */}
      {paymentSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#0c1511]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15221c] border border-[#2a3d33] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#1e3328] border border-[#2e4d3c] flex items-center justify-center mx-auto mb-4 text-[#82dbac]">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="text-2xl font-newsreader font-semibold text-[#f0f2ee] mb-2">
              Payment Successful!
            </h3>
            <p className="text-sm text-[#a1aca4] mb-6">
              Your account has been upgraded to <strong className="text-[#82dbac]">BambiFound {upgradedTier}</strong>. Your membership benefits are now active.
            </p>
            <button
              onClick={() => {
                setPaymentSuccessModal(false);
                navigate('/dashboard');
              }}
              className="w-full py-3 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
