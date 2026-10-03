import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const VenturesPage: React.FC = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [ventures, setVentures] = useState([
    {
      id: 'kiteflow',
      name: 'KiteFlow Systems',
      stage: 'Early Prototype / Pre-Seed',
      tagline: 'High-throughput event stream orchestration for AI agent workflows.',
      description: 'Distributed event bus engine built in Rust & TypeScript. Looking for a commercial co-founder to lead customer discovery.',
      status: 'Active',
      rolesNeeded: ['Product Lead', 'GTM Advisor'],
      created: '2 weeks ago',
    },
    {
      id: 'horizon-carbon',
      name: 'Horizon Carbon',
      stage: 'Spin-out Ideation',
      tagline: 'Automated carbon offset intelligence for enterprise supply chains.',
      description: 'AI model evaluating supply chain emissions data with cryptographic verification audit trails.',
      status: 'Spin-out',
      rolesNeeded: ['Technical Lead', 'Climate Domain Expert'],
      created: '1 month ago',
    },
  ]);

  const [newVenture, setNewVenture] = useState({
    name: '',
    stage: 'Ideation / Prototype',
    tagline: '',
    description: '',
    rolesNeeded: 'Founding Engineer, Co-founder',
  });

  const handleCreateVenture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenture.name.trim()) return;

    const created = {
      id: newVenture.name.toLowerCase().replace(/\s+/g, '-'),
      name: newVenture.name,
      stage: newVenture.stage,
      tagline: newVenture.tagline || 'Next-generation AI venture.',
      description: newVenture.description || 'Early stage venture listed on BambiFound.',
      status: 'Active',
      rolesNeeded: newVenture.rolesNeeded.split(',').map((r) => r.trim()),
      created: 'Just now',
    };

    setVentures([created, ...ventures]);
    setModalOpen(false);
    setNewVenture({
      name: '',
      stage: 'Ideation / Prototype',
      tagline: '',
      description: '',
      rolesNeeded: 'Founding Engineer, Co-founder',
    });
    setToastMessage(`Venture "${created.name}" successfully listed!`);
    setTimeout(() => setToastMessage(null), 4000);
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
              <Link to="/ventures" className="text-sm font-medium text-[#82dbac] border-b-2 border-[#82dbac] pb-1">
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-newsreader font-semibold text-[#f0f2ee] mb-1">
              Your Venture Listings
            </h1>
            <p className="text-sm text-[#a1aca4]">
              List your active projects or spin-out ventures to attract high-conviction co-founders and fractional talent.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1] transition-all self-start md:self-auto"
          >
            + Spin Out or List Venture
          </button>
        </div>

        {toastMessage && (
          <div className="mb-6 p-4 bg-[#1b3326] border border-[#2d523e] rounded-xl text-xs text-[#82dbac] flex items-center justify-between">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-[#a1aca4]">✕</button>
          </div>
        )}

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {ventures.map((v) => (
            <div
              key={v.id}
              className="bg-[#121c17] border border-[#23352b] hover:border-[#2e4539] rounded-2xl p-6 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#82dbac] bg-[#1a2d23] px-2.5 py-1 rounded-full border border-[#284234]">
                    {v.stage}
                  </span>
                  <span className="text-[11px] text-[#718076]">Listed {v.created}</span>
                </div>

                <h3 className="text-xl font-newsreader font-semibold text-[#f0f2ee] mb-1">
                  {v.name}
                </h3>
                <p className="text-xs font-medium text-[#a1aca4] mb-3">{v.tagline}</p>
                <p className="text-xs text-[#c1c8c2] leading-relaxed mb-4">{v.description}</p>

                <div className="mb-4">
                  <span className="text-[10px] text-[#718076] uppercase tracking-wider block mb-1">Seeking Roles</span>
                  <div className="flex flex-wrap gap-1.5">
                    {v.rolesNeeded.map((r, idx) => (
                      <span key={idx} className="text-[10px] bg-[#18251e] text-[#82dbac] px-2.5 py-0.5 rounded-lg border border-[#24352b]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1d2c23] flex items-center justify-between">
                <span className="text-[11px] text-[#82dbac]">Matching Active</span>
                <Link
                  to="/discover"
                  className="text-xs font-semibold text-[#c1c8c2] hover:text-[#82dbac]"
                >
                  Find Candidates →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* New Venture Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c1511]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15221c] border border-[#2a3d33] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl font-newsreader font-semibold text-[#f0f2ee] mb-1">
              List a New Venture
            </h3>
            <p className="text-xs text-[#a1aca4] mb-4">
              Enter your venture details to start generating AI vector match signals across BambiFound builders.
            </p>

            <form onSubmit={handleCreateVenture} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Venture Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Compute"
                  value={newVenture.name}
                  onChange={(e) => setNewVenture({ ...newVenture, name: e.target.value })}
                  className="w-full bg-[#101914] border border-[#25392e] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Elevator Pitch / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Autonomous GPU compute marketplace"
                  value={newVenture.tagline}
                  onChange={(e) => setNewVenture({ ...newVenture, tagline: e.target.value })}
                  className="w-full bg-[#101914] border border-[#25392e] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the problem, tech stack, and momentum..."
                  value={newVenture.description}
                  onChange={(e) => setNewVenture({ ...newVenture, description: e.target.value })}
                  className="w-full bg-[#101914] border border-[#25392e] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c1c8c2] mb-1">Roles Needed (comma-separated)</label>
                <input
                  type="text"
                  value={newVenture.rolesNeeded}
                  onChange={(e) => setNewVenture({ ...newVenture, rolesNeeded: e.target.value })}
                  className="w-full bg-[#101914] border border-[#25392e] rounded-xl p-3 text-xs text-[#e1e3df] focus:outline-none focus:border-[#82dbac]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#2b3e32] text-xs font-semibold text-[#a1aca4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#82dbac] text-[#0c1511] text-xs font-bold hover:bg-[#97f0c1]"
                >
                  Publish Venture Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
