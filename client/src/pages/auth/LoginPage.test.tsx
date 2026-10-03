import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { AuthProvider } from '../../context/AuthContext';

describe('LoginPage OAuth Integration', () => {
  it('renders Google and GitHub OAuth buttons alongside email form', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('Continue with Google')).toBeDefined();
    expect(screen.getByText('Continue with GitHub')).toBeDefined();
    expect(screen.getByLabelText(/Email Address/i)).toBeDefined();
    expect(screen.getByLabelText(/Password/i)).toBeDefined();
  });

  it('triggers Google OAuth redirect on button click', () => {
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { href: '' } as any;

    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const googleBtn = screen.getByText('Continue with Google');
    fireEvent.click(googleBtn);

    expect(window.location.href).toContain('/api/auth/google');

    window.location = originalLocation;
  });

  it('triggers GitHub OAuth redirect on button click', () => {
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { href: '' } as any;

    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const githubBtn = screen.getByText('Continue with GitHub');
    fireEvent.click(githubBtn);

    expect(window.location.href).toContain('/api/auth/github');

    window.location = originalLocation;
  });
});
