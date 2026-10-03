# BambiFound Deployment & Production Setup Guide

This document outlines the environment configuration, Paystack integration, testing, and production deployment architecture for the BambiFound application.

---

## 1. Deployment Architecture

BambiFound uses a decoupled full-stack architecture:

*   **Frontend (SPA):** React + Vite
    *   **Deployed on:** Netlify
*   **Backend (REST API):** NestJS
    *   **Deployed on:** Existing backend deployment service
*   **Database:** Neon PostgreSQL
    *   **Vector Search:** pgvector (configured within Neon)
*   **Payments:** Paystack
    *   Test mode enabled for verification without real charges.

*(Note: Cloudinary and OpenAI are planned/example integrations and are not yet fully configured in this deployment).*

---

## 2. Environment Variables

### Server (`server/.env`)
| Variable | Description | Example / Placeholder |
|---|---|---|
| `PORT` | HTTP port for NestJS server | `4000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://bambi_user:bambi_pass@localhost:5432/bambifound_db?schema=public` |
| `JWT_SECRET` | Secret key for signing Access Tokens | `super_secret_jwt_access_key` |
| `JWT_REFRESH_SECRET` | Secret key for signing Refresh Tokens | `super_secret_jwt_refresh_key` |
| `JWT_ACCESS_EXPIRATION` | Access token lifespan | `15m` |
| `JWT_REFRESH_EXPIRATION` | Refresh token lifespan | `7d` |
| `FRONTEND_URL` | Client application origin for CORS & payment redirects | `https://your-netlify-url.netlify.app` |
| `PAYSTACK_SECRET_KEY` | Paystack Secret Key (Test) | `sk_test_...` |
| `PAYSTACK_PUBLIC_KEY` | Paystack Public Key (Test) | `pk_test_...` |
| `PAYSTACK_WEBHOOK_SECRET` | Paystack Webhook Secret | `(Use PAYSTACK_SECRET_KEY by default)` |

### Client (`client/.env`)
| Variable | Description | Example / Placeholder |
|---|---|---|
| `VITE_API_URL` | Base URL pointing to NestJS backend REST API | `https://your-backend-api.com` |

> **Security Rule:** Never place secret API keys or database credentials into source code, documentation, or the frontend `VITE_` variables.

---

## 3. Paystack Integration Documentation

**Why Paystack?**
BambiFound requires a secure payment gateway to process subscription and membership tier upgrades for founders and talent. Paystack handles payment initialization, secure checkout, and webhook verification asynchronously.

**Application Flow:**
1. User logs into BambiFound and navigates to Membership settings.
2. User selects a subscription tier (e.g., BambiFound PLUS).
3. The NestJS backend initializes the payment via Paystack API, recording a pending transaction.
4. User completes payment via Paystack Checkout. For testing, **Paystack Test Mode** is used (test card: `4084084084084081`).
5. Upon successful checkout, Paystack redirects the user back to the frontend.
6. The frontend calls the backend verification endpoint, OR Paystack asynchronously fires a `charge.success` webhook.
7. The backend strictly validates the `x-paystack-signature` against the raw request body for idempotency and security.
8. The backend upgrades the user's membership tier and records the successful payment history.

---

## 4. Frontend Deployment (Netlify)

To deploy the React/Vite client to Netlify:

1. Create a new site from Git in Netlify, pointing to the `/client` directory.
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Set Environment Variables:
   - `VITE_API_URL` (points to the existing deployed NestJS backend).
5. Ensure `netlify.toml` is present in the `client/` directory with the following SPA routing configuration to prevent 404s on direct navigation:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
6. **CORS:** Ensure the NestJS backend has CORS configured to accept requests from the Netlify production URL.

---

## 5. End-to-End Automated Testing

Run Playwright E2E tests before releasing code to production:
```bash
# Ensure server (port 4000) and client (port 3000) are running, or rely on webServer config
npx playwright test
```

*Note on Payment Test:* The current `e2e/payment.spec.ts` test is an automated integration-flow test utilizing mocked/simulated Paystack responses or fallback logic provided by the backend sandbox when real API keys are not supplied in the `.env` file.
