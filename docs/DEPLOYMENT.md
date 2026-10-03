# BambiFound Deployment & Production Setup Guide

This document outlines the environment configuration, external service integrations, testing, and production deployment architecture for the BambiFound application.

---

## 1. External Services / Integrations

BambiFound integrates five required external service categories:

| Category | Service | BambiFound use |
|---|---|---|
| Payments | Paystack | Subscription/payment processing |
| Media | Cloudinary | Image/file storage and delivery |
| Database | Neon PostgreSQL | Persistent application data |
| Email | Brevo | Transactional email |
| AI | OpenAI | AI-powered matching/recommendations |

*Note: Groq is retained as an optional AI provider/fallback where configured. It is part of the AI integration category and is not counted as a separate external service category.*

---

## 2. Deployment Architecture

BambiFound uses a decoupled full-stack architecture:

*   **Frontend (SPA):** React + Vite
    *   **Deployed on:** Netlify
*   **Backend (REST API):** NestJS
    *   **Deployed on:** Render / Railway
*   **Database:** Neon PostgreSQL
    *   **Vector Search:** pgvector (configured within Neon)
*   **Payments:** Paystack (Test mode enabled for verification without real charges)
*   **Media Storage:** Cloudinary
*   **Transactional Email:** Brevo
*   **AI Engine:** OpenAI (Primary) with Groq (Optional Fallback)

---

## 3. Environment Variables

### Server (`server/.env`)
| Variable | Description | Example / Placeholder |
|---|---|---|
| `PORT` | HTTP port for NestJS server | `4000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://bambi_user:bambi_pass@localhost:5432/bambifound_db?schema=public` |
| `DIRECT_URL` | Direct DB connection string for pooling/migrations | `postgresql://bambi_user:bambi_pass@localhost:5432/bambifound_db?schema=public` |
| `JWT_SECRET` | Secret key for signing Access Tokens | `super_secret_jwt_access_key` |
| `JWT_REFRESH_SECRET` | Secret key for signing Refresh Tokens | `super_secret_jwt_refresh_key` |
| `JWT_ACCESS_EXPIRATION` | Access token lifespan | `15m` |
| `JWT_REFRESH_EXPIRATION` | Refresh token lifespan | `7d` |
| `FRONTEND_URL` | Client application origin for CORS & payment redirects | `https://your-netlify-url.netlify.app` |
| `PAYSTACK_SECRET_KEY` | Paystack Secret Key (Test) | `sk_test_...` |
| `PAYSTACK_PUBLIC_KEY` | Paystack Public Key (Test) | `pk_test_...` |
| `PAYSTACK_WEBHOOK_SECRET` | Paystack Webhook Secret | `sk_test_...` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloudinary_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_cloudinary_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_cloudinary_api_secret` |
| `BREVO_API_KEY` | Brevo API v3 key | `your_brevo_api_key_here` |
| `BREVO_FROM_EMAIL` | Sender email address | `noreply@bambifound.com` |
| `BREVO_FROM_NAME` | Sender display name | `BambiFound` |
| `OPENAI_API_KEY` | OpenAI API key (Canonical AI) | `your_openai_api_key_here` |
| `OPENAI_MODEL` | OpenAI model name | `gpt-4o-mini` |
| `GROQ_API_KEY` | Groq API key (Optional Fallback AI) | `your_groq_api_key_here` |
| `GROQ_MODEL` | Groq model name | `llama-3.3-70b-versatile` |

### Client (`client/.env`)
| Variable | Description | Example / Placeholder |
|---|---|---|
| `VITE_API_URL` | Base URL pointing to NestJS backend REST API | `https://your-backend-api.com` |

> **Security Rule:** Never place secret API keys or database credentials into source code, documentation, or the frontend `VITE_` variables.

---

## 4. Paystack Integration Documentation

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

## 5. Frontend Deployment (Netlify)

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

## 6. End-to-End Automated Testing

Run Playwright E2E tests before releasing code to production:
```bash
# Ensure server (port 4000) and client (port 3000) are running, or rely on webServer config
npx playwright test
```

*Note on Integration Testing:* Automated integration tests utilize mocked/simulated external provider responses or sandbox mode logic when live API keys are not supplied in local test environments.
