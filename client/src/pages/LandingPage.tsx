import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <Navbar />

      <main className="flex-1 w-full pt-20 bg-surface min-h-[calc(100vh-18rem)]">
        <div className="max-w-[1280px] mx-auto px-margin">
          <div className="flex flex-col w-full">

            {/* HERO SECTION */}
            <section className="relative pt-space-xl pb-24 overflow-hidden">
              {/* Ambient organic backdrop accents */}
              <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none"></div>
              <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-center">
                {/* Left Column: Editorial Headline & Actions */}
                <div className="lg:col-span-6 flex flex-col items-start">
                  <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm tracking-wide uppercase mb-6 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Intelligent Builder Matchmaking
                  </div>

                  <h1 className="font-display-lg text-display-lg text-primary tracking-tight max-w-xl">
                    Find the people who help you build.
                  </h1>

                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-lg leading-relaxed">
                    BambiFound connects founders, startups, and talent with the people and opportunities that fit their skills, goals, experience, and ambitions.
                  </p>

                  {/* CTA Cluster */}
                  <div className="flex flex-wrap items-center gap-space-md mt-8">
                    <Link
                      to="/auth/register"
                      className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-primary bg-primary-container hover:bg-primary px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] group"
                    >
                      Get Started
                      <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </Link>

                    <a
                      href="#directory"
                      className="inline-flex items-center font-label-md text-label-md text-on-surface bg-surface-container-lowest hover:bg-surface-container-low px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all border border-outline-variant/40"
                    >
                      Explore Startups
                    </a>
                  </div>

                  {/* Free Founder Sub-link */}
                  <div className="mt-5 flex items-center gap-2">
                    <a href="#list-startup" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors underline decoration-secondary/40 underline-offset-4">
                      List Your Startup — Free
                    </a>
                    <span className="text-on-surface-variant/40">•</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Your first startup profile is free forever.</span>
                  </div>

                  {/* Metric micro-strip */}
                  <div className="mt-12 pt-8 w-full max-w-md grid grid-cols-3 gap-4 border-t border-outline-variant/30">
                    <div>
                      <div className="font-headline-md text-headline-md text-primary tracking-tight">4,800+</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Active Builders</div>
                    </div>
                    <div>
                      <div className="font-headline-md text-headline-md text-primary tracking-tight">620+</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Early Startups</div>
                    </div>
                    <div>
                      <div className="font-headline-md text-headline-md text-primary tracking-tight">94%</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Intent Match Rate</div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Hero Match Preview Module */}
                <div className="lg:col-span-6 w-full">
                  <div className="relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_12px_28px_-6px_rgba(20,40,29,0.08),0_2px_8px_rgba(20,40,29,0.03)] border border-outline-variant/60">
                    {/* Header bar of preview */}
                    <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/30">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm">
                          AC
                        </div>
                        <div>
                          <div className="font-headline-sm text-headline-sm text-on-surface">Alex Rivera</div>
                          <div className="font-body-sm text-body-sm text-on-surface-variant">Co-Founder & CTO @ Stealth Fintech</div>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/50 font-label-sm text-label-sm text-on-surface">
                        <span className="w-2 h-2 rounded-full bg-tertiary-accent animate-pulse"></span>
                        <span className="font-semibold text-primary">96% Synergy Fit</span>
                      </div>
                    </div>

                    {/* Intent Banner */}
                    <div className="my-space-md p-space-md rounded-lg bg-surface-container-low/80 border-l-4 border-primary">
                      <div className="font-label-sm text-label-sm uppercase text-secondary font-semibold">Active Intent</div>
                      <p className="font-body-sm text-body-sm text-on-surface mt-1 italic">
                        "Building a zero-knowledge identity platform. Seeking a lead backend engineer with Rust or Go experience who wants to co-found."
                      </p>
                    </div>

                    {/* Capability Tags */}
                    <div className="space-y-space-xs">
                      <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Matching Capabilities</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-sage-tint text-primary-container font-label-sm text-label-sm">Rust</span>
                        <span className="px-3 py-1 rounded-full bg-sage-tint text-primary-container font-label-sm text-label-sm">Cryptography</span>
                        <span className="px-3 py-1 rounded-full bg-sage-tint text-primary-container font-label-sm text-label-sm">Distributed Systems</span>
                        <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Co-Founder Search</span>
                      </div>
                    </div>

                    {/* Product Intelligence Explanation Box */}
                    <div className="mt-space-md p-space-md rounded-lg bg-surface-container-low border border-outline-variant/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-label-sm text-label-sm uppercase text-primary font-bold flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
                          Why This Matches — Product Intelligence
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">BambiFound AI Engine</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                          Complementary Stack
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                          Co-Founder Commitment
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                          Remote / US Timezone
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CORE PRODUCT LOOP SECTION */}
            <section id="how-it-works" className="py-20 border-t border-outline-variant/30">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider mb-2">How BambiFound Works</div>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  From profile to partnership in four deliberate steps.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg">
                {[
                  { step: '01', title: 'PROFILE', desc: 'Detail your expertise, track record, and technical superpowers.', icon: 'badge' },
                  { step: '02', title: 'INTENT', desc: 'Express what you are building or looking to join in plain language.', icon: 'edit_note' },
                  { step: '03', title: 'MATCH', desc: 'AI engine computes skill complementarity & shared conviction.', icon: 'hub' },
                  { step: '04', title: 'CONNECT', desc: 'Initiate direct 1-on-1 conversations with match intelligence.', icon: 'handshake' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-space-md">
                        <span className="font-label-sm text-label-sm text-tertiary-accent font-bold">{item.step}</span>
                        <span className="material-symbols-outlined text-secondary text-[22px]">{item.icon}</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-2">{item.title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* WHO IT'S FOR SECTION */}
            <section className="py-20 border-t border-outline-variant/30">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider mb-2">Who It's For</div>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                  Tailored for every pathway in the early venture ecosystem.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                <div className="bg-surface-container-lowest p-space-xl rounded-xl border border-outline-variant/40 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">group_add</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Founders & Co-Founders</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                    Find technical or commercial co-founders who complement your skill set and share your industry vision.
                  </p>
                  <Link to="/auth/register" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors inline-flex items-center gap-1">
                    Find a Co-Founder <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>

                <div className="bg-surface-container-lowest p-space-xl rounded-xl border border-outline-variant/40 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Early-Stage Startups</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                    Recruit early engineers, founding designers, and core collaborators aligned with your mission.
                  </p>
                  <a href="#list-startup" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors inline-flex items-center gap-1">
                    List Your Startup <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>

                <div className="bg-surface-container-lowest p-space-xl rounded-xl border border-outline-variant/40 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">terminal</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Technical & Domain Talent</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                    Discover high-conviction stealth projects, seed-stage opportunities, and founding roles.
                  </p>
                  <Link to="/auth/register" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors inline-flex items-center gap-1">
                    Explore Opportunities <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </section>

            {/* STARTUP DISCOVERY SECTION */}
            <section id="directory" className="py-20 border-t border-outline-variant/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
                <div>
                  <div className="font-label-sm text-label-sm uppercase text-secondary font-semibold tracking-wider mb-2">Startup Directory</div>
                  <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                    Explore early ventures looking for builders.
                  </h2>
                </div>
                <Link to="/dashboard" className="font-label-md text-label-md text-secondary hover:text-primary transition-colors inline-flex items-center gap-1">
                  View All Directory <span className="material-symbols-outlined text-[16px]">east</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {[
                  { name: 'Kroma Labs', stage: 'Seed Stage', industry: 'AI Infrastructure', location: 'San Francisco, CA', roles: ['Founding Backend Engineer', 'DevOps Lead'], logo: 'KL' },
                  { name: 'Veritas Health', stage: 'Pre-Seed', industry: 'HealthTech & Bio', location: 'Boston, MA (Remote)', roles: ['Technical Co-Founder', 'Full-Stack Developer'], logo: 'VH' },
                  { name: 'Oasis Energy', stage: 'Series A', industry: 'ClimateTech', location: 'New York, NY', roles: ['Product Designer', 'Growth Lead'], logo: 'OE' }
                ].map((startup, idx) => (
                  <div key={idx} className="bg-surface-container-lowest p-space-lg rounded-xl border border-outline-variant/40 shadow-sm flex flex-col justify-between space-y-space-md">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-space-sm">
                          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center">
                            {startup.logo}
                          </div>
                          <div>
                            <div className="font-headline-sm text-headline-sm text-on-surface">{startup.name}</div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">{startup.location}</div>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
                          {startup.stage}
                        </span>
                      </div>
                      <div className="font-label-sm text-label-sm text-secondary uppercase font-semibold mb-2">{startup.industry}</div>
                      <div className="space-y-1">
                        <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Open Roles:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {startup.roles.map((role, rIdx) => (
                            <span key={rIdx} className="px-2.5 py-1 rounded-full bg-sage-tint text-primary-container font-label-sm text-label-sm">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Link to="/auth/register" className="w-full py-2.5 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg text-center transition-colors">
                      View Opportunities
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* FINAL CTA BANNER */}
            <section className="my-20 p-space-xl rounded-2xl bg-primary-container text-on-primary shadow-level-2">
              <div className="flex flex-col md:flex-row items-center justify-between gap-space-xl text-center md:text-left">
                <div className="space-y-space-xs max-w-xl">
                  <h2 className="font-headline-lg text-headline-lg text-on-primary tracking-tight">
                    Ready to find your people?
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
                    Join high-conviction founders, technical leads, and builders on BambiFound today. Your first startup profile is free forever.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-space-md">
                  <Link
                    to="/auth/register"
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-surface text-primary hover:bg-surface-container-lowest font-headline-sm text-headline-sm font-semibold rounded-full shadow-md transition-all active:scale-[0.98]"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
