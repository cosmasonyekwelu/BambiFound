import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [introModalOpen, setIntroModalOpen] = useState<boolean>(false);
  const [selectedBuilder, setSelectedBuilder] = useState<string>('');
  const [introMessage, setIntroMessage] = useState<string>('');
  const [introSentToast, setIntroSentToast] = useState<boolean>(false);

  const handleOpenIntro = (builderName: string) => {
    setSelectedBuilder(builderName);
    setIntroMessage(`Hi ${builderName.split(' ')[0]}, I saw our match score on BambiFound and would love to connect on building together!`);
    setIntroModalOpen(true);
  };

  const handleSendIntro = (e: React.FormEvent) => {
    e.preventDefault();
    setIntroModalOpen(false);
    setIntroSentToast(true);
    setTimeout(() => setIntroSentToast(false), 4000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const matches = [
    {
      id: 'elena-vance',
      name: 'Elena Vance',
      role: 'AI Systems Architect & Ex-Scale AI Lead',
      score: 96,
      avatar: 'EV',
      tags: ['LLM Orchestration', 'PyTorch', 'Distributed Systems', 'Founding Tech'],
      reasoning: 'Strong alignment in AI infrastructure, complementary operational skills, mutual interest in early-stage spin-outs.',
      location: 'San Francisco, CA (Remote)',
    },
    {
      id: 'marcus-thorne',
      name: 'Marcus Thorne',
      role: 'Full-Stack Product Engineer',
      score: 92,
      avatar: 'MT',
      tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Rust'],
      reasoning: 'Proven track record scaling B2B SaaS from 0 to 1, seeking equity-first co-founder role.',
      location: 'New York, NY',
    },
    {
      id: 'dr-priya-desai',
      name: 'Dr. Priya Desai',
      role: 'Bio-AI Research Lead & Stanford PhD',
      score: 89,
      avatar: 'PD',
      tags: ['Computational Biology', 'Python', 'Grant Funding', 'Drug Discovery'],
      reasoning: 'Looking for technical co-founder with strong software architecture experience to commercialize IP.',
      location: 'Boston, MA',
    },
  ];

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
              <Link to="/dashboard" className="text-sm font-medium text-[#82dbac] border-b-2 border-[#82dbac] pb-1">
                Overview
              </Link>
              <Link to="/discover" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors pb-1">
                Discover Builders
              </Link>
              <Link to="/ventures" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors pb-1">
                Venture Listings
              </Link>
              <Link to="/messages" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors pb-1">
                Intros & Messages
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/settings/membership" className="text-xs font-semibold text-[#82dbac] bg-[#1d2b24] px-3 py-1.5 rounded-full border border-[#2e4338] hover:bg-[#25392f] transition-colors">
              {user?.membershipTier || 'FREE'} TIER
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/profile/edit" className="text-xs text-[#a1aca4] hover:text-[#e1e3df] transition-colors">
                {user?.fullName || user?.email}
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-[#a1aca4] hover:text-red-400 bg-[#16221c] px-2.5 py-1 rounded-lg border border-[#23352b] transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-8">
        {/* Onboarding Skipped Banner */}
        {user && user.onboardingSkipped && !user.onboardingCompleted && (
          <div className="bg-[#1c2a22] border border-[#334d3f] rounded-2xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#82dbac]">info</span>
              <div>
                <h4 className="text-sm font-semibold text-[#f0f2ee]">Onboarding Skipped</h4>
                <p className="text-xs text-[#a1aca4]">Complete your builder profile to unlock personalized 95%+ vector match accuracy.</p>
              </div>
            </div>
            <Link
              to="/onboarding"
              className="text-xs font-bold text-[#0c1511] bg-[#82dbac] px-4 py-2 rounded-xl hover:bg-[#97f0c1] transition-all self-start sm:self-auto"
            >
              Complete Onboarding
            </Link>
          </div>
        )}

        {/* Dashboard Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-[#132019] border border-[#25392e] rounded-2xl p-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#1e3126] text-[#82dbac] text-[11px] font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82dbac] animate-pulse"></span>
              BUILDER COMMAND CENTER
            </div>
            <h1 className="text-3xl font-newsreader font-semibold text-[#f0f2ee]">
              Welcome, {user?.fullName || 'Builder'}!
            </h1>
            <p className="text-xs text-[#a1aca4] mt-1">
              Here are your high-conviction ecosystem matches and venture signal updates today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/discover"
              className="px-4 py-2.5 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all"
            >
              Explore Matches
            </Link>
            <Link
              to="/ventures"
              className="px-4 py-2.5 rounded-xl bg-[#1d2d24] text-[#82dbac] text-xs font-semibold border border-[#2e4338] hover:bg-[#25392f] transition-all"
            >
              List Venture
            </Link>
          </div>
        </div>

        {/* Toast Alert */}
        {introSentToast && (
          <div className="mb-6 p-4 bg-[#1b3326] border border-[#2d523e] rounded-xl text-xs text-[#82dbac] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Intro request successfully sent to <strong>{selectedBuilder}</strong>!</span>
            </div>
            <button onClick={() => setIntroSentToast(false)} className="text-[#a1aca4] hover:text-[#e1e3df]">✕</button>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: High Conviction Matches */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-newsreader font-semibold text-[#f0f2ee]">
                High-Conviction Builder Matches
              </h2>
              <Link to="/discover" className="text-xs font-semibold text-[#82dbac] hover:underline">
                View All Matches →
              </Link>
            </div>

            <div className="space-y-4">
              {matches.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#121c17] border border-[#23352b] hover:border-[#2e4539] rounded-2xl p-6 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#1e3025] border border-[#2e4338] flex items-center justify-center font-bold text-[#82dbac] text-sm">
                        {m.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link to={`/profile/${m.id}`} className="text-base font-semibold text-[#f0f2ee] hover:text-[#82dbac] transition-colors">
                            {m.name}
                          </Link>
                          <span className="text-[10px] font-bold text-[#82dbac] bg-[#1a2d23] px-2 py-0.5 rounded-full border border-[#284234]">
                            {m.score}% MATCH
                          </span>
                        </div>
                        <p className="text-xs text-[#a1aca4] mt-0.5">{m.role}</p>
                        <p className="text-[11px] text-[#718076]">{m.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/profile/${m.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#18241e] border border-[#27382d] text-xs font-medium text-[#c1c8c2] hover:text-[#e1e3df] transition-colors"
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => handleOpenIntro(m.name)}
                        className="px-3 py-1.5 rounded-lg bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all"
                      >
                        Request Intro
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[#c1c8c2] bg-[#16221c] p-3 rounded-xl border border-[#203026] mb-4">
                    <strong className="text-[#82dbac]">AI Vector Insight:</strong> {m.reasoning}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {m.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] bg-[#18251e] text-[#a1aca4] px-2.5 py-1 rounded-lg border border-[#24352b]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Widgets & Signal Stream */}
          <div className="space-y-6">
            {/* Active Ventures Widget */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-newsreader font-semibold text-[#f0f2ee]">
                  Your Ventures
                </h3>
                <Link to="/ventures" className="text-xs font-semibold text-[#82dbac] hover:underline">
                  Manage
                </Link>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-[#16231c] border border-[#24372b] rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-semibold text-[#f0f2ee]">KiteFlow Systems</h4>
                    <span className="text-[10px] text-[#82dbac] bg-[#1c2e25] px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <p className="text-[11px] text-[#a1aca4]">High-throughput event stream orchestration for AI workflows.</p>
                </div>

                <div className="p-3.5 bg-[#16231c] border border-[#24372b] rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-semibold text-[#f0f2ee]">Horizon Carbon</h4>
                    <span className="text-[10px] text-[#a1aca4] bg-[#1a251f] px-2 py-0.5 rounded-full">Spin-out</span>
                  </div>
                  <p className="text-[11px] text-[#a1aca4]">Automated carbon offset intelligence for enterprise supply chains.</p>
                </div>
              </div>
            </div>

            {/* Ecosystem Signal Stream */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6">
              <h3 className="text-base font-newsreader font-semibold text-[#f0f2ee] mb-4">
                Ecosystem Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#82dbac] mt-1.5"></div>
                  <div>
                    <p className="text-xs text-[#e1e3df]">
                      <strong>Elena Vance</strong> viewed your venture listing <em>KiteFlow Systems</em>.
                    </p>
                    <span className="text-[10px] text-[#718076]">2 hours ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#82dbac] mt-1.5"></div>
                  <div>
                    <p className="text-xs text-[#e1e3df]">
                      New vector match: <strong>Marcus Thorne</strong> (+92% alignment).
                    </p>
                    <span className="text-[10px] text-[#718076]">5 hours ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#718076] mt-1.5"></div>
                  <div>
                    <p className="text-xs text-[#a1aca4]">
                      System recommendation: Update your primary leverage focus for +5% match precision.
                    </p>
                    <span className="text-[10px] text-[#718076]">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Intro Request Modal */}
      {introModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c1511]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15221c] border border-[#2a3d33] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-newsreader font-semibold text-[#f0f2ee] mb-1">
              Request Intro to {selectedBuilder}
            </h3>
            <p className="text-xs text-[#a1aca4] mb-4">
              Send a direct intro message powered by BambiFound match alignment.
            </p>

            <form onSubmit={handleSendIntro} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">
                  Intro Note
                </label>
                <textarea
                  rows={4}
                  value={introMessage}
                  onChange={(e) => setIntroMessage(e.target.value)}
                  className="w-full bg-[#101914] border border-[#25392e] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIntroModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#2b3e32] text-xs font-semibold text-[#a1aca4] hover:text-[#e1e3df]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
