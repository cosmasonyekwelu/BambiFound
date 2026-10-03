# BambiFound Deployment & Production Setup Guide

This document outlines the environment configuration, local development workflow, Paystack webhook testing, and production deployment procedures for the BambiFound application.

---

## 1. Environment Variables

### Server (`server/.env`)
| Variable | Description | Example / Default Value |
|---|---|---|
| `PORT` | HTTP port for NestJS server | `4000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://bambi_user:bambi_pass@localhost:5432/bambifound_db?schema=public` |
| `JWT_SECRET` | Secret key for signing Access Tokens | `super_secret_jwt_access_key_bambifound_2025` |
| `JWT_REFRESH_SECRET` | Secret key for signing Refresh Tokens | `super_secret_jwt_refresh_key_bambifound_2025` |
| `JWT_ACCESS_EXPIRATION` | Access token lifespan | `15m` |
| `JWT_REFRESH_EXPIRATION` | Refresh token lifespan | `7d` |
| `FRONTEND_URL` | Client application origin for CORS & payment redirects | `http://localhost:3000` |
| `PAYSTACK_SECRET_KEY` | Paystack Secret Key (Test or Live) | `sk_test_40840840840840814084084084084081` |
| `PAYSTACK_PUBLIC_KEY` | Paystack Public Key (Test or Live) | `pk_test_40840840840840814084084084084081` |

### Client (`client/.env`)
| Variable | Description | Example / Default Value |
|---|---|---|
| `VITE_API_URL` | Base URL pointing to NestJS backend REST API | `http://localhost:4000` |

---

## 2. Local Development Setup

### Prerequisites
- Node.js (v20+ recommended)
- PostgreSQL (16+) or Docker
- npm or pnpm

### Step-by-Step Local Setup

1. **Start PostgreSQL Database**
   ```bash
   # Option A: Native PostgreSQL
   sudo service postgresql start
   sudo -u postgres psql -c "CREATE USER bambi_user WITH PASSWORD 'bambi_pass';"
   sudo -u postgres psql -c "CREATE DATABASE bambifound_db OWNER bambi_user;"

   # Option B: Docker Compose
   docker compose up -d
   ```

2. **Configure Environment Files**
   ```bash
   cp .env.example .env
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

3. **Install Dependencies & Migrate Database**
   ```bash
   # Server setup
   cd server
   npm install
   npx prisma db push
   npx prisma generate

   # Client setup
   cd ../client
   npm install
   ```

4. **Run Server and Client**
   ```bash
   # Terminal 1: NestJS Backend (Port 4000)
   cd server
   npm run start:dev

   # Terminal 2: React Frontend (Port 3000)
   cd client
   npm run dev
   ```

---

## 3. Paystack Webhook Testing & Local Verification

Paystack uses HMAC SHA512 signatures (`x-paystack-signature` header) computed over the raw request body Buffer.

### Testing Webhooks Locally via Ngrok

1. Expose your local NestJS server:
   ```bash
   ngrok http 4000
   ```
2. Copy the generated public HTTPS URL (e.g. `https://abc123.ngrok-free.app`).
3. In the [Paystack Dashboard](https://dashboard.paystack.com/#/settings/developer), set the **Webhook URL** to:
   `https://abc123.ngrok-free.app/api/v1/payments/webhook`
4. Use Paystack's official test cards for sandbox transactions:
   - **Card Number:** `4084084084084081`
   - **CVV:** `408`
   - **Expiry:** Any future date (e.g. `12/30`)
   - **PIN / OTP:** Any 4-digit number (e.g. `1234`)

### Testing Webhooks via Mockpay / Curl
To trigger a mock `charge.success` event manually for offline testing:
```bash
# Generate signature using PAYSTACK_SECRET_KEY
SECRET="sk_test_40840840840840814084084084084081"
BODY='{"event":"charge.success","data":{"reference":"<YOUR_PAYMENT_REFERENCE>","channel":"card"}}'
SIG=$(echo -n "$BODY" | openssl dgst -sha512 -hmac "$SECRET" | sed 's/(stdin)= //')

curl -X POST http://localhost:4000/api/v1/payments/webhook \
  -H "Content-Type: application/json" \
  -H "x-paystack-signature: $SIG" \
  -d "$BODY"
```

---

## 4. Production Deployment

### Database Provisioning (Neon / Supabase)
1. Create a managed PostgreSQL instance on [Neon](https://neon.tech) or [Supabase](https://supabase.com).
2. Copy the pooled connection string into `DATABASE_URL` (ensure `?sslmode=require` is appended).
3. Apply schema migrations during deployment:
   ```bash
   npx prisma db push
   ```

### Backend Deployment (Render / Railway)
1. Create a Web Service connected to the GitHub repository (pointing to `/server` root).
2. Set Environment Variables in service settings (`DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`).
3. Set Build Command:
   ```bash
   npm install && npx prisma db push && npx prisma generate && npm run build
   ```
4. Set Start Command:
   ```bash
   npm run start:prod
   ```

### Frontend Deployment (Vercel / Netlify)
1. Create a project connected to the GitHub repository (pointing to `/client` root).
2. Set Environment Variables:
   - `VITE_API_URL`: Set to the deployed backend URL (e.g. `https://bambifound-api.onrender.com`).
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`

### Paystack Live Configuration
1. Log in to Paystack Dashboard and activate your live account.
2. In **Settings -> Developer / API Keys**:
   - Set **Live Webhook URL** to `https://<YOUR_API_DOMAIN>/api/v1/payments/webhook`.
   - Copy `sk_live_...` and `pk_live_...` into production environment variables.

---

## 5. End-to-End Automated Testing

Run Playwright E2E tests before releasing code to production:
```bash
# Ensure server (port 4000) and client (port 3000) are running, or rely on webServer config
npx playwright test
```
