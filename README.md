# BambiFound — AI Startup Ecosystem Foundation

> **Positioning:** "Find the people who help you build."

BambiFound is an AI-powered startup ecosystem designed to help founders, early-stage startups, and technical talent find the people and opportunities needed to build and grow.

---

## 1. External Services / Integrations

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

BambiFound utilizes a decoupled production architecture:

- **Production Frontend (Netlify):** [https://bambifound.netlify.app](https://bambifound.netlify.app)
  *(Note: Vercel demo also available at `https://bambi-found.vercel.app`)*
- **Production Backend (Render/Railway):** NestJS REST API
- **Database:** Neon PostgreSQL
- **Payments:** Paystack API
- **GitHub Repository:** [https://github.com/cosmasonyekwelu/BambiFound](https://github.com/cosmasonyekwelu/BambiFound)

For full deployment instructions, see `docs/DEPLOYMENT.md`.

---

## 3. Repository Architecture

This repository contains two completely independent applications sharing a single Git repository:

```text
bambifound/
├── client/                 # React + Vite + Tailwind CSS frontend
│   ├── src/
│   ├── netlify.toml        # Netlify SPA deployment config
│   └── package.json
├── server/                 # NestJS + Prisma REST API
│   ├── src/
│   ├── prisma/
│   └── package.json
├── docs/                   # System design & implementation plan
├── e2e/                    # Playwright E2E tests
├── docker-compose.yml      # Local PostgreSQL (pgvector) & Mailpit
└── README.md
```

---

## 4. Prerequisites

- **Node.js**: v22.x or later
- **npm**: 10.x / 11.x
- **Docker & Docker Compose** (for local PostgreSQL + Mailpit)

---

## 5. Local Setup & Quickstart

### Step 1: Clone and Configure Environment Variables

```bash
# Copy example environment configurations
cp .env.example .env
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### Step 2: Start Local Infrastructure (Docker)

```bash
docker compose up -d
```

This starts:
- **PostgreSQL + pgvector** on `localhost:5432`
- **Mailpit** (Local SMTP & Web UI) on `localhost:8025`

### Step 3: Server Setup & Database Migration

```bash
cd server
npm install
npx prisma migrate dev --name init
npm run start:dev
```

The NestJS backend will start on **`http://localhost:4000`**.

### Step 4: Client Setup & Startup

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The Vite frontend will start on **`http://localhost:3000`**.

---

## 6. End-to-End Automated Testing

Ensure both client (`localhost:3000`) and server (`localhost:4000`) are running, then:

```bash
npx playwright test
```

---

## 7. Current Implementation Status

- **Completed Core MVP & Integrations:**
  - Authenticated 4-Step Onboarding Flow (`/onboarding`).
  - Builder Command Center Dashboard (`/dashboard`).
  - Curated Builder Discovery (`/discover`).
  - Intros & Dialogue Messaging Interface (`/messages`).
  - Peer Profile View (`/profile/elena-vance` / `/profile/:id`).
  - Profile Edit View (`/profile/edit`).
  - Venture Listings & Spin-out Tool (`/ventures`).
  - Settings & Membership Plans (`/settings/membership`).
  - Paystack Payment Integration with HMAC SHA512 raw-body webhook verification (`/api/v1/payments`).
  - Cloudinary Media Asset Management (`/api/v1/media`).
  - Brevo Transactional Email Service (`/api/v1/email`).
  - OpenAI AI-powered Synergy Matching with Groq fallback (`/api/v1/ai`).
  - Neon PostgreSQL Database with Prisma ORM (`DATABASE_URL`).
  - End-to-End Automated Testing with Playwright (`npx playwright test`).
