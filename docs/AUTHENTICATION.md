# BambiFound Authentication Architecture & OAuth Integration Guide

This document outlines the authentication system for BambiFound, covering canonical email/password authentication, Google OAuth 2.0, GitHub OAuth 2.0, database identity mapping, security rules, and setup instructions.

---

## 1. System Overview

BambiFound uses a unified session model powered by NestJS REST API and JWT access/refresh tokens. All authentication methods (Email/Password, Google OAuth, GitHub OAuth) map to the canonical `User` entity and issue the same JWT session tokens.

```
       Email / Password Login
                 │
                 ▼
       Google OAuth / GitHub OAuth
                 │
                 ▼
       BambiFound Auth Service
                 │
                 ▼
          BambiFound User
                 │
                 ▼
     JWT Access Token + Refresh Cookie
                 │
                 ▼
       Protected BambiFound API
```

---

## 2. Supported Authentication Methods

### A. Email + Password (Canonical)
- **Registration:** `POST /api/auth/register` (hashing via Argon2id).
- **Login:** `POST /api/auth/login` (verifies Argon2id hash).
- **Tokens:** Short-lived access token (15m) returned in JSON payload; long-lived refresh token (7d) stored as an `HttpOnly` cookie and hashed in PostgreSQL (`hashedRefreshToken`).
- **Session Refresh:** `POST /api/auth/refresh`.
- **Logout:** `POST /api/auth/logout`.

### B. Google OAuth 2.0
- **Initiation:** `GET /api/auth/google`.
- **Callback:** `GET /api/auth/google/callback`.
- **Scopes:** `email`, `profile`.
- **Provider ID:** Stored in `OAuthAccount` (`provider: "GOOGLE"`).

### C. GitHub OAuth 2.0
- **Initiation:** `GET /api/auth/github`.
- **Callback:** `GET /api/auth/github/callback`.
- **Scopes:** `user:email`.
- **Email Resolution:** Automatically requests primary verified email from `https://api.github.com/user/emails` if not present in the initial profile payload.
- **Provider ID:** Stored in `OAuthAccount` (`provider: "GITHUB"`).

---

## 3. Database Schema & OAuth Mapping

The Prisma schema decouples social identities from the core `User` model using an `OAuthAccount` relation:

```prisma
model User {
  id                  String         @id @default(uuid())
  email               String         @unique
  passwordHash        String?        // Optional (null for social-only accounts)
  fullName            String?
  emailVerified       Boolean        @default(false)
  hashedRefreshToken  String?
  onboardingCompleted Boolean        @default(false)
  onboardingSkipped   Boolean        @default(false)
  onboardingStep      Int            @default(1)
  onboardingData      Json           @default("{}")
  membershipTier      String         @default("FREE")
  membershipExpiresAt DateTime?
  payments            Payment[]
  oauthAccounts       OAuthAccount[]
  createdAt           DateTime       @default(now())
  updatedAt           DateTime       @updatedAt

  @@map("users")
}

model OAuthAccount {
  id                String   @id @default(uuid())
  userId            String
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  provider          String   // "GOOGLE" | "GITHUB"
  providerAccountId String   // Identity ID from provider
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("oauth_accounts")
}
```

---

## 4. Account Matching & Linking Rules

When an OAuth callback is received:

1. **Existing OAuth Account:** If an `OAuthAccount` record exists for `(provider, providerAccountId)`, the associated BambiFound `User` is authenticated immediately.
2. **Existing Email Conflict (Unlinked Account):** If no `OAuthAccount` exists but a BambiFound `User` with the same email address exists, **automatic/silent linking is prohibited**. The system redirects to the frontend with an error code (`account_exists_link_required`), prompting the user to authenticate using their existing password to link the social provider safely.
3. **New User Creation:** If neither `OAuthAccount` nor `User` with that email exists, a new `User` is created (`emailVerified: true`, `passwordHash: null`), along with an `OAuthAccount` record. A standard BambiFound session is established.

---

## 5. Environment Variables Configuration

Add the following environment variables to `server/.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:4000/api/auth/github/callback

# App Settings
FRONTEND_URL=http://localhost:3000
```

---

## 6. Local & Production Callback URLs

### Local Development
- **Google Callback:** `http://localhost:4000/api/auth/google/callback`
- **GitHub Callback:** `http://localhost:4000/api/auth/github/callback`
- **Frontend App:** `http://localhost:3000`

### Production Setup
- **Frontend URL:** `https://bambifound.netlify.app`
- **Google Callback:** `https://your-backend-api.com/api/auth/google/callback`
- **GitHub Callback:** `https://your-backend-api.com/api/auth/github/callback`

---

## 7. Provider Setup Instructions

### Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project for **BambiFound**.
3. Navigate to **APIs & Services > OAuth consent screen**. Set user type to External and fill in mandatory app details.
4. Go to **APIs & Services > Credentials** and click **Create Credentials > OAuth client ID**.
5. Select Application type: **Web application**.
6. Under **Authorized JavaScript origins**, add:
   - `http://localhost:3000`
   - `https://bambifound.netlify.app`
7. Under **Authorized redirect URIs**, add:
   - `http://localhost:4000/api/auth/google/callback`
   - `https://your-backend-api.com/api/auth/google/callback`
8. Copy the **Client ID** and **Client Secret** into your server `.env` configuration as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

### GitHub Developer Settings Setup
1. Go to [GitHub Developer Settings > OAuth Apps](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Fill in:
   - **Application name:** `BambiFound`
   - **Homepage URL:** `http://localhost:3000` (or `https://bambifound.netlify.app` in production)
   - **Authorization callback URL:** `http://localhost:4000/api/auth/github/callback` (or `https://your-backend-api.com/api/auth/github/callback` in production)
4. Click **Register application**.
5. Copy the **Client ID** and generate a **Client Secret**.
6. Add them to your server `.env` as `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.

---

## 8. Testing Instructions

### Local Manual Testing
1. Start local backend (`cd server && npm run start:dev`) and frontend (`cd client && npm run dev`).
2. Open `http://localhost:3000/auth/login`.
3. Click **Continue with Google** or **Continue with GitHub**.
4. Authorize in the provider window and verify seamless redirection through `/auth/callback` to `/onboarding` or `/dashboard`.
5. Verify session state by making authenticated requests to `/api/auth/me`.

### Automated Testing
- Backend unit & strategy tests: `cd server && npm test`
- Frontend UI tests: `cd client && npm test`
- Playwright E2E tests: `npx playwright test`

---

## 9. Security & Credential Rotation

1. **Server-Only Credentials:** `GOOGLE_CLIENT_SECRET` and `GITHUB_CLIENT_SECRET` must **never** be included in client-side builds, exposed in JS bundles, or checked into version control.
2. **Redirect Validation:** The backend strictly redirects to the configured `FRONTEND_URL` origin to prevent open-redirect vulnerabilities.
3. **CSRF / State Protection:** Passport OAuth guards validate state tokens during authentication transactions.
4. **Credential Rotation Procedure:** If a secret is leaked or compromised:
   - Revoke the secret in Google Cloud Console or GitHub Developer Settings.
   - Generate a new secret.
   - Update environment variables on PaaS (Render/Railway/Netlify).
   - Restart the backend server.
