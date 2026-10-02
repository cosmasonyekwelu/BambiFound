import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl py-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1360px] mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl pb-space-xl">
          <div className="space-y-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="h-6 w-6 rounded bg-primary-container flex items-center justify-center text-on-primary font-bold text-xs">
                B
              </div>
              <span className="font-title-md text-title-md text-primary font-bold">
                BambiFound
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Find the people who help you build. An AI-powered collaborative ecosystem for founders, operators, and tier-one talent.
            </p>
          </div>

          <div>
            <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-space-sm">
              Ecosystem
            </h4>
            <ul className="space-y-space-xs">
              <li><Link to="/discover" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">Discover Talent</Link></li>
              <li><Link to="/startups" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">Startup Hub</Link></li>
              <li><Link to="/opportunities" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">Venture Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-space-sm">
              Platform
            </h4>
            <ul className="space-y-space-xs">
              <li><a href="#how-it-works" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">How It Works</a></li>
              <li><span className="font-body-sm text-body-sm text-on-surface-variant">Pricing & 1 Free Startup</span></li>
              <li><span className="font-body-sm text-body-sm text-on-surface-variant">AI Synergy Engine</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-md text-label-md text-on-surface font-semibold mb-space-sm">
              Legal & Trust
            </h4>
            <ul className="space-y-space-xs">
              <li><span className="font-body-sm text-body-sm text-on-surface-variant">Privacy Policy</span></li>
              <li><span className="font-body-sm text-body-sm text-on-surface-variant">Terms of Service</span></li>
              <li><span className="font-body-sm text-body-sm text-on-surface-variant">Verified Builder Protocol</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-space-md flex flex-col md:flex-row items-center justify-between text-on-surface-variant border-t border-outline-variant/30">
          <p className="font-body-sm text-body-sm">
            © 2025 BambiFound Technologies Inc. All rights reserved.
          </p>
          <p className="font-body-sm text-body-sm italic text-secondary">
            Find the people who help you build.
          </p>
        </div>
      </div>
    </footer>
  );
};
