# BambiFound Local Development System Design

## Overview
BambiFound is an AI-powered startup ecosystem platform built on a locked monorepo technology stack.

## System Topology

```
+-----------------------------------------------------------------------------------+
|                                  BROWSER (Client)                                 |
|               React 18 + Vite + Tailwind CSS + TanStack Query                    |
+-----------------------------------------------------------------------------------+
                                         |
                       HTTP REST / JSON | JWT Bearer Token
                                         v
+-----------------------------------------------------------------------------------+
|                                BACKEND API (apps/api)                              |
|                   NestJS + Passport JWT + Argon2id + OpenAPI                     |
+-----------------------------------------------------------------------------------+
     |                     |                     |                    |
     v                     v                     v                    v
+---------------+  +---------------+  +---------------+   +------------------------+
|  PostgreSQL   |  |     Redis     |  | MinIO Storage |   |  AI Provider Interface |
|  + pgvector   |  |   + BullMQ    |  | (S3 API:9000) |   |  (OpenAI / Groq)       |
+---------------+  +---------------+  +---------------+   +------------------------+
```

## Key Technical Decisions

1. **Monorepo Architecture**: pnpm workspaces partition `apps/web`, `apps/api`, and shared `packages/` (`types`, `validation`, `ui`, `config`).
2. **PostgreSQL + pgvector**: Unified relational store for domain models (`User`, `RefreshToken`, `Profile`, `Match`) alongside vector embeddings.
3. **Argon2id Password Hashing**: State-of-the-art password hashing using Argon2id algorithm via `argon2` module.
4. **JWT Access & Refresh Token Architecture**: Access token valid for 15 minutes, refresh token valid for 7 days with rotation and database revocation tracking.
5. **AI Provider Abstraction**: Internal `AIService` interface decouples business logic from external LLMs. OpenAI is primary provider, Groq is fallback provider.
6. **Design Governance**: Google Stitch project `stitch_bambifound_ai_startup_ecosystem` is authoritative visual source of truth. Missing screens are recorded in `docs/design/design-gap-backlog.md`.
