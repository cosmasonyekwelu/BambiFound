import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-canvas">
      <Navbar />

      <main className="flex-1 w-full pt-20">
        <div className="flex flex-col items-center w-full">
          
          {/* Hero Section */}
          <section className="w-full max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
            <Badge className="mb-8" variant="default">Now in Public Beta</Badge>
            <h1 className="font-newsreader text-[38px] leading-[44px] md:text-[56px] md:leading-[64px] tracking-tight font-normal text-primary max-w-4xl mx-auto mb-6">
              Find the people who help you build.
            </h1>
            <p className="text-lg md:text-xl text-ink-secondary max-w-2xl mx-auto mb-10">
              An AI-powered startup ecosystem connecting high-conviction founders, technical leads, and builders based on deep intent and complementary skills.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/auth/register">Create Your Profile</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
          </section>

          {/* Value Proposition Pipeline */}
          <section id="how-it-works" className="w-full bg-surface-cream border-y border-hairline py-20">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="font-newsreader text-[28px] md:text-[36px] font-medium text-primary mb-12">
                The BambiFound Synergy Pipeline
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
                {[
                  { step: '01', title: 'PROFILE', desc: 'Define who you are' },
                  { step: '02', title: 'INTENT', desc: 'Specify what you need' },
                  { step: '03', title: 'AI SYNERGY', desc: 'Extract core skills' },
                  { step: '04', title: 'MATCH', desc: 'Hybrid vector search' },
                  { step: '05', title: 'EXPLANATION', desc: 'Clear why & overlap' },
                  { step: '06', title: 'CONNECTION', desc: 'Direct outreach' },
                ].map((item, idx) => (
                  <Card key={idx} className="flex flex-col items-center p-4 shadow-sm text-center">
                    <span className="text-xs font-bold text-tertiary-accent">{item.step}</span>
                    <span className="text-xs font-bold text-primary mt-2">{item.title}</span>
                    <span className="text-xs text-ink-secondary mt-1">{item.desc}</span>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Key Features Grid */}
          <section className="w-full max-w-7xl mx-auto px-6 py-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-newsreader text-[28px] md:text-[36px] font-medium text-primary">
                Designed for speed, clarity, and alignment.
              </h2>
              <p className="text-base text-ink-secondary mt-4">
                Every feature is engineered to eliminate noise and connect high-conviction builders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-sage-tint text-primary flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <CardTitle className="text-lg">Intent-Based Discovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ink-secondary">
                    Match based on active goals—whether you're looking for a co-founder, hiring founding engineers, or seeking opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-sage-tint text-primary flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  </div>
                  <CardTitle className="text-lg">AI Profile Understanding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ink-secondary">
                    Our LLM abstraction layer understands unstructured bios, experiences, and technical stacks to surface hidden synergies.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-sage-tint text-primary flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                  </div>
                  <CardTitle className="text-lg">Transparent Match Explanations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ink-secondary">
                    Never guess why someone was recommended. Every match includes a plain-language explanation of shared goals and complementary skills.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Match Mockup Section */}
          <section className="w-full max-w-5xl mx-auto px-6 py-20">
            <Card className="p-8 shadow-level-2">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-hairline">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-sage-tint text-primary flex items-center justify-center font-bold text-lg">
                    AR
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-ink-primary">Alex Rivera</h3>
                      <Badge variant="selected" className="bg-[#E8F0EB] text-[#14281D] hover:bg-[#14281D] hover:text-[#FBF9F5] transition-colors">
                        Verified Founder
                      </Badge>
                    </div>
                    <p className="text-sm text-ink-secondary">Technical Co-founder & CTO @ Stealth AI</p>
                  </div>
                </div>
                <Badge variant="match" matchPercentage={96}>
                  96% Synergy Match
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-ink-muted">Looking For</span>
                  <p className="text-sm font-medium text-ink-primary mt-1">Founding Engineer (AI / NestJS)</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-ink-muted">Stage</span>
                  <p className="text-sm font-medium text-ink-primary mt-1">Pre-Seed — Seed Stage</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-ink-muted">Match Explanation</span>
                  <p className="text-sm text-ink-secondary mt-1">
                    Shared focus on distributed backend architecture, vector embeddings, and early-stage startup execution.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* CTA Banner */}
          <section className="w-full bg-primary-container text-white py-24">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h2 className="font-newsreader text-[36px] font-medium text-canvas">
                  Ready to find your people?
                </h2>
                <p className="text-lg text-[#80a690] mt-2">
                  Join founders, technical leads, and builders on BambiFound today.
                </p>
              </div>
              <Button size="lg" variant="default" className="bg-canvas text-primary hover:bg-surface-cream" asChild>
                <Link to="/auth/register">Create Your Account</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
