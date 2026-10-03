import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PeerProfilePage: React.FC = () => {
  const { id: profileId } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [introModalOpen, setIntroModalOpen] = useState<boolean>(false);
  const [introToast, setIntroToast] = useState<boolean>(false);

  // Default to Elena Vance data if id is missing or matches elena-vance
  const profileData = {
    name: profileId === 'marcus-thorne' ? 'Marcus Thorne' : 'Elena Vance',
    role: 'AI Systems Architect & Ex-Scale AI Lead',
    location: 'San Francisco, CA (Remote)',
    matchScore: 96,
    avatar: 'EV',
    manifesto:
      'I build robust zero-to-one infrastructure for autonomous AI agents. Having led model evaluation pipelines at Scale AI, my focus is now on compiler-level optimization for LLM agent runtime environments.',
    vectors: [
      { label: 'Primary Intent', value: 'Technical Co-founder for Early AI Venture' },
      { label: 'Building Stage', value: '0 -> 1 Ideation & Prototype Phase' },
      { label: 'Weekly Bandwidth', value: '40+ hrs/week (Full-Time Commitment)' },
      { label: 'Equity Expectation', value: 'Equal Co-founder Equity Split' },
    ],
    matchReasons: [
      'High overlap in LLM orchestration & distributed systems architecture.',
      'Complementary operational experience scaling early-stage engineering teams.',
      'Shared conviction in autonomous developer tools & code synthesis.',
    ],
    skills: ['PyTorch', 'Distributed Systems', 'LLM Fine-Tuning', 'Rust', 'Kubernetes', 'Go'],
    ventures: [
      {
        name: 'Horizon Carbon',
        role: 'Founder & Architect',
        status: 'Active Spin-out',
        desc: 'Automated AI carbon offset tracking and ledger verification.',
      },
      {
        name: 'Scale AI',
        role: 'Technical Lead',
        status: 'Past Experience',
        desc: 'Led RLHF data generation infrastructure and model performance benchmarks.',
      },
    ],
    pedigree: [
      { degree: 'B.S. & M.S. Computer Science', institution: 'Stanford University' },
      { degree: 'Y Combinator Alumni (S21)', institution: 'YC Founder Cohort' },
    ],
  };

  const handleSendIntro = (e: React.FormEvent) => {
    e.preventDefault();
    setIntroModalOpen(false);
    setIntroToast(true);
    setTimeout(() => setIntroToast(false), 4000);
  };

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
              <Link to="/dashboard" className="text-sm font-medium text-[#c1c8c2] hover:text-[#82dbac] transition-colors pb-1">
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
            <Link to="/profile/edit" className="w-8 h-8 rounded-full bg-[#1e2e26] border border-[#2e4338] flex items-center justify-center text-[#82dbac]">
              <span className="material-symbols-outlined text-sm">person</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Profile Area */}
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-8">
        {introToast && (
          <div className="mb-6 p-4 bg-[#1b3326] border border-[#2d523e] rounded-xl text-xs text-[#82dbac] flex items-center justify-between">
            <span>Intro request sent to <strong>{profileData.name}</strong>! Check Intros & Messages for updates.</span>
            <button onClick={() => setIntroToast(false)} className="text-[#a1aca4]">✕</button>
          </div>
        )}

        {/* Hero Card */}
        <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#1e3126] border-2 border-[#82dbac] flex items-center justify-center font-bold text-2xl text-[#82dbac]">
              {profileData.avatar}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-newsreader font-semibold text-[#f0f2ee]">
                  {profileData.name}
                </h1>
                <span className="text-xs font-bold text-[#82dbac] bg-[#1a2d23] px-3 py-1 rounded-full border border-[#284234]">
                  {profileData.matchScore}% MATCH
                </span>
              </div>
              <p className="text-sm text-[#a1aca4] mb-1">{profileData.role}</p>
              <p className="text-xs text-[#718076]">{profileData.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIntroModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all"
            >
              Request Intro
            </button>
            <Link
              to="/messages"
              className="px-5 py-2.5 rounded-xl bg-[#18251e] text-[#c1c8c2] text-xs font-semibold border border-[#283b30] hover:text-[#e1e3df]"
            >
              Open Dialogue
            </Link>
          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why Matched Section */}
            <div className="bg-[#15231c] border border-[#293e32] rounded-2xl p-6">
              <h2 className="text-lg font-newsreader font-semibold text-[#82dbac] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">psychology</span>
                Why {profileData.name} is a {profileData.matchScore}% Match for You
              </h2>
              <ul className="space-y-2 text-xs text-[#c1c8c2]">
                {profileData.matchReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#82dbac] font-bold">✓</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Builder Manifesto */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6">
              <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-3">
                Builder Manifesto & Philosophy
              </h2>
              <p className="text-xs text-[#c1c8c2] leading-relaxed italic bg-[#0f1713] p-4 rounded-xl border border-[#1e2e25]">
                "{profileData.manifesto}"
              </p>
            </div>

            {/* Ventures Affiliation */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6">
              <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-4">
                Ventures & Track Record
              </h2>
              <div className="space-y-4">
                {profileData.ventures.map((v, idx) => (
                  <div key={idx} className="p-4 bg-[#16221c] border border-[#24352b] rounded-xl flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-[#f0f2ee]">{v.name}</h3>
                        <span className="text-[10px] text-[#82dbac] bg-[#1a2d23] px-2 py-0.5 rounded-full">
                          {v.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#a1aca4] mb-1">{v.role}</p>
                      <p className="text-xs text-[#c1c8c2]">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info (1 Col) */}
          <div className="space-y-6">
            {/* Intent Vectors */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-newsreader font-semibold text-[#f0f2ee]">
                Intent Vectors & Bandwidth
              </h3>
              <div className="space-y-3">
                {profileData.vectors.map((vec, idx) => (
                  <div key={idx} className="border-b border-[#1c2c23] pb-2 last:border-0">
                    <span className="text-[10px] text-[#718076] uppercase tracking-wider block">{vec.label}</span>
                    <span className="text-xs font-semibold text-[#e1e3df]">{vec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Strengths */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6">
              <h3 className="text-base font-newsreader font-semibold text-[#f0f2ee] mb-3">
                Core Builder Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((s, idx) => (
                  <span key={idx} className="text-xs bg-[#18251e] text-[#82dbac] px-3 py-1 rounded-lg border border-[#25392e]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Pedigree & Credentials */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6">
              <h3 className="text-base font-newsreader font-semibold text-[#f0f2ee] mb-3">
                Verified Pedigree
              </h3>
              <div className="space-y-3">
                {profileData.pedigree.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-sm text-[#82dbac]">school</span>
                    <div>
                      <p className="font-semibold text-[#f0f2ee]">{p.institution}</p>
                      <p className="text-[11px] text-[#a1aca4]">{p.degree}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Intro Modal */}
      {introModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c1511]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15221c] border border-[#2a3d33] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-newsreader font-semibold text-[#f0f2ee] mb-1">
              Request Intro to {profileData.name}
            </h3>
            <p className="text-xs text-[#a1aca4] mb-4">
              Send a direct intro message powered by BambiFound match alignment.
            </p>
            <form onSubmit={handleSendIntro} className="space-y-4">
              <textarea
                rows={4}
                defaultValue={`Hi ${profileData.name.split(' ')[0]}, I saw our 96% match score on BambiFound and would love to connect!`}
                className="w-full bg-[#101914] border border-[#25392e] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIntroModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#2b3e32] text-xs font-semibold text-[#a1aca4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1]"
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
