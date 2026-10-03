import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-cream border-t border-hairline py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-primary text-canvas flex items-center justify-center font-bold text-xs">
              B
            </div>
            <span className="font-newsreader text-xl font-medium text-primary">BambiFound</span>
          </div>
          <p className="text-sm text-ink-secondary max-w-sm">
            Find the people who help you build. An AI-powered startup ecosystem tailored for high-conviction collaborative ventures.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 text-sm text-ink-secondary">
          <Link to="/" className="hover:text-ink-primary transition-colors">Home</Link>
          <Link to="/auth/login" className="hover:text-ink-primary transition-colors">Log In</Link>
          <Link to="/auth/register" className="hover:text-ink-primary transition-colors">Get Started</Link>
        </div>

        <div className="text-xs text-ink-muted">
          &copy; {new Date().getFullYear()} BambiFound. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
