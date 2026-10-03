import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-hairline">
      <div className="h-[72px] max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary text-canvas flex items-center justify-center font-bold">
            B
          </div>
          <span className="font-newsreader text-2xl font-medium tracking-tight text-primary">BambiFound</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#discover" className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors">
            Discover
          </a>
          <a href="#startups" className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors">
            Startups
          </a>
          <a href="#opportunities" className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors">
            Opportunities
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-ink-secondary hidden sm:inline">
                {user?.fullName || user?.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
