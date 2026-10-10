import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';

export const DiscoverPage: React.FC = () => {
  const { user } = useAuth();
  const [builders, setBuilders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [minScore, setMinScore] = useState<number>(70);

  const [introModalOpen, setIntroModalOpen] = useState<boolean>(false);
  const [selectedBuilder, setSelectedBuilder] = useState<any>(null);
  const [introNote, setIntroNote] = useState<string>('');
  const [introToast, setIntroToast] = useState<boolean>(false);

  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/ai/discover');
        setBuilders(res.data || []);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchBuilders();
  }, []);

  const filteredBuilders = builders.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.tags && b.tags.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesRole = selectedRole === 'ALL' || b.category === selectedRole;
    const matchesScore = b.score >= minScore;
    return matchesSearch && matchesRole && matchesScore;
  });

  const handleOpenIntro = (builder: any) => {
    setSelectedBuilder(builder);
    setIntroNote(`Hi ${builder.name.split(' ')[0]}, I saw our ${builder.score}% match score on BambiFound and would love to explore venture collaboration!`);
    setIntroModalOpen(true);
  };

  const handleSendIntro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBuilder) return;
    try {
      await api.post('/connections', {
        recipientId: selectedBuilder.id,
        note: introNote,
      });
      setIntroModalOpen(false);
      setIntroToast(true);
      setTimeout(() => setIntroToast(false), 4000);
    } catch {
      setIntroModalOpen(false);
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
              <Link to="/discover" className="text-sm font-medium text-[#82dbac] border-b-2 border-[#82dbac] pb-1">
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

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-8">
        {/* Header Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-newsreader font-semibold text-[#f0f2ee] mb-2">
            Discover Curated Builders
          </h1>
          <p className="text-sm text-[#a1aca4]">
            Browse high-conviction technical founders, AI leads, and early operators mapped against your profile vectors in PostgreSQL.
          </p>
        </div>

        {introToast && (
          <div className="mb-6 p-4 bg-[#1b3326] border border-[#2d523e] rounded-xl text-xs text-[#82dbac] flex items-center justify-between">
            <span>Intro request sent to <strong>{selectedBuilder?.name}</strong>!</span>
            <button onClick={() => setIntroToast(false)} className="text-[#a1aca4]">✕</button>
          </div>
        )}

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-6 h-fit space-y-6">
            <h3 className="text-base font-newsreader font-semibold text-[#f0f2ee]">
              Filter Vectors
            </h3>

            {/* Search Input */}
            <div>
              <label className="block text-xs font-medium text-[#a1aca4] mb-2">Search Query</label>
              <input
                type="text"
                placeholder="Search skills, roles, names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0d1612] border border-[#23352b] rounded-xl p-2.5 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
              />
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-xs font-medium text-[#a1aca4] mb-2">Primary Role Focus</label>
              <div className="space-y-2">
                {['ALL', 'AI Architect', 'Founding Engineer', 'Product Lead'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      selectedRole === role
                        ? 'bg-[#82dbac] text-[#0c1511] font-bold'
                        : 'bg-[#18251e] text-[#a1aca4] hover:text-[#e1e3df]'
                    }`}
                  >
                    {role === 'ALL' ? 'All Roles' : role}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Match Score */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-[#a1aca4]">Min Match Score</label>
                <span className="text-xs font-bold text-[#82dbac]">{minScore}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="w-full accent-[#82dbac] cursor-pointer"
              />
            </div>
          </div>

          {/* Builder Cards Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between text-xs text-[#a1aca4]">
              <span>Showing {filteredBuilders.length} curated matches</span>
              <span>Sorted by AI Vector Alignment</span>
            </div>

            {isLoading ? (
              <div className="text-center py-12 text-[#a1aca4]">Loading AI matches from database...</div>
            ) : filteredBuilders.length === 0 ? (
              <div className="bg-[#121c17] border border-[#23352b] rounded-2xl p-12 text-center text-[#a1aca4]">
                No builders found matching your criteria. Try adjusting filters or search query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBuilders.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#121c17] border border-[#23352b] hover:border-[#2e4539] rounded-2xl p-6 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#1d2f24] border border-[#2b3e32] flex items-center justify-center font-bold text-[#82dbac] text-xs">
                            {b.avatar}
                          </div>
                          <div>
                            <Link to={`/profile/${b.id}`} className="text-base font-semibold text-[#f0f2ee] hover:text-[#82dbac] transition-colors">
                              {b.name}
                            </Link>
                            <p className="text-xs text-[#a1aca4]">{b.role}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#82dbac] bg-[#1a2d23] px-2.5 py-1 rounded-full border border-[#284234]">
                          {b.score}% MATCH
                        </span>
                      </div>

                      <p className="text-xs text-[#c1c8c2] mb-4 line-clamp-3">
                        {b.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {b.tags && b.tags.map((t: string, idx: number) => (
                          <span key={idx} className="text-[10px] bg-[#18251e] text-[#a1aca4] px-2 py-0.5 rounded-lg border border-[#24352b]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#1d2c23] flex items-center justify-between">
                      <span className="text-[11px] text-[#718076]">{b.bandwidth}</span>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/profile/${b.id}`}
                          className="px-3 py-1.5 rounded-lg bg-[#18241e] border border-[#27382d] text-xs font-medium text-[#c1c8c2] hover:text-[#e1e3df]"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => handleOpenIntro(b)}
                          className="px-3 py-1.5 rounded-lg bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all"
                        >
                          Request Intro
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Intro Modal */}
      {introModalOpen && selectedBuilder && (
        <div className="fixed inset-0 z-50 bg-[#0c1511]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15221c] border border-[#2a3d33] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-newsreader font-semibold text-[#f0f2ee] mb-1">
              Connect with {selectedBuilder.name}
            </h3>
            <p className="text-xs text-[#a1aca4] mb-4">
              Write a brief introductory note to trigger a connection request.
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
                  Send Intro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
