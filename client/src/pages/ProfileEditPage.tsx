import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export const ProfileEditPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>(user?.fullName || '');
  const [headline, setHeadline] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [bandwidth, setBandwidth] = useState<string>('Full-time Co-founder (40+ hrs/wk)');
  const [category, setCategory] = useState<string>('Founding Builder');
  const [bio, setBio] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState<string>('');
  const [linkedinUrl, setLinkedinUrl] = useState<string>('');
  const [twitterUrl, setTwitterUrl] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');

  const [newSkillInput, setNewSkillInput] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/profiles/me');
        const p = res.data;
        if (p.user?.fullName) setFullName(p.user.fullName);
        if (p.headline) setHeadline(p.headline);
        if (p.location) setLocation(p.location);
        if (p.bandwidth) setBandwidth(p.bandwidth);
        if (p.category) setCategory(p.category);
        if (p.bio) setBio(p.bio);
        if (p.skills && Array.isArray(p.skills)) setSkills(p.skills);
        if (p.githubUrl) setGithubUrl(p.githubUrl);
        if (p.linkedinUrl) setLinkedinUrl(p.linkedinUrl);
        if (p.twitterUrl) setTwitterUrl(p.twitterUrl);
        if (p.websiteUrl) setWebsiteUrl(p.websiteUrl);
      } catch {
        // use default state
      }
    };
    loadProfile();
  }, []);

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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.patch('/profiles/me', {
        headline,
        location,
        bandwidth,
        category,
        bio,
        skills,
        githubUrl,
        linkedinUrl,
        twitterUrl,
        websiteUrl,
      });
      updateUser({ fullName });
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    } catch {
      // ignore
    } finally {
      setIsSaving(false);
    }
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
            <span>Profile changes saved successfully in PostgreSQL!</span>
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
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Professional Headline / Role</label>
                <input
                  type="text"
                  value={headline}
                  placeholder="e.g. AI Systems Architect & Ex-Scale AI Lead"
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Location / Timezone</label>
                <input
                  type="text"
                  value={location}
                  placeholder="e.g. San Francisco, CA (Remote)"
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

          {/* Section 2: Category & Bio */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-2">
              Focus Category & Narrative
            </h2>

            <div>
              <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Primary Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
              >
                <option value="AI Architect">AI Architect</option>
                <option value="Founding Engineer">Founding Engineer</option>
                <option value="Product Lead">Product Lead</option>
                <option value="Founding Operator">Founding Operator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Builder Narrative / Bio</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Share your background, what you're building, and the exact co-founder alignment you seek..."
                className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
              />
            </div>
          </div>

          {/* Section 3: Skills Graph */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-2">
              Strengths & Capabilities Graph
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
                placeholder="Add a new capability tag..."
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

          {/* Section 4: Social / External Links */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-newsreader font-semibold text-[#f0f2ee] mb-2">
              External Profiles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  placeholder="https://github.com/yourhandle"
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  value={linkedinUrl}
                  placeholder="https://linkedin.com/in/yourhandle"
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Twitter / X URL</label>
                <input
                  type="url"
                  value={twitterUrl}
                  placeholder="https://x.com/yourhandle"
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Personal Website URL</label>
                <input
                  type="url"
                  value={websiteUrl}
                  placeholder="https://yourwebsite.com"
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full bg-[#0c1511] border border-[#23352b] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                />
              </div>
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
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
