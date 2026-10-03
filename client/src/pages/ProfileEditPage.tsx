import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProfileEditPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>(user?.fullName || 'Alex Morgan');
  const [roleTitle, setRoleTitle] = useState<string>('Founding Systems & Full-Stack Engineer');
  const [location, setLocation] = useState<string>('San Francisco, CA (Hybrid)');
  const [bandwidth, setBandwidth] = useState<string>('Full-time Co-founder (40+ hrs/wk)');
  const [intent, setIntent] = useState<string>('Building a venture or project');
  const [manifesto, setManifesto] = useState<string>(
    'Building high-velocity developer tools with high system throughput. Seeking a product-minded commercial co-founder with domain expertise.'
  );

  const [skills, setSkills] = useState<string[]>([
    'TypeScript',
    'PostgreSQL',
    'Distributed Systems',
    'Next.js',
    'NestJS',
    'AI Vector Engines',
  ]);
  const [newSkillInput, setNewSkillInput] = useState<string>('');

  const [savedToast, setSavedToast] = useState<boolean>(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ fullName });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
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

      {/* Main Form Container */}
      <main className="flex-1 max-w-[1000px] mx-auto w-full px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-newsreader font-semibold text-[#f0f2ee] mb-1">
              Edit Your Builder Profile
            </h1>
            <p className="text-sm text-[#a1aca4]">
              Update your alignment vectors, narrative, and skills graph to refine AI matching.
            </p>
          </div>
          <Link
            to="/settings/membership"
            className="text-xs font-semibold text-[#82dbac] bg-[#1a2d23] px-3 py-2 rounded-xl border border-[#284234] hover:bg-[#223d2f]"
          >
            Manage Membership
          </Link>
        </div>

        {savedToast && (
          <div className="mb-6 p-4 bg-[#1b3326] border border-[#2d523e] rounded-xl text-xs text-[#82dbac] flex items-center justify-between">
            <span>Profile changes saved successfully!</span>
            <button onClick={() => setSavedToast(false)} className="text-[#a1aca4]">✕</button>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-8">
          {/* Section 1: Basic Identity */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-2">
              Identity & Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Primary Title / Focus</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Location / Timezone</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Weekly Bandwidth</label>
                <select
                  value={bandwidth}
                  onChange={(e) => setBandwidth(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                >
                  <option value="Full-time Co-founder (40+ hrs/wk)">Full-time Co-founder (40+ hrs/wk)</option>
                  <option value="Part-time / Fractional (15-20 hrs/wk)">Part-time / Fractional (15-20 hrs/wk)</option>
                  <option value="Advisory (5-10 hrs/wk)">Advisory (5-10 hrs/wk)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Intent & Manifesto */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-2">
              Intent & Builder Philosophy
            </h2>

            <div>
              <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Primary Ecosystem Intent</label>
              <select
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
              >
                <option value="Building a venture or project">I’m building a venture or project</option>
                <option value="Looking for a co-founder">I’m looking for a technical or commercial co-founder</option>
                <option value="Looking for a startup to join">I’m looking for an early-stage venture to join</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Builder Narrative / Manifesto</label>
              <textarea
                rows={4}
                value={manifesto}
                onChange={(e) => setManifesto(e.target.value)}
                className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
              />
            </div>
          </div>

          {/* Section 3: Skills Graph */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-2">
              Strengths & Skills Graph
            </h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((s, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 text-xs bg-[#18251e] text-[#82dbac] px-3 py-1.5 rounded-xl border border-[#25392e]">
                  {s}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="hover:text-red-400 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new skill or tech stack tag..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                className="flex-1 bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-3 rounded-xl bg-[#1d2d24] text-[#82dbac] text-xs font-semibold border border-[#2e4338] hover:bg-[#25392f]"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-5 py-3 rounded-xl border border-[#2b3e32] text-xs font-semibold text-[#a1aca4] hover:text-[#e1e3df]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
