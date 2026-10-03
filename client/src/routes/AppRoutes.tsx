import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { SetNewPasswordPage } from '../pages/auth/SetNewPasswordPage';
import { VerifyEmailPage } from '../pages/auth/VerifyEmailPage';
import { OnboardingPage } from '../pages/OnboardingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { DiscoverPage } from '../pages/DiscoverPage';
import { MessagesPage } from '../pages/MessagesPage';
import { PeerProfilePage } from '../pages/PeerProfilePage';
import { ProfileEditPage } from '../pages/ProfileEditPage';
import { VenturesPage } from '../pages/VenturesPage';
import { MembershipPage } from '../pages/MembershipPage';

// Guard for routes requiring authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0c1511] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#82dbac] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Guard for dashboard route: requires auth + completed or skipped onboarding
const DashboardRoute: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0c1511] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#82dbac] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (user && !user.onboardingCompleted && !user.onboardingSkipped) {
    return <Navigate to="/onboarding" replace />;
  }

  return <DashboardPage />;
};

// Guard for onboarding route: requires auth
const OnboardingRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0c1511] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#82dbac] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <OnboardingPage />;
};

// Guard for auth pages (login/register)
const AuthGuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0c1511] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#82dbac] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    if (user.onboardingCompleted || user.onboardingSkipped) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/auth/login"
        element={
          <AuthGuestRoute>
            <LoginPage />
          </AuthGuestRoute>
        }
      />
      <Route
        path="/auth/register"
        element={
          <AuthGuestRoute>
            <RegisterPage />
          </AuthGuestRoute>
        }
      />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/set-new-password" element={<SetNewPasswordPage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/discover"
        element={
          <ProtectedRoute>
            <DiscoverPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <MessagesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <ProfileEditPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <PeerProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ventures"
        element={
          <ProtectedRoute>
            <VenturesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/membership"
        element={
          <ProtectedRoute>
            <MembershipPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
