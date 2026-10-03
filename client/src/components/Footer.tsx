import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl border-t border-outline-variant/40">
      <div className="max-w-[1280px] mx-auto px-margin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl pb-space-xl border-b border-outline-variant/30">
          <div className="space-y-space-md">
            <Link to="/" className="font-newsreader text-2xl font-semibold text-primary">
              BambiFound
            </Link>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs leading-relaxed">
              Venture match & founder onboarding platform connecting founders, startups, and talent.
            </p>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-space-md">Platform</h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li><Link to="/#explore" className="hover:text-on-surface transition-colors">Explore Builders</Link></li>
              <li><Link to="/#startups" className="hover:text-on-surface transition-colors">Startup Directory</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-on-surface transition-colors">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-space-md">Account</h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li><Link to="/auth/login" className="hover:text-on-surface transition-colors">Sign In</Link></li>
              <li><Link to="/auth/register" className="hover:text-on-surface transition-colors">Create Account</Link></li>
              <li><Link to="/onboarding" className="hover:text-on-surface transition-colors">Founder Onboarding</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-wider mb-space-md">Legal & Trust</h4>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface-variant">
              <li><a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-on-surface transition-colors">Security & Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <div>BambiFound — Venture match & founder onboarding platform. © 2025.</div>
          <div className="flex items-center gap-space-md">
            <span>SOC2 Type II</span>
            <span>•</span>
            <span>End-to-End Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
