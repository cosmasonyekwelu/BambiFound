# BambiFound Implementation Plan

## 1. Purpose
This document is the SINGLE CANONICAL IMPLEMENTATION ROADMAP for BambiFound. It provides an executable, dependency-driven sequence to build the application from its current empty state through MVP production deployment.

## 2. Source of Truth
1. Product Requirements Document (PRD)
2. `docs/SYSTEM_DESIGN.md`
3. Approved Stitch Designs (`stitch_bambifound_ai_startup_ecosystem`)
4. Current repository state.

## 3. Current Repository Baseline
*   `client/`: **DOES NOT EXIST**
*   `server/`: **DOES NOT EXIST**
*   `docker-compose.yml`: **DOES NOT EXIST**
*   `docs/SYSTEM_DESIGN.md`: **COMPLETE**
*   `PRD.md`: **COMPLETE**
**Conclusion:** The repository requires full initialization starting from Phase 1.

## 4. Implementation Principles
*   Fastest reliable path to MVP.
*   Vertical slice delivery where possible.
*   No premature microservices, giant initial schemas, or DB optimization.
*   Dependency-driven execution (do not build feature X before infrastructure Y).
*   No Redis for the MVP. No MongoDB.

## 5. Final Architecture Summary
*   **Repository:** Single Git repo, two independent apps (`client/` and `server/`).
*   **Frontend (Client):** React, Vite, TS, Tailwind, shadcn/ui, TanStack Query, React Hook Form, Zod.
*   **Backend (Server):** NestJS, TS, REST, Prisma.
*   **Database:** Neon (Managed PostgreSQL + pgvector).
*   **Deployment:** Vercel (Frontend), Render (Backend).
*   **External Services:** Cloudinary (Media), Monnify Sandbox (Payments), OpenAI (AI Primary), Groq (AI Fallback).

## 6. Dependency Graph
Repo Init &rarr; Local Infra (Docker) &rarr; DB Setup (Prisma) &rarr; API Base &rarr; Frontend Base &rarr; Auth &rarr; Profiles &rarr; Intent &rarr; Startups &rarr; Opportunities &rarr; AI Abstraction &rarr; AI Extraction & Embeddings &rarr; Hybrid Matching &rarr; Connections &rarr; Messaging &rarr; Cloudinary &rarr; Monnify &rarr; Security/Testing &rarr; Deploy (DB &rarr; API &rarr; Client).

---

## 7. Phase 0 — Repository Audit
**AUDIT-001 — Verify Baseline**
*   **Purpose:** Confirm PRD/System Design constraints against repo.
*   **Status:** **COMPLETE**

---

## 8. Phase 1 — Foundation
**BOOT-001 — Initialize Client and Server**
*   **Purpose:** Create the dual-application structure.
*   **Dependencies:** None
*   **Implementation:** Scaffold `client/` (Vite React-TS) and `server/` (NestJS CLI). Set up root linting and Git configs.
*   **Status:** NOT STARTED

---

## 9. Phase 2 — Local Infrastructure
**INFRA-001 — Create Local Docker Compose**
*   **Purpose:** Provision local PostgreSQL (with pgvector) and Mailpit.
*   **Dependencies:** BOOT-001
*   **Implementation:** Add `docker-compose.yml`, local volumes, health checks.
*   **Status:** NOT STARTED

---

## 10. Phase 3 — Database
**DB-001 — Initialize Prisma & Base Schema**
*   **Purpose:** Connect NestJS to PostgreSQL.
*   **Dependencies:** INFRA-001
*   **Implementation:** Initialize Prisma, set `DATABASE_URL`, create base `User` schema, run first migration.
*   **Status:** NOT STARTED

---

## 11. Phase 4 — Backend Foundation
**API-001 — NestJS API Bootstrap**
*   **Purpose:** Establish REST conventions and global middleware.
*   **Dependencies:** DB-001
*   **Implementation:** Global validation pipe (Zod integration), exception filters, Swagger documentation setup, `/api/health` endpoint.
*   **Status:** NOT STARTED

---

## 12. Phase 5 — Frontend Foundation
**WEB-001 — React/Vite Bootstrap**
*   **Purpose:** Establish UI conventions.
*   **Dependencies:** BOOT-001
*   **Implementation:** Install Tailwind, shadcn/ui, TanStack Query, React Router. Setup base layouts and global error boundary.
*   **Status:** NOT STARTED

---

## 13. Phase 6 — Authentication
**AUTH-001 — Backend Auth Module**
*   **Purpose:** JWT Access/Refresh flow.
*   **Dependencies:** API-001
*   **Implementation:** Registration, Login, Logout endpoints. Argon2id password hashing. HttpOnly cookie handling for refresh tokens.
*   **Status:** NOT STARTED

**AUTH-002 — Frontend Auth State**
*   **Purpose:** Client-side protected routes.
*   **Dependencies:** AUTH-001, WEB-001
*   **Implementation:** Login/Register forms matching Stitch designs, Auth context, Axios interceptor for JWT refresh, protected route wrappers.
*   **Status:** NOT STARTED

---

## 14. Phase 7 — Landing Page
**WEB-002 — Implement Landing Page**
*   **Purpose:** Public entry point.
*   **Dependencies:** WEB-001
*   **Implementation:** Match approved Stitch design for the landing page.
*   **Status:** NOT STARTED

---

## 15. Phase 8 — Profiles
**PROFILE-001 — Backend Profile CRUD**
*   **Purpose:** User biographical data storage.
*   **Dependencies:** AUTH-001
*   **Implementation:** Update Prisma with `Profile` model (1:1 with User). Endpoints to create/update profile (bio, headline, location, skills).
*   **Status:** NOT STARTED

**PROFILE-002 — Frontend Profile UI**
*   **Purpose:** User interface for profiles.
*   **Dependencies:** PROFILE-001, WEB-001
*   **Implementation:** Forms for editing profile. *Depends on Stitch design availability.*
*   **Status:** NOT STARTED

---

## 16. Phase 9 — Intent
**INTENT-001 — Intent Data Model**
*   **Purpose:** Track multi-select user goals.
*   **Dependencies:** PROFILE-001
*   **Implementation:** Prisma `Intent` enum/table. API to toggle intents.
*   **Status:** NOT STARTED

---

## 17. Phase 10 — Startups
**STARTUP-001 — Startup Creation & Management**
*   **Purpose:** Allow founders to list 1 free startup.
*   **Dependencies:** API-001
*   **Implementation:** Prisma `Startup` model (1:N with User, but logically constrained to 1 for MVP). CRUD endpoints.
*   **Status:** NOT STARTED

---

## 18. Phase 11 — Opportunities
**OPP-001 — Opportunity Listings**
*   **Purpose:** Startups post roles/needs.
*   **Dependencies:** STARTUP-001
*   **Implementation:** Prisma `Opportunity` model (associated with Startup). Endpoints for creation and discovery.
*   **Status:** NOT STARTED

---

## 19. Phase 12 — AI
**AI-001 — AI Provider Abstraction**
*   **Purpose:** Decouple SDKs from logic.
*   **Dependencies:** API-001
*   **Implementation:** Interface `AIService`. Implement `OpenAIService` and `GroqService`. Provide fallback logic in NestJS DI.
*   **Status:** NOT STARTED

**AI-002 — AI Profile Understanding**
*   **Purpose:** Extract structured data.
*   **Dependencies:** AI-001, PROFILE-001
*   **Implementation:** Prompt passing freeform text to AI, expecting Zod-validated JSON output for structured skills.
*   **Status:** NOT STARTED

---

## 20. Phase 13 — Embeddings / pgvector
**VECTOR-001 — Vector Storage & Generation**
*   **Purpose:** Enable semantic search.
*   **Dependencies:** AI-001, DB-001
*   **Implementation:** Enable `pgvector` in DB. Add `embedding` column (vector) to Profile/Opportunity. Generate via AI service and save.
*   **Status:** NOT STARTED

---

## 21. Phase 14 — Matching
**MATCH-001 — Hybrid Matching Engine**
*   **Purpose:** Combine semantic and hard filters.
*   **Dependencies:** VECTOR-001, INTENT-001
*   **Implementation:** Database query integrating exact matches (Intent/Location) + Cosine similarity (pgvector).
*   **Status:** NOT STARTED

**MATCH-002 — Match Explanations**
*   **Purpose:** "Why this match?" text generation.
*   **Dependencies:** MATCH-001, AI-001
*   **Implementation:** Generate short string summarizing overlap via AI. Store in `Match` model.
*   **Status:** NOT STARTED

---

## 22. Phase 15 — Connections
**CONN-001 — Connection Lifecycle**
*   **Purpose:** Professional networking state.
*   **Dependencies:** PROFILE-001
*   **Implementation:** Prisma `Connection` (Pending, Accepted, Rejected). API to request and accept.
*   **Status:** NOT STARTED

---

## 23. Phase 16 — Messaging
**MSG-001 — Real-time Chat**
*   **Purpose:** Allow connected users to message.
*   **Dependencies:** CONN-001
*   **Implementation:** Prisma `Message` model. WebSockets (Socket.IO) gateway in NestJS. Security to ensure users are connected.
*   **Status:** NOT STARTED

---

## 24. Phase 17 — Media
**MEDIA-001 — Cloudinary Integration**
*   **Purpose:** Image uploads for profiles/startups.
*   **Dependencies:** API-001, STARTUP-001
*   **Implementation:** Backend signed-URL generation. Frontend direct-upload capability. Save URL to DB.
*   **Status:** NOT STARTED

---

## 25. Phase 18 — Payments
**PAY-001 — Monnify Sandbox Integration**
*   **Purpose:** Test environment payments.
*   **Dependencies:** API-001
*   **Implementation:** NestJS Webhook receiver. Transaction initiation endpoints. Update internal entitlement state.
*   **Status:** NOT STARTED

---

## 26. Phase 19 — Security
**SEC-001 — Security Hardening**
*   **Purpose:** Pre-deployment lockdown.
*   **Dependencies:** All API features
*   **Implementation:** CORS configuration mapping frontend origin, helmet middleware, rate-limiting on Auth/AI routes.
*   **Status:** NOT STARTED

---

## 27. Phase 20 — Testing
**TEST-001 — E2E & Critical Paths**
*   **Purpose:** Ensure stability.
*   **Dependencies:** SEC-001
*   **Implementation:** Playwright flow for Registration -> Login -> Profile Create. Jest/Supertest for matching algorithm.
*   **Status:** NOT STARTED

---

## 28. Phase 21 — Production Preparation
**DEPLOY-001 — Environment Secrets**
*   **Purpose:** Stage configs for Vercel, Render, Neon.
*   **Dependencies:** None
*   **Implementation:** Define strict separation of CLIENT, SERVER, DB variables.
*   **Status:** NOT STARTED

---

## 29. Phase 22 — Database Deployment
**DEPLOY-002 — Neon PostgreSQL Provisioning**
*   **Purpose:** Prod DB setup.
*   **Dependencies:** DEPLOY-001
*   **Implementation:** Provision Neon DB. Run `npx prisma migrate deploy`. Ensure `pgvector` extension exists.
*   **Status:** NOT STARTED

---

## 30. Phase 23 — Backend Deployment
**DEPLOY-003 — Render Deployment**
*   **Purpose:** Deploy NestJS API.
*   **Dependencies:** DEPLOY-002
*   **Implementation:** Connect GitHub to Render Web Service. Set env vars (Neon DB URL, OpenAI, Groq, JWT secrets). Verify `/api/health`.
*   **Status:** NOT STARTED

---

## 31. Phase 24 — Frontend Deployment
**DEPLOY-004 — Vercel Deployment**
*   **Purpose:** Deploy React Client.
*   **Dependencies:** DEPLOY-003
*   **Implementation:** Connect GitHub to Vercel. Set `VITE_API_URL` pointing to Render API.
*   **Status:** NOT STARTED

---

## 32. Phase 25 — Production Integration
**DEPLOY-005 — CORS & Integration Test**
*   **Purpose:** Ensure systems communicate.
*   **Dependencies:** DEPLOY-004
*   **Implementation:** Configure Render CORS to specifically allow Vercel domain. Create real account.
*   **Status:** NOT STARTED

---

## 33. Phase 26 — Production Verification
**MVP-001 — Production Sandbox Validation**
*   **Purpose:** E2E manual checks in Prod.
*   **Implementation:** Verify Monnify webhooks reach Render. Verify Cloudinary images load on Vercel. Verify AI matching succeeds.
*   **Status:** NOT STARTED

---

## 34. Phase 27 — MVP Acceptance
**MVP-002 — Final Sign-off**
*   **Purpose:** Confirm PRD fulfillment.
*   **Implementation:** Verify FIND &rarr; MATCH &rarr; CONNECT &rarr; BUILD loop works live.
*   **Status:** NOT STARTED

---

## 35. Phase 28 — Documentation / Handoff
**DOC-001 — Final Documentation**
*   **Implementation:** Update `README.md` with explicit local run instructions. Finalize API docs.
*   **Status:** NOT STARTED

---

## 36. Traceability Matrix

| PRD Requirement | Phase | Task ID | Area | Acceptance Criterion |
| :--- | :--- | :--- | :--- | :--- |
| Independent Repos | Phase 1 | BOOT-001 | Root | Two isolated folders |
| Local DB/Infra | Phase 2 | INFRA-001 | Docker | Postgres starts locally |
| JWT Authentication | Phase 6 | AUTH-001 | API | Secure login works |
| Profile Creation | Phase 8 | PROFILE-001| API/Web| User stores profile data |
| Startup Listings | Phase 10 | STARTUP-001| API | 1 free startup created |
| Vector Similarity | Phase 13 | VECTOR-001 | DB/API | pgvector semantic match |
| AI Fallback | Phase 12 | AI-001 | API | Groq handles OpenAI failure|
| Messaging | Phase 16 | MSG-001 | API/Web| WSS chat works |
| Monnify Sandbox | Phase 18 | PAY-001 | API | Webhook processed |
| Vercel/Render Prod | Phase 23,24| DEPLOY-003| Ops | Sites are live |

---

## 37. Design Dependencies
The following frontend implementation tasks are strictly blocked until Google Stitch designs are approved:
*   Onboarding / Profile forms
*   Dashboard
*   Discover / Matches
*   Match Detail
*   Opportunities
*   Startup Discovery
*   Connections
*   Messaging
*   Settings

*Status: **MISSING — DESIGN REQUIRED** for these screens.*

---

## 38. Risks and Blockers
*   **Synchronous AI Blockers:** AI abstraction (AI-001) is synchronous. If OpenAI hangs, HTTP requests will timeout. Mitigation: strict timeout configurations.
*   **Frontend Blockers:** Implementation of specific routes halts completely if Stitch designs are unavailable.

---

## 39. Deferred Features
*   Investor intents and matching functionality.
*   Redis / Background Jobs (BullMQ).
*   Paid tier logic (Venture Studio/Serial tiers).
*   Live Monnify payments (Sandbox only for MVP).
*   Production APM/Observability.

---

## 40. Final Definition of Done
The BambiFound MVP is strictly "Done" when:
*   Authentication is secure (JWT/Argon2id).
*   Profiles, Intents, Startups, and Opportunities can be created and queried.
*   AI successfully abstracts OpenAI/Groq for extraction and `pgvector` semantic matching.
*   Users can Connect and Message in real-time.
*   Media successfully uploads to Cloudinary.
*   Monnify Sandbox processes webhooks successfully.
*   The application is deployed securely to Vercel (Frontend), Render (Backend), and Neon (Database).
*   Approved Stitch designs are accurately implemented.
*   The core user journey (Find &rarr; Match &rarr; Connect &rarr; Build) functions end-to-end in production.
