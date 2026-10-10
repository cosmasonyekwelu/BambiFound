import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export const PeerProfilePage: React.FC = () => {
  const { id: profileId } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [introModalOpen, setIntroModalOpen] = useState<boolean>(false);
  const [introNote, setIntroNote] = useState<string>('');
  const [introToast, setIntroToast] = useState<boolean>(false);
  const [targetUserId, setTargetUserId] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        if (!profileId) return;
        const res = await api.get(`/profiles/${profileId}`);
        setProfile(res.data);
        setTargetUserId(res.data.userId || res.data.user?.id || profileId);
        setIntroNote(`Hi ${res.data.user?.fullName?.split(' ')[0] || 'Builder'}, I saw your profile on BambiFound and would love to connect!`);
      } catch {
        // Handle missing profile
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [profileId]);

  const handleSendIntro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/connections', {
        recipientId: targetUserId,
        note: introNote,
      });
      setIntroModalOpen(false);
      setIntroToast(true);
      setTimeout(() => setIntroToast(false), 4000);
    } catch {
      setIntroModalOpen(false);
    }
  };

  const name = profile?.user?.fullName || profile?.headline || 'Elena Vance';
  const role = profile?.headline || profile?.role || 'AI Systems Architect & Ex-Scale AI Lead';
  const location = profile?.location || 'San Francisco, CA (Remote)';
  const avatar = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2) || 'EV';
  const bio = profile?.bio || 'Building robust zero-to-one infrastructure for autonomous AI agents and early-stage startup collaboration.';
  const skills = profile?.skills && profile.skills.length > 0 ? profile.skills : ['PyTorch', 'Distributed Systems', 'LLM Fine-Tuning', 'Rust', 'Go'];

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
        {isLoading && (
          <div className="mb-6 p-4 bg-[#15231c] border border-[#293e32] rounded-xl text-xs text-[#a1aca4]">
            Loading profile...
          </div>
        )}
        {introToast && (
          <div className="mb-6 p-4 bg-[#1b3326] border border-[#2d523e] rounded-xl text-xs text-[#82dbac] flex items-center justify-between">
            <span>Intro request sent to <strong>{name}</strong>! Check Intros & Messages for updates.</span>
            <button onClick={() => setIntroToast(false)} className="text-[#a1aca4]">✕</button>
          </div>
        )}

        {/* Hero Card */}
        <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-[#1e3126] border-2 border-[#82dbac] flex items-center justify-center font-bold text-2xl text-[#82dbac]">
              {avatar}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-newsreader font-semibold text-[#f0f2ee]">
                  {name}
                </h1>
                <span className="text-xs font-bold text-[#82dbac] bg-[#1a2d23] px-3 py-1 rounded-full border border-[#284234]">
                  96% MATCH
                </span>
              </div>
              <p className="text-sm text-[#a1aca4] mb-1">{role}</p>
              <p className="text-xs text-[#718076]">{location}</p>
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
                Why {name} is a high-conviction match for you
              </h2>
              <ul className="space-y-2 text-xs text-[#c1c8c2]">
                <li className="flex items-start gap-2">
                  <span className="text-[#82dbac] font-bold">✓</span>
                  <span>High overlap in system architecture and technical execution.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#82dbac] font-bold">✓</span>
                  <span>Complementary operational experience scaling early-stage engineering teams.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#82dbac] font-bold">✓</span>
                  <span>Shared conviction in autonomous developer tools and startup building.</span>
                </li>
              </ul>
            </div>

            {/* Builder Manifesto */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6">
              <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-3">
                Builder Manifesto & Narrative
              </h2>
              <p className="text-xs text-[#c1c8c2] leading-relaxed italic bg-[#0f1713] p-4 rounded-xl border border-[#1e2e25]">
                "{bio}"
              </p>
            </div>
          </div>

          {/* Sidebar Info (1 Col) */}
          <div className="space-y-6">
            {/* Skills & Strengths */}
            <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6">
              <h3 className="text-base font-newsreader font-semibold text-[#f0f2ee] mb-3">
                Core Builder Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s: string, idx: number) => (
                  <span key={idx} className="text-xs bg-[#18251e] text-[#82dbac] px-3 py-1 rounded-lg border border-[#25392e]">
                    {s}
                  </span>
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
              Request Intro to {name}
            </h3>
            <p className="text-xs text-[#a1aca4] mb-4">
              Send a direct intro message powered by BambiFound match alignment.
            </p>
            <form onSubmit={handleSendIntro} className="space-y-4">
              <textarea
                rows={4}
                value={introNote}
                onChange={(e) => setIntroNote(e.target.value)}
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
