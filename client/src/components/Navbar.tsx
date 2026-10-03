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
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/40">
      <div className="h-20 max-w-[1280px] mx-auto px-margin flex items-center justify-between">
        <div className="flex items-center gap-space-md">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="BambiFound" className="h-8 w-auto" />
            
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-space-lg">
          <Link to="/#explore" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Explore
          </Link>
          <Link to="/#how-it-works" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            How It Works
          </Link>
          <Link to="/#startups" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Startups
          </Link>
          <Link to="/dashboard" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">
            Opportunities
          </Link>
        </nav>

        <div className="flex items-center gap-space-md">
          {isAuthenticated ? (
            <div className="flex items-center gap-space-md">
              <Link to="/dashboard" className="hidden sm:inline-flex font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-sm py-space-xs transition-colors">
                {user?.fullName || user?.email}
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center font-label-md text-label-md text-on-surface-variant hover:text-on-surface bg-surface-container-low px-space-md py-space-sm rounded-full transition-all active:scale-[0.98]"
              >
                Log Out
              </button>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="hidden sm:inline-flex font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-sm py-space-xs transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center font-label-md text-label-md text-on-primary bg-primary-container px-space-md py-space-sm rounded-full shadow-[0_2px_8px_-2px_rgba(20,40,29,0.08)] hover:bg-primary transition-all active:scale-[0.98]"
              >
                Get Started
              </Link>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
