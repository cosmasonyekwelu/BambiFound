# BambiFound Deployment & Production Setup Guide

This document outlines the complete deployment process, architecture, environment configuration, database setup, and operational procedures for deploying the BambiFound NestJS backend to Render and connecting to Neon PostgreSQL.

---

## A. Architecture and Prerequisites

BambiFound uses a decoupled full-stack architecture:

- **Backend Framework & Runtime:** NestJS (Node.js >= v20.x, built on Express with TypeScript)
- **Repository Structure:**
  - `server/` — NestJS REST API server, Prisma schema, and migrations
  - `client/` — React + Vite Single Page Application (SPA)
  - `docs/` — Architecture specifications and PRD documentation
- **Package Manager & Lockfile:** `npm` with committed `package-lock.json` in `server/` and `client/`
- **ORM & Database:** Prisma v5.x connecting to serverless PostgreSQL on **Neon** with `pgvector` extension support.
- **External Accounts Required:**
  1. **Render** (Web Service host for NestJS backend)
  2. **Neon** (Serverless PostgreSQL database provider)
  3. **Paystack** (Payment gateway for subscription processing)
  4. **Cloudinary** (Media and image storage)
  5. **Brevo** (Transactional email service provider)
  6. **OpenAI** (Primary AI matching & completion engine)
  7. **Groq** (Optional fallback AI model provider)

---

## B. Environment Variables Reference

Below are the environment variables used by the backend application (`server/.env`).

> **Security Rule:** Never commit real secrets or credentials into source code, version control, or public logs. Use placeholders in `.env.example` files.

| Variable | Required / Optional | Purpose | Where to Obtain / Configure | Server Only? | Safe Example Format |
|---|---|---|---|---|---|
| `PORT` | Optional | Port for NestJS server (Defaults to 4000; supplied dynamically by Render as `process.env.PORT`) | Environment / Render | Yes | `4000` |
| `DATABASE_URL` | **Required** | Pooled PostgreSQL connection string for Prisma query engine | Neon Console -> Connection Details (Pooled endpoint with `?sslmode=require`) | Yes | `postgresql://user:pass@ep-cool-pool-123456-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require` |
| `DIRECT_URL` | **Required** | Direct (non-pooled) PostgreSQL connection string for Prisma schema migrations | Neon Console -> Connection Details (Unpooled/Direct endpoint with `?sslmode=require`) | Yes | `postgresql://user:pass@ep-cool-pool-123456.us-east-1.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | **Required** | Secret key for signing Access Tokens | Generated high-entropy random string | Yes | `super_secret_jwt_access_key_bambifound_2025` |
| `JWT_REFRESH_SECRET` | **Required** | Secret key for signing Refresh Tokens | Generated high-entropy random string | Yes | `super_secret_jwt_refresh_key_bambifound_2025` |
| `JWT_ACCESS_EXPIRATION` | Optional | Lifetime duration for access tokens | Configured in server environment (default: `15m`) | Yes | `15m` |
| `JWT_REFRESH_EXPIRATION` | Optional | Lifetime duration for refresh tokens | Configured in server environment (default: `7d`) | Yes | `7d` |
| `FRONTEND_URL` | **Required** | Production client web application URL for CORS policy and redirect links | Netlify / Vercel deployment URL | Yes | `https://bambifound.netlify.app` |
| `PAYSTACK_SECRET_KEY` | Optional / Required for Payments | Paystack secret key for initialization & transaction verification | Paystack Dashboard -> Settings -> API Keys | Yes | `sk_test_123456789abcdef` |
| `PAYSTACK_PUBLIC_KEY` | Optional / Required for Payments | Paystack public key for frontend inline checkout | Paystack Dashboard -> Settings -> API Keys | No (Frontend safe) | `pk_test_123456789abcdef` |
| `PAYSTACK_WEBHOOK_SECRET` | Optional | Webhook secret key for verifying HMAC SHA512 signatures | Paystack Dashboard -> Settings -> Webhooks | Yes | `sk_test_123456789abcdef` |
| `CLOUDINARY_CLOUD_NAME` | Optional / Required for Media | Cloudinary account cloud name | Cloudinary Dashboard | Yes | `bambifound-cloud` |
| `CLOUDINARY_API_KEY` | Optional / Required for Media | Cloudinary API Key | Cloudinary Dashboard | Yes | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Optional / Required for Media | Cloudinary API Secret | Cloudinary Dashboard | Yes | `secret_key_here` |
| `BREVO_API_KEY` | Optional / Required for Email | Brevo (Sendinblue) API v3 Key | Brevo Dashboard -> SMTP & API Keys | Yes | `xkeysib-12345...` |
| `BREVO_FROM_EMAIL` | Optional | Transactional sender email address | Verified Brevo sender address | Yes | `noreply@bambifound.com` |
| `BREVO_FROM_NAME` | Optional | Transactional sender display name | Configured in environment | Yes | `BambiFound` |
| `OPENAI_API_KEY` | Optional / Required for AI | Primary OpenAI API Key for embeddings/completions | OpenAI Platform -> API Keys | Yes | `sk-proj-12345...` |
| `OPENAI_MODEL` | Optional | OpenAI model identifier | OpenAI Platform (default: `gpt-4o-mini`) | Yes | `gpt-4o-mini` |
| `GROQ_API_KEY` | Optional | Groq API Key (Fallback AI provider) | Groq Console | Yes | `gsk_12345...` |
| `GROQ_MODEL` | Optional | Groq model identifier | Groq Console (default: `llama-3.3-70b-versatile`) | Yes | `llama-3.3-70b-versatile` |

---

## C. Local Development & Docker Commands

### 1. Direct Node.js Local Commands
All server commands must be run inside the `server/` directory:

```bash
# 1. Navigate to backend server directory
cd server

# 2. Install dependencies reproducibly from lockfile
npm ci

# 3. Generate Prisma Client
npx prisma generate

# 4. Run database migrations in development
npx prisma migrate dev

# 5. Start NestJS server in development mode (with watch mode)
npm run start:dev

# 6. Build and test production build locally
npm run build
npm run start:prod

# 7. Execute unit and integration tests
npm test

# 8. Check health check & database status endpoint
curl http://localhost:4000/api/health
```

### 2. Docker & Containerized Hosting Commands

The NestJS backend server is packaged using a multi-stage `Dockerfile` (`server/Dockerfile`).

```bash
# Build the Docker image for the NestJS server
docker build -t bambifound-server ./server

# Run the backend container manually
docker run -d -p 4000:4000 --name bambifound-server \
  -e DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require" \
  -e DIRECT_URL="postgresql://user:pass@host:5432/dbname?sslmode=require" \
  -e JWT_SECRET="your_jwt_secret" \
  -e JWT_REFRESH_SECRET="your_jwt_refresh_secret" \
  -e FRONTEND_URL="http://localhost:3000" \
  bambifound-server

# Spin up complete stack (PostgreSQL + Mailpit + NestJS Server) with Docker Compose
docker compose up --build -d

# View server container logs
docker compose logs -f server

# Stop running Docker Compose services
docker compose down
```

---

## D. Neon PostgreSQL Setup & Troubleshooting

### 1. Obtaining Neon Connection Strings
1. Log into your Neon Console: `https://console.neon.tech/`.
2. Select your BambiFound project and target database branch (e.g., `main`).
3. Under **Dashboard / Connection Details**:
   - Enable **Pooled connection** toggle to copy `DATABASE_URL`. It will look like:
     `postgresql://<user>:<password>@ep-pool-name-pooler.<region>.aws.neon.tech/<dbname>?sslmode=require`
   - Uncheck **Pooled connection** toggle to copy `DIRECT_URL`. It will look like:
     `postgresql://<user>:<password>@ep-name.<region>.aws.neon.tech/<dbname>?sslmode=require`
4. Store these values in Render Environment Variables and local `.env` files.

### 2. Applying Prisma Migrations
- In local development against Neon: `npx prisma migrate dev`
- In production deployment (e.g. Render build/release step): `npx prisma migrate deploy`

### 3. Troubleshooting Common Neon Errors

#### `P1001: Can't reach database server`
- **Cause:** Incorrect hostname, port (5432), firewall restriction, or Neon compute endpoint auto-suspended/dormant.
- **Fix:**
  1. Confirm your IP or hosting provider is not blocking outbound port `5432`.
  2. Verify the hostname in `DATABASE_URL` matches your Neon console project endpoint exactly.
  3. Ensure `?sslmode=require` query parameter is attached to the URL.
  4. Ensure `DIRECT_URL` is configured in `prisma/schema.prisma` for non-pooled migration operations.

#### Special Character Encoding in Credentials
- If your database password contains characters like `@`, `#`, `$`, or `/`, URL-encode them (e.g., `@` becomes `%40`, `#` becomes `%23`).

---

## E. Render Deployment Setup

### 1. Render Service Configuration

When creating a new **Web Service** on Render:

| Field | Configuration Value |
|---|---|
| **Service Type** | Web Service |
| **Repository** | `https://github.com/cosmasonyekwelu/BambiFound` |
| **Region** | Oregon (US West) or closest to Neon region |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | Node |
| **Build Command** | `npm ci && npx prisma migrate deploy && npm run build` |
| **Start Command** | `npm run start:prod` |
| **Health Check Path** | `/api/health` |
| **Auto-Deploy** | Yes |

### 2. Node.js Engine Version
Set `NODE_VERSION` in Render Environment Variables to `20.18.0` or `22.x` to match local development.

### 3. Build & Runtime Logs Inspection
- In Render Dashboard -> **Events** / **Logs**: Monitor build logs for `npm ci` and `prisma generate` outputs.
- Verify startup line: `Server running on http://0.0.0.0:4000` or `process.env.PORT`.

---

## F. Frontend Integration

### 1. Base API URL
The React SPA client in `client/` connects to the NestJS REST API.
- **Environment Variable (`client/.env` or Netlify / Vercel settings):**
  `VITE_API_URL=https://<your-render-app-name>.onrender.com`
- *Note:* Do not include trailing `/api` in `VITE_API_URL` because `client/src/lib/api.ts` automatically prefixes `/api` to request paths.

### 2. CORS Configuration
In `server/src/main.ts`, CORS is configured to accept origins from `process.env.FRONTEND_URL` alongside local development origins:
```ts
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
app.enableCors({
  origin: [frontendUrl, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
});
```

---

## G. Release Verification & Troubleshooting Checklist

### Pre-Release Checklist
- [x] `@nestjs/cli` declared in `dependencies` of `server/package.json` so `nest build` is available in production builds on Render.
- [x] `prisma generate` set in `server/package.json` build script.
- [x] Database configuration includes both `DATABASE_URL` and `DIRECT_URL`.
- [x] Application binds to host `0.0.0.0` listening on `process.env.PORT`.
- [x] Health endpoint `/api/health` returns status HTTP 200 when database query `SELECT 1` succeeds, and HTTP 533/503 when disconnected.

### Quick Fixes for Common Failures

| Issue | Root Cause | Solution |
|---|---|---|
| `sh: 1: nest: not found` | `@nestjs/cli` was in `devDependencies` and omitted when Render ran production installation | Moved `@nestjs/cli` to `dependencies` in `server/package.json` |
| `P1001` or connection timeout | Misconfigured connection string or missing SSL mode | Use Neon pooled URL for `DATABASE_URL` with `?sslmode=require` and direct URL for `DIRECT_URL` |
| CORS Origin blocked | Frontend domain missing in `FRONTEND_URL` | Update Render environment variable `FRONTEND_URL` to match client origin URL |
| Port binding error | Server listening on `localhost` instead of `0.0.0.0` | Ensure `app.listen(port, '0.0.0.0')` is set in `server/src/main.ts` |

---

## H. Deployment Record

Record deployment details here after verifying production deployment on Render:

| Field | Record Details |
|---|---|
| **Render Web Service Name** | `bambifound-server` |
| **Render Service URL** | *Pending manual Render service creation* (e.g., `https://bambifound-server.onrender.com`) |
| **Health Check Endpoint** | *Pending manual Render service creation* (e.g., `https://bambifound-server.onrender.com/api/health`) |
| **Neon PostgreSQL Host** | Neon Managed PostgreSQL (`ep-*-pooler.*.neon.tech`) |
| **Deployment Commit** | `main` |
| **Verification Status** | Verified build, Prisma generation, and tests locally |
