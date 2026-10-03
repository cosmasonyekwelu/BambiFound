# BambiFound — AI Startup Ecosystem Foundation

> **Positioning:** "Find the people who help you build."

BambiFound is an AI-powered startup ecosystem designed to help founders, early-stage startups, and technical talent find the people and opportunities needed to build and grow.

---

## 1. Repository Architecture

This repository contains two completely independent applications sharing a single Git repository:

```text
bambifound/
├── client/                 # React + Vite + Tailwind CSS frontend
│   ├── src/
│   ├── public/
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

## 2. Prerequisites

- **Node.js**: v22.x or later
- **npm**: 10.x / 11.x
- **Docker & Docker Compose** (for local PostgreSQL + Mailpit)

---

## 3. Local Setup & Quickstart

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

## 4. Local URLs & Documentation

| Service / Endpoint | URL |
| :--- | :--- |
| **Frontend Web Application** | [http://localhost:3000](http://localhost:3000) |
| **Backend API Base** | [http://localhost:4000/api](http://localhost:4000/api) |
| **API Health Check** | [http://localhost:4000/api/health](http://localhost:4000/api/health) |
| **Swagger / OpenAPI Documentation** | [http://localhost:4000/api/docs](http://localhost:4000/api/docs) |
| **Mailpit Web UI (Local Email Testing)** | [http://localhost:8025](http://localhost:8025) |

---

## 5. Testing Instructions

### Server Unit Tests
```bash
cd server
npm run test
```

### Client Unit Tests
```bash
cd client
npm run test
```

### End-to-End (E2E) Playwright Tests
Ensure both client (`localhost:3000`) and server (`localhost:4000`) are running, then:

```bash
npx playwright test
```

---

## 6. Build Verification Commands

### Server Production Build
```bash
cd server
npm run build
```

### Client Production Build
```bash
cd client
npm run build
```

---

## 7. Current Implementation Phase

- **Phases Completed:** 1 (Foundation), 2 (Local Infra), 3 (Database), 4 (Backend Foundation), 5 (Frontend Foundation), 6 (Authentication), 7 (Landing Page).
- **Next Phase:** Phase 8 — Profiles.
