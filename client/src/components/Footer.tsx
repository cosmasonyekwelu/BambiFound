import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/30 py-space-xl">
      <div className="max-w-[1360px] mx-auto px-gutter flex flex-col md:flex-row justify-between items-start md:items-center gap-space-lg">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-sm">
            <div className="w-6 h-6 rounded bg-primary-container text-on-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-sm text-on-primary-container">explore</span>
            </div>
            <span className="font-title-md text-primary font-bold">BambiFound</span>
          </div>
          <p className="font-body-sm text-on-surface-variant text-sm">
            Find the people who help you build. AI-powered startup ecosystem.
          </p>
        </div>

        <div className="flex flex-wrap gap-space-lg text-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/auth/login" className="hover:text-primary transition-colors">Log In</Link>
          <Link to="/auth/register" className="hover:text-primary transition-colors">Get Started</Link>
        </div>

        <div className="text-xs text-outline">
          © {new Date().getFullYear()} BambiFound. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
