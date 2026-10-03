import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface MatchCardData {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  location: string;
  matchScore: number;
  intent: string;
  skills: string[];
  rationale: string[];
  connected?: boolean;
}

const INITIAL_MATCHES: MatchCardData[] = [
  {
    id: 'm1',
    name: 'Sarah Okafor',
    avatar: 'SO',
    headline: 'Lead Cryptographer & Systems Engineer',
    location: 'San Francisco, CA (Remote)',
    matchScore: 96,
    intent: 'Looking for a technical co-founder to launch a zero-knowledge developer identity platform.',
    skills: ['Rust', 'Cryptography', 'Distributed Systems', 'Zero-Knowledge Proofs'],
    rationale: [
      'Complementary Skillset',
      'Shared Build Intent',
      'Domain Alignment'
    ],
    connected: false,
  },
  {
    id: 'm2',
    name: 'Alex Chen',
    avatar: 'AC',
    headline: 'Founding Backend Lead (NestJS / Postgres / Vector)',
    location: 'New York, NY (Hybrid)',
    matchScore: 92,
    intent: 'Seeking early-stage AI startup founding engineer role with equity.',
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Vector Embeddings', 'AI Infrastructure'],
    rationale: [
      'Backend Expertise Match',
      'Full-time Availability',
      'Pre-Seed Stage Experience'
    ],
    connected: false,
  },
  {
    id: 'm3',
    name: 'David Adeleke',
    avatar: 'DA',
    headline: 'Product Designer & GTM Strategist',
    location: 'London, UK (Remote)',
    matchScore: 88,
    intent: 'Looking to join a high-conviction developer tooling venture as founding designer.',
    skills: ['Product Design', 'Design Systems', 'GTM Strategy', 'User Research'],
    rationale: [
      'DevTool UI/UX Alignment',
      'Design System Superpower',
      'European Timezone Coverage'
    ],
    connected: false,
  }
];

export const DashboardPage: React.FC = () => {
  const [matches, setMatches] = useState<MatchCardData[]>(INITIAL_MATCHES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeIntent, setActiveIntent] = useState(
    'Building a zero-knowledge developer identity platform. Looking for a technical co-founder with cryptography and Rust expertise.'
  );
  const [isEditingIntent, setIsEditingIntent] = useState(false);
  const [tempIntent, setTempIntent] = useState(activeIntent);

  const handleConnectToggle = (id: string) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === id ? { ...m, connected: !m.connected } : m))
    );
  };

  const filteredMatches = matches.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      m.name.toLowerCase().includes(q) ||
      m.headline.toLowerCase().includes(q) ||
      m.skills.some((s) => s.toLowerCase().includes(q));

    if (selectedFilter === 'All') return matchesQuery;
    if (selectedFilter === 'Co-Founders') return matchesQuery && m.matchScore >= 90;
    if (selectedFilter === 'Engineering') return matchesQuery && m.skills.some((s) => ['Rust', 'Node.js', 'NestJS'].includes(s));
    if (selectedFilter === 'Design') return matchesQuery && m.skills.includes('Product Design');
    return matchesQuery;
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between font-body-md text-on-surface antialiased">
      <Navbar />

      <main className="flex-1 w-full pt-24 pb-16 px-margin">
        <div className="max-w-[1280px] mx-auto flex flex-col space-y-space-lg">

          {/* WELCOME HERO & PIPELINE BANNER */}
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-space-xs">
                <h1 className="font-headline-lg text-headline-lg text-primary">Good morning, Alex</h1>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                  85% Profile Complete
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Your AI Match Engine is actively discovering complementary builders and opportunities.
              </p>
            </div>

            {/* Value Proposition Pipeline Bar */}
            <div className="hidden lg:flex items-center gap-2 p-2 rounded-xl bg-surface-container-low font-label-sm text-label-sm">
              <span className="px-2 py-1 bg-surface-container-lowest rounded font-bold text-primary">PROFILE</span>
              <span className="text-outline">→</span>
              <span className="px-2 py-1 bg-surface-container-lowest rounded font-bold text-primary">INTENT</span>
              <span className="text-outline">→</span>
              <span className="px-2 py-1 bg-surface-container-lowest rounded font-bold text-secondary">AI UNDERSTANDING</span>
              <span className="text-outline">→</span>
              <span className="px-2 py-1 bg-surface-container-lowest rounded font-bold text-tertiary-accent">MATCH</span>
              <span className="text-outline">→</span>
              <span className="px-2 py-1 bg-surface-container-lowest rounded font-bold text-primary">CONNECT</span>
            </div>
          </div>

          {/* ACTIVE INTENT BAR */}
          <div className="p-space-md sm:p-space-lg rounded-xl bg-primary-container text-on-primary shadow-level-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-primary-container uppercase font-semibold tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">psychology</span>
                Your Active Natural Intent
              </div>
              <button
                type="button"
                onClick={() => setIsEditingIntent(!isEditingIntent)}
                className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
                {isEditingIntent ? 'Cancel' : 'Edit Intent'}
              </button>
            </div>

            {isEditingIntent ? (
              <div className="space-y-2">
                <textarea
                  rows={3}
                  value={tempIntent}
                  onChange={(e) => setTempIntent(e.target.value)}
                  className="w-full p-3 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setActiveIntent(tempIntent);
                    setIsEditingIntent(false);
                  }}
                  className="px-4 py-2 bg-surface text-primary font-label-md text-label-md font-semibold rounded-lg hover:bg-surface-container-low transition-colors"
                >
                  Save Active Intent
                </button>
              </div>
            ) : (
              <p className="font-headline-sm text-headline-sm text-on-primary font-normal italic leading-relaxed">
                "{activeIntent}"
              </p>
            )}
          </div>

          {/* MAIN CONTENT GRID (FEED + SIDEBAR) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">

            {/* LEFT COLUMN: MATCHES FEED (8 cols) */}
            <div className="lg:col-span-8 space-y-space-md">

              {/* SEARCH & FILTER STRIP */}
              <div className="p-space-md bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm space-y-space-sm">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search builders, skills (Rust, NestJS), or intentions..."
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg outline-none placeholder:text-outline/60 focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#14281D]"
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline/60 text-[20px]">search</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold mr-1">Filter:</span>
                  {['All', 'Co-Founders', 'Engineering', 'Design'].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                        selectedFilter === filter
                          ? 'bg-primary-container text-on-primary font-semibold'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* MATCH CARDS LIST */}
              <div className="space-y-space-md">
                {filteredMatches.map((m) => (
                  <div
                    key={m.id}
                    className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-level-1 hover:shadow-level-2 transition-all space-y-space-md"
                  >
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/30">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm">
                          {m.avatar}
                        </div>
                        <div>
                          <div className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                            <span>{m.name}</span>
                            <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{m.headline}</p>
                          <p className="font-label-sm text-label-sm text-outline">{m.location}</p>
                        </div>
                      </div>

                      {/* Match Score Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/50 font-label-sm text-label-sm text-on-surface shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-tertiary-accent animate-pulse"></span>
                        <span className="font-bold text-primary">{m.matchScore}% Synergy Fit</span>
                      </div>
                    </div>

                    {/* Intent Context */}
                    <div className="p-space-sm rounded-lg bg-surface-container-low/70 border-l-3 border-secondary">
                      <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Active Objective</div>
                      <p className="font-body-sm text-body-sm text-on-surface mt-0.5 italic">
                        "{m.intent}"
                      </p>
                    </div>

                    {/* Skills Chips */}
                    <div className="space-y-1">
                      <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Matching Capabilities</div>
                      <div className="flex flex-wrap gap-1.5">
                        {m.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${
                              idx < 2 ? 'bg-sage-tint text-primary-container font-semibold' : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Product Intelligence Explanation Module */}
                    <div className="p-space-md rounded-lg bg-surface-container-low border border-outline-variant/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-label-sm text-label-sm uppercase text-primary font-bold flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
                          Why This Matches — Product Intelligence
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">BambiFound AI Engine</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
                        {m.rationale.map((r, rIdx) => (
                          <div key={rIdx} className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-space-xs flex items-center justify-between gap-space-sm">
                      <button
                        type="button"
                        onClick={() => handleConnectToggle(m.id)}
                        className={`px-5 py-2.5 rounded-full font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
                          m.connected
                            ? 'bg-sage-tint text-primary-container border border-outline-variant/60'
                            : 'bg-primary-container text-on-primary hover:bg-primary shadow-sm'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {m.connected ? 'task_alt' : 'person_add'}
                        </span>
                        <span>{m.connected ? 'Connection Request Sent' : 'Connect'}</span>
                      </button>

                      <div className="flex items-center gap-space-xs">
                        <button
                          type="button"
                          className="px-4 py-2.5 rounded-full border border-outline-variant/60 text-on-surface hover:bg-surface-container-low font-label-md text-label-md transition-colors"
                        >
                          Save Profile
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT COLUMN: SIDEBAR (4 cols) */}
            <div className="lg:col-span-4 space-y-space-md">

              {/* PROFILE STATS CARD */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm space-y-space-md">
                <h3 className="font-headline-sm text-headline-sm text-primary">Your Match Stats</h3>
                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                    <div className="font-headline-md text-headline-md text-primary">12</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">New Matches</div>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                    <div className="font-headline-md text-headline-md text-secondary">4</div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">Pending Connections</div>
                  </div>
                </div>
              </div>

              {/* QUICK SUGGESTIONS / OPPORTUNITIES */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm space-y-space-md">
                <h3 className="font-headline-sm text-headline-sm text-primary">Featured Early Startups</h3>
                <div className="space-y-space-sm">
                  {[
                    { name: 'Kroma Labs', stage: 'Seed', role: 'Founding Engineer' },
                    { name: 'Veritas Health', stage: 'Pre-Seed', role: 'Technical Co-Founder' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                      <div>
                        <div className="font-label-md text-label-md text-on-surface font-semibold">{item.name}</div>
                        <div className="font-body-sm text-body-sm text-on-surface-variant">{item.role}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-sage-tint text-primary-container font-label-sm text-label-sm font-semibold">
                        {item.stage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
