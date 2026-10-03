import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1360px] mx-auto px-gutter flex items-center justify-between">
        <Link to="/" className="flex items-center gap-space-md">
          <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-xl text-on-primary-container">explore</span>
          </div>
          <span className="font-title-md text-title-md text-primary font-bold tracking-tight">BambiFound</span>
        </Link>

        <nav className="hidden md:flex items-center gap-space-lg">
          <a href="#discover" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Discover People
          </a>
          <a href="#startups" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Startups
          </a>
          <a href="#opportunities" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Opportunities
          </a>
          <a href="#how-it-works" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            How It Works
          </a>
        </nav>

        <div className="flex items-center gap-space-sm">
          {isAuthenticated ? (
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-on-surface-variant hidden sm:inline">
                {user?.fullName || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors"
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="inline-flex px-space-md py-space-sm rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-high transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/auth/register"
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
