import { describe, it, expect } from 'vitest';
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
    const locationMock = { href: '' };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: locationMock,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const googleBtn = screen.getByText('Continue with Google');
    fireEvent.click(googleBtn);

    expect(locationMock.href).toContain('/api/auth/google');

    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });

  it('triggers GitHub OAuth redirect on button click', () => {
    const originalLocation = window.location;
    const locationMock = { href: '' };
    Object.defineProperty(window, 'location', {
      writable: true,
      value: locationMock,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>,
    );

    const githubBtn = screen.getByText('Continue with GitHub');
    fireEvent.click(githubBtn);

    expect(locationMock.href).toContain('/api/auth/github');

    Object.defineProperty(window, 'location', {
      writable: true,
      value: originalLocation,
    });
  });
});
