import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface font-hanken text-on-surface flex flex-col">
      <Navbar />

      <main className="w-full pt-20 bg-surface flex-grow">
        <div className="flex flex-col w-full">
          {/* Top Notification Accent Pill */}
          <div className="w-full flex justify-center px-gutter pt-space-md">
            <Link
              to="/auth/register"
              className="group inline-flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-surface-container-high hover:bg-secondary-container transition-all duration-300 shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-tertiary-container animate-pulse" />
              <span className="font-label-sm text-label-sm text-on-surface font-semibold tracking-wide uppercase">
                List Your Startup — Free
              </span>
              <span className="text-on-surface-variant font-body-sm text-body-sm hidden sm:inline">
                · Your first startup profile is free forever
              </span>
              <span className="material-symbols-outlined text-base text-on-surface-variant group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Hero Section */}
          <section className="relative w-full max-w-[1360px] mx-auto px-gutter pt-space-lg pb-space-xl overflow-hidden">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-primary-fixed/30 via-secondary-container/20 to-transparent blur-3xl opacity-70 -z-10" />
            <div className="pointer-events-none absolute top-48 right-12 w-[380px] h-[260px] bg-tertiary-fixed/25 blur-3xl rounded-full opacity-60 -z-10" />

            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container text-on-primary-container text-label-sm font-label-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm text-on-tertiary-container font-fill">
                  explore
                </span>
                <span>AI-Powered Startup Ecosystem · FIND → MATCH → CONNECT → BUILD</span>
              </div>

              <h1 className="font-display-lg text-display-lg text-primary tracking-tight max-w-3xl">
                Find the people who help you build.
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Connect with co-founders, join early-stage startups, and find mission-aligned technical talent through intent-based AI matching.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-space-md pt-space-sm">
                <Link
                  to="/auth/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md transition-all active:scale-[0.985] shadow-sm"
                >
                  <span>Get Started — Free</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link
                  to="/auth/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-md text-label-md transition-all"
                >
                  <span>Sign In</span>
                </Link>
              </div>
            </div>

            {/* Interactive Preview Match Card */}
            <div className="mt-space-xl max-w-4xl mx-auto rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-space-lg shadow-[0_4px_20px_rgba(25,28,26,0.04)]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-space-md border-b border-surface-container-high pb-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center font-bold text-lg">
                    BF
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-space-xs">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Alex Rivera</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        Verified Founder
                      </span>
                    </div>
                    <p className="font-body-sm text-on-surface-variant">Technical Co-founder & CTO @ Stealth AI</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-secondary-container/60 text-primary font-label-md text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-tertiary-container" />
                  <span>96% Synergy Match</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-md text-left">
                <div className="space-y-1">
                  <span className="text-xs text-outline uppercase tracking-wider font-semibold">Looking For</span>
                  <p className="text-sm text-on-surface font-medium">Founding Engineer (AI / NestJS)</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-outline uppercase tracking-wider font-semibold">Stage</span>
                  <p className="text-sm text-on-surface font-medium">Pre-Seed · Seed Stage</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-outline uppercase tracking-wider font-semibold">Match Explanation</span>
                  <p className="text-sm text-on-surface-variant">
                    Shared focus on distributed backend architecture, vector embeddings, and early-stage startup execution.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Value Proposition Pipeline */}
          <section className="w-full bg-surface-container-low py-space-xl border-y border-outline-variant/30">
            <div className="max-w-[1360px] mx-auto px-gutter text-center">
              <h2 className="font-headline-md text-headline-md text-primary mb-space-lg">
                The BambiFound Synergy Pipeline
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-space-sm max-w-5xl mx-auto">
                {[
                  { step: '01', title: 'PROFILE', desc: 'Define who you are' },
                  { step: '02', title: 'INTENT', desc: 'Specify what you need' },
                  { step: '03', title: 'AI UNDERSTANDING', desc: 'Extract core skills' },
                  { step: '04', title: 'MATCH', desc: 'Hybrid vector search' },
                  { step: '05', title: 'EXPLANATION', desc: 'Clear why & overlap' },
                  { step: '06', title: 'CONNECTION', desc: 'Direct outreach' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center bg-surface-container-lowest p-space-md rounded-lg border border-outline-variant/40 shadow-xs">
                    <span className="text-xs font-bold text-tertiary-container">{item.step}</span>
                    <span className="font-label-md text-xs font-bold text-primary mt-1">{item.title}</span>
                    <span className="text-[11px] text-on-surface-variant mt-1">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Features Grid */}
          <section className="w-full max-w-[1360px] mx-auto px-gutter py-space-xl">
            <div className="text-center max-w-2xl mx-auto mb-space-xl">
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Designed for speed, clarity, and alignment.
              </h2>
              <p className="font-body-md text-on-surface-variant mt-space-xs">
                Every feature is engineered to eliminate noise and connect high-conviction builders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-xs space-y-space-sm text-left">
                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">center_focus_strong</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Intent-Based Discovery</h3>
                <p className="font-body-sm text-on-surface-variant">
                  Match based on active goals—whether you're looking for a co-founder, hiring founding engineers, or seeking opportunities.
                </p>
              </div>

              <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-xs space-y-space-sm text-left">
                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">AI Profile Understanding</h3>
                <p className="font-body-sm text-on-surface-variant">
                  Our LLM abstraction layer understands unstructured bios, experiences, and technical stacks to surface hidden synergies.
                </p>
              </div>

              <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-outline-variant/50 shadow-xs space-y-space-sm text-left">
                <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Transparent Match Explanations</h3>
                <p className="font-body-sm text-on-surface-variant">
                  Never guess why someone was recommended. Every match includes a plain-language explanation of shared goals and complementary skills.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="w-full bg-primary-container text-on-primary py-space-xl">
            <div className="max-w-[1360px] mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-lg text-center md:text-left">
              <div className="space-y-space-xs">
                <h2 className="font-headline-lg text-headline-lg text-on-primary">
                  Ready to find your people?
                </h2>
                <p className="font-body-lg text-on-primary-container">
                  Join founders, technical leads, and builders on BambiFound today.
                </p>
              </div>
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center px-space-xl py-3.5 rounded-lg bg-inverse-primary text-on-primary-fixed font-label-md text-label-md font-bold hover:bg-white transition-colors"
              >
                Create Your Account
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
