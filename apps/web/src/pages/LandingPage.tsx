import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header />

      <main className="w-full pt-20 bg-surface flex-1">
        <div className="flex flex-col w-full">
          {/* Top Notification Accent Pill */}
          <div className="w-full flex justify-center px-gutter pt-space-md">
            <Link
              to="/register"
              className="group inline-flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-surface-container-high hover:bg-secondary-container transition-all duration-300 shadow-sm"
            >
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
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
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-primary-fixed/30 via-secondary-container/20 to-transparent blur-3xl opacity-70 -z-10"></div>
            <div className="pointer-events-none absolute top-48 right-12 w-[380px] h-[260px] bg-tertiary-fixed/25 blur-3xl rounded-full opacity-60 -z-10"></div>

            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container text-on-primary-container text-label-sm font-label-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm text-on-tertiary-container">explore</span>
                <span>AI-Powered Startup Ecosystem · FIND → MATCH → CONNECT → BUILD</span>
              </div>

              <h1 className="font-display-lg text-display-lg text-primary tracking-tight max-w-3xl">
                Find the people who{' '}
                <span className="relative inline-block text-primary-container">
                  help you build.
                  <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-on-primary-container/40" fill="none" viewBox="0 0 200 8">
                    <path d="M1 5.5C45 2.5 155 2.5 199 5.5" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                  </svg>
                </span>
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                BambiFound connects founders, startups, and talent with the people and opportunities that fit their skills, goals, experience, and ambitions.
              </p>

              <p className="font-body-sm text-body-sm text-secondary max-w-xl italic">
                "Finding the right co-founder, early employee, collaborator, or startup opportunity shouldn't depend entirely on who you already know."
              </p>

              <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-xs">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-space-sm px-space-xl py-3.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md transition-all shadow-md hover:shadow-lg active:scale-[0.985]"
                >
                  <span>Get Started</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link
                  to="/startups"
                  className="inline-flex items-center justify-center gap-space-sm px-space-xl py-3.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-base text-primary">rocket_launch</span>
                  <span>Explore Startups</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Value Proposition Journey Pipeline */}
          <section id="how-it-works" className="w-full max-w-[1360px] mx-auto px-gutter py-space-xl">
            <div className="text-center max-w-2xl mx-auto mb-space-xl space-y-space-xs">
              <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider font-bold">
                The BambiFound Journey
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                How intent becomes venture momentum.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                From static resume to intelligent collaboration: a structured engine built for real venture creation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {/* Step 1 */}
              <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col space-y-space-md border border-outline-variant/20">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed-dim text-primary flex items-center justify-center font-bold">
                  01
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Profile & Dynamic Intent
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Express what you are building or seeking in natural language. Static skills meet active ambition.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col space-y-space-md border border-outline-variant/20">
                <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold">
                  02
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  AI Contextual Matching
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Our hybrid vector engine evaluates complementarity, timezone, stack alignment, and stage fit.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col space-y-space-md border border-outline-variant/20">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold">
                  03
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  Connect & Build
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Review transparent "Why This Match" explanations, start structured conversations, and launch ventures.
                </p>
              </div>
            </div>
          </section>

          {/* High Impact Call To Action Banner */}
          <section className="w-full max-w-[1360px] mx-auto px-gutter py-space-xl">
            <div className="relative overflow-hidden rounded-2xl bg-primary-container text-on-primary p-space-lg md:p-space-xl shadow-xl">
              <div className="relative z-10 max-w-3xl space-y-space-md">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/15 text-primary-fixed text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
                  <span>Zero Barrier Venture Formation</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-primary tracking-tight">
                  Your next co-founder, teammate, or opportunity could be one connection away.
                </h2>
                <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl">
                  Join founders and operators building tomorrow's ventures. Your first startup profile is completely free forever.
                </p>
                <div className="pt-space-xs flex flex-wrap items-center gap-space-md">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center gap-space-sm px-space-xl py-3.5 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container font-label-md text-label-md font-bold transition-all shadow-md active:scale-[0.985]"
                  >
                    <span>Get Started — Free Forever</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                  <Link
                    to="/discover"
                    className="inline-flex items-center justify-center gap-space-sm px-space-xl py-3.5 rounded-lg bg-transparent text-on-primary hover:bg-surface-container-lowest/10 font-label-md text-label-md transition-all"
                  >
                    <span className="material-symbols-outlined text-base">explore</span>
                    <span>Explore Directory</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
