# BambiFound Local Development Setup Guide

This document explains how to set up, build, run, and test the BambiFound monorepo locally.

## Prerequisites

- **Node.js**: `v20.0.0` or higher (`node -v`)
- **pnpm**: `v9.0.0` or higher (`pnpm -v`)
- **Docker & Docker Compose**: Installed and running
- **PostgreSQL 16+**: (If running outside Docker) with `pgvector` extension enabled

---

## Step-by-Step Instructions

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd bambifound
pnpm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in root and in `apps/api/.env`:
```bash
cp .env.example .env
cp .env.example apps/api/.env
```

### 3. Start Local Infrastructure
Using Docker Compose:
```bash
pnpm docker:up
```
Or start PostgreSQL + pgvector and Redis manually on local ports 5432 and 6379.

### 4. Run Database Migrations & Prisma Generation
```bash
cd apps/api
pnpm exec prisma db push
pnpm exec prisma generate
```

### 5. Start Development Servers
Start both backend API (port 4000) and frontend web app (port 3000) concurrently:
```bash
pnpm dev
```

### 6. Access Applications
- **Frontend App**: `http://localhost:3000`
- **Backend REST API**: `http://localhost:4000/api/v1`
- **OpenAPI / Swagger Docs**: `http://localhost:4000/api/docs`
- **Mailpit Web UI**: `http://localhost:8025`
- **MinIO Console**: `http://localhost:9001`

---

## Running Tests

### Backend Unit & Integration Tests
```bash
cd apps/api
pnpm test
```

### Frontend Unit & Component Tests
```bash
cd apps/web
pnpm test
```

### Run All Workspace Tests
```bash
pnpm test
```
