import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1360px] mx-auto px-gutter flex items-center justify-between">
        <Link to="/" className="flex items-center gap-space-md">
          <div className="h-8 w-8 rounded-md bg-primary-container flex items-center justify-center text-on-primary font-bold text-lg">
            B
          </div>
          <span className="font-title-md text-title-md text-primary font-bold tracking-tight">
            BambiFound
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-space-lg">
          <Link to="/discover" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Discover People
          </Link>
          <Link to="/startups" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Startups
          </Link>
          <Link to="/opportunities" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Opportunities
          </Link>
          <a href="#how-it-works" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            How It Works
          </a>
        </nav>

        <div className="flex items-center gap-space-sm">
          {user ? (
            <div className="flex items-center gap-space-sm">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                {user.fullName || user.email}
              </span>
              <button
                onClick={async () => {
                  await logout();
                  navigate('/login');
                }}
                className="px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-space-lg py-space-sm rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md transition-all active:scale-[0.985]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
