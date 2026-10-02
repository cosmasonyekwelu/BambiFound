# BambiFound Canonical Implementation Plan

This document is the **SINGLE SOURCE OF TRUTH** for the implementation sequencing of BambiFound. It reconciles product requirements, assessment requirements, local development architecture, and the locked technology stack into one authoritative roadmap. 

---

## 1. Project Baseline

- **Product**: BambiFound
- **Product Definition**: An AI-powered startup ecosystem that helps founders, startups, and talent find the right people and opportunities to build and grow.
- **North Star**: FIND → MATCH → CONNECT → BUILD
- **Core Product Loop**: PROFILE → INTENT → AI UNDERSTANDING → MATCH → WHY THIS MATCH → CONNECT → BUILD
- **MVP Scope**: Focused strictly on founders, startups, and professionals. 
- **Core Users**: Founder, Startup / Company, Talent / Professional, Early Talent.
- **Deferred Scope**: Investor functionality, complex paid billing tiers, production observability systems, production environment host decisions.
- **Business Model**: Every user/founder can list 1 startup profile free forever. Future paid tiers (e.g., Venture Studio / Serial for 2+ startups) are acknowledged but exact pricing is not hardcoded in the MVP.
- **AI Role**: AI assists users and provides explainable recommendations. It does not replace human judgment, make consequential hiring decisions automatically, or infer sensitive characteristics.

---

## 2. Locked Technology Stack

| Category | Technology | Status | Purpose |
| :--- | :--- | :--- | :--- |
| **Language** | TypeScript | LOCKED | Universal language across stack |
| **Repository** | pnpm Workspace Monorepo | LOCKED | Code organization |
| **Frontend** | React + Vite | LOCKED | Web application framework |
| **UI** | Tailwind CSS + shadcn/ui | LOCKED | Styling and component library |
| **Backend** | NestJS | LOCKED | API and business logic framework |
| **API** | REST | LOCKED | Client-server communication |
| **ORM** | Prisma | LOCKED | Database access and typing |
| **Database** | PostgreSQL | LOCKED | Primary relational data store |
| **Vector search** | pgvector | LOCKED | Native semantic vector storage |
| **Primary AI provider** | OpenAI API | LOCKED | Core AI model provider |
| **Fallback AI provider** | Groq API | LOCKED | High-speed/fallback AI provider |
| **AI abstraction** | Provider interface | LOCKED | Isolates business logic from AI SDKs |
| **Auth** | JWT access + refresh tokens | LOCKED | Stateless authentication |
| **Password hashing**| Argon2id | LOCKED | Secure credential storage |
| **Realtime** | WebSockets (Socket.IO) | LOCKED | Live messaging/events |
| **Background jobs** | BullMQ | LOCKED | Asynchronous task processing |
| **Queue/cache** | Redis | LOCKED | In-memory store for BullMQ/Sockets |
| **File storage** | S3-compatible (MinIO local) | LOCKED | Object storage |
| **Email** | Local Mailpit | LOCKED | Local email testing |
| **Local infrastructure**| Docker Compose | LOCKED | Reproducible local environment |
| **API documentation** | OpenAPI / Swagger | LOCKED | API contract definition |
| **Validation** | Zod + Nest validation | LOCKED | Schema validation at boundaries |
| **Server state** | TanStack Query | LOCKED | Frontend data fetching/caching |
| **Forms** | React Hook Form + Zod | LOCKED | Frontend form state/validation |
| **Frontend hosting**| Vercel | LOCKED | Production frontend delivery |
| **CI/CD** | GitHub Actions | LOCKED | Automated pipelines |
| **Testing** | Vitest, RTL, Supertest, Playwright | LOCKED | Comprehensive testing suite |
| **Logging** | Structured JSON logging | LOCKED | Machine-readable application logs |
| **Observability** | OpenTelemetry-compatible | LOCKED | Telemetry standards |
| **Backend host** | TBA | OPEN | Decide before deployment |
| **Prod object storage** | TBA | OPEN | Decide before deployment |
| **Prod email provider** | TBA | OPEN | Decide before deployment |

---

## 3. Repository Architecture

The monorepo uses a concrete, justified structure powered by `pnpm`.

```text
bambifound/
├── apps/
│   ├── web/                # React + Vite frontend application
│   └── api/                # NestJS REST API application
├── packages/
│   ├── ui/                 # Shared React components (shadcn/ui + Tailwind)
│   ├── config/             # Shared ESLint, Prettier, and TS configurations
│   ├── types/              # Shared TypeScript definitions and DTOs
│   └── validation/         # Shared Zod schemas used by both frontend and backend
├── docs/                   # Project documentation, ADRs, and plans
└── docker-compose.yml      # Local development infrastructure definition
```

---

## 4. Local Development System

The local environment relies on Docker Compose to guarantee reproducibility without coupling to external managed services (except external AI APIs).

**Required Local Services (Docker):**
- PostgreSQL + pgvector
- Redis
- MinIO
- Mailpit

**Application Services:**
- React/Vite frontend (`apps/web`)
- NestJS API (`apps/api`)

**External Services:**
- OpenAI API
- Groq API

**Dependency Order:**
1. Infrastructure containers start and achieve health (DB, Redis, MinIO, Mailpit).
2. API starts, connects to infrastructure, runs migrations, and connects to AI providers.
3. Frontend starts and connects exclusively to the local API.

*(Frontend must NEVER directly access OpenAI/Groq credentials. All AI calls route through the NestJS API.)*

---

## 5. Implementation Sequence

### Step 01 — Repository Bootstrap
- **Purpose**: Initialize monorepo.
- **Required implementation**: `pnpm` workspace, TypeScript config, shared `config` package, Git config, basic GitHub Actions CI.
- **Acceptance**: A fresh clone can install dependencies and execute basic workspace commands.

### Step 02 — Local Infrastructure
- **Purpose**: Setup local dockerized services.
- **Required implementation**: `docker-compose.yml` with PostgreSQL/pgvector, Redis, MinIO, Mailpit, persistent volumes, and health checks.
- **Acceptance**: All required local infrastructure starts successfully and is reachable.

### Step 03 — Database Foundation
- **Purpose**: Establish data layer and schemas.
- **Required implementation**: Prisma schema, DB connection, migrations, dev seeding. Initial entities: User, Profile, Intent, Startup, Opportunity, Match, Connection, Message.
- **Acceptance**: Fresh database can migrate and seed deterministically.

### Step 04 — API Foundation
- **Purpose**: Bootstrap NestJS backend.
- **Required implementation**: NestJS app, REST architecture, global error handling, Zod validation pipes, structured logging, Swagger, health endpoint.
- **Acceptance**: API boots locally and exposes documented health/API infrastructure.

### Step 05 — Authentication
- **Purpose**: Secure user access.
- **Required implementation**: Registration, Login, Logout, JWT (access/refresh), Argon2id hashing, Auth guards.
- **Acceptance**: User can securely register, authenticate, refresh, logout, and access protected resources.

### Step 06 — User Profile
- **Purpose**: Core user identity.
- **Required implementation**: Profile CRUD, skills, experience, location, headline, bio, availability, goals, portfolio.
- **Acceptance**: Real authenticated user can create/maintain a BambiFound profile.

### Step 07 — Intent System
- **Purpose**: Allow multiple user intents (e.g., Build startup, Find co-founder, Find talent, Startup job).
- **Required implementation**: Intent selection, modification, retrieval.
- **Acceptance**: Users can select and persist multiple intents.

### Step 08 — Startup System
- **Purpose**: Allow founders to list their startups.
- **Required implementation**: Startup profile CRUD, ownership, discovery status, co-founder/talent needs. (1 free startup rule).
- **Acceptance**: A qualified user can create and manage their free startup profile.

### Step 09 — Opportunity System
- **Purpose**: Allow startups to post needs.
- **Required implementation**: Opportunity CRUD, discovery, types (Co-Founder, Job, Internship, etc.), requirements.
- **Acceptance**: Users can discover relevant opportunities.

### Step 10 — Discovery
- **Purpose**: Basic manual search and filtering.
- **Required implementation**: Search/filter endpoints for People, Startups, Opportunities based on product requirements.
- **Acceptance**: User can discover relevant entities using meaningful filters.

### Step 11 — AI Provider Abstraction
- **Purpose**: Isolate AI SDKs from business logic.
- **Required implementation**: Internal AI Provider interface. OpenAI primary adapter, Groq fallback adapter.
- **Acceptance**: Application executes AI operations through an interface and falls back securely.

### Step 12 — AI Profile Understanding
- **Purpose**: Process free-form profiles into structured attributes.
- **Required implementation**: Structured extraction of skills, experience, goals, intents.
- **Acceptance**: User profile is transformed into validated structured AI attributes.

### Step 13 — Embeddings + pgvector
- **Purpose**: Vectorize profiles/opportunities for semantic search.
- **Required implementation**: Embedding generation (via AI abstraction), storage in `pgvector`, vector indexing, similarity search.
- **Acceptance**: System retrieves semantically relevant candidate profiles/opportunities.

### Step 14 — Matching Engine
- **Purpose**: Hybrid recommendation algorithm.
- **Required implementation**: Engine combining hard constraints, structured attributes, intent compatibility, and semantic similarity.
- **Acceptance**: System produces relevant candidate matches using reviewable matching signals.

### Step 15 — Match Explanation
- **Purpose**: Explain AI recommendations.
- **Required implementation**: "Why this match?" generation referencing visible shared goals, skills, experience, industry.
- **Acceptance**: Every AI-assisted match presented has an understandable explanation.

### Step 16 — Connections
- **Purpose**: Professional networking graph.
- **Required implementation**: Request, accept, reject, cancel connections; state management.
- **Acceptance**: Users can establish and manage connections.

### Step 17 — Messaging
- **Purpose**: Realtime communication.
- **Required implementation**: Conversations, messages, persistence, WebSockets (Socket.IO), Redis pub/sub.
- **Acceptance**: Connected users can exchange messages reliably.

### Step 18 — Background Jobs
- **Purpose**: Offload heavy tasks.
- **Required implementation**: BullMQ for embedding generation, AI profile processing, emails. Retry policies, idempotency.
- **Acceptance**: Long-running tasks do not block API requests.

### Step 19 — Frontend Foundation
- **Purpose**: Bootstrap React app.
- **Required implementation**: Vite, Tailwind, shadcn/ui, TanStack Query, React Hook Form, Zod. Routing, API client.
- **Acceptance**: Frontend communicates with API and prepares to render Stitch screens.

### Step 20 — Core Frontend User Journeys
- **Purpose**: Implement the UI from Google Stitch designs.
- **Required implementation**: Landing, Registration, Login, Onboarding, Profile, Intent, Dashboard, Discovery, Match Detail, Startup Discovery/Detail, Opportunity Discovery/Detail, Connections, Messaging. (Add design gaps for missing screens).
- **Acceptance**: Core user journeys work end-to-end matching Stitch.

### Step 21 — Security Hardening
- **Purpose**: Pre-MVP security pass.
- **Required implementation**: Validate auth, CORS, rate limiting, SQLi/XSS protection, sensitive logging review.
- **Acceptance**: No unresolved critical vulnerabilities.

### Step 22 — Automated Testing
- **Purpose**: System stability.
- **Required implementation**: Unit, Integration, API, RTL (frontend), E2E (Playwright). AI mocked tests.
- **Acceptance**: Critical product flows have automated coverage.

### Step 23 — Real User Validation
- **Purpose**: Validate MVP with real non-developer users.
- **Required implementation**: Track completion, confusion, failure points, and match relevance across 10 core journeys.
- **Acceptance**: Documented evidence from real users.

### Step 24 — Deployment Readiness
- **Purpose**: Prepare for production.
- **Required implementation**: Prod config, environment variables, deployment procedures.
- **Acceptance**: Deployment procedure is documented and repeatable.

### Step 25 — MVP Acceptance
- **Purpose**: Final sign-off.
- **Acceptance**: Authentication, Profiles, Intents, Startups, Opportunities, Discovery, AI Understanding, Matching, Explanations, Connections, and Messaging all work. Security, tests, and user validation are complete. The North Star (FIND → MATCH → CONNECT → BUILD) is demonstrated.

---

## 6. Locked Decisions

- TypeScript Monorepo (pnpm)
- React + Vite + Tailwind + shadcn/ui
- NestJS + REST + Prisma
- PostgreSQL + pgvector
- Redis + BullMQ
- Local Docker Compose (MinIO, Mailpit)
- OpenAI Primary, Groq Fallback (Behind Abstraction Interface)
- JWT + Argon2id
- Google Stitch Design as visual source of truth
- Single free startup profile per user

---

## 7. Assessment Requirements

*(This section acts as the traceability matrix for external assessment requirements mapped into the plan)*

| Assessment Requirement | Implementation Step | Artifact/File | Test | Acceptance Criterion |
| :--- | :--- | :--- | :--- | :--- |
| Use Next.js/NestJS (NestJS locked) | Step 04 - API | `apps/api/` | Integration | API boots |
| PostgreSQL / Prisma | Step 03 - DB | `prisma/schema.prisma` | Integration | DB connects |
| Vector search via pgvector | Step 13 - Embeddings | `apps/api/` | Integration | Semantic search works |
| AI Integration (OpenAI/Groq) | Step 11 - AI Abstraction | `apps/api/src/ai/` | Unit/Mocked | Operations route through abstraction |
| Authentication System | Step 05 - Auth | `apps/api/src/auth/` | E2E | Users register/login |
| UI/UX implementation | Step 20 - Frontend | `apps/web/src/` | RTL | UI matches designs |

*(Note: Additional assessment constraints supplied during implementation must be added to this matrix.)*

---

## 8. Deferred

- Investor functionality
- Complex paid billing tiers (e.g., Venture Studio/Serial)
- Full production observability (OpenTelemetry backend implementation)

---

## 9. Open Questions

- **[blocks Step 24]** Production Backend Host — options: Render / Railway / AWS / GCP
- **[blocks Step 24]** Production Object Storage — options: AWS S3 / Cloudflare R2
- **[blocks Step 24]** Production Email Provider — options: Resend / SendGrid / Postmark

---

## 10. Assumptions

- Groq's API remains strictly compatible with OpenAI's interface for seamless fallback.
- The Google Stitch design files are complete enough for core MVP flows; missing screens will be documented in `docs/design/design-gap-backlog.md`.
- Real users will be available for Step 23 validation.

---

## 11. Change Control

Future implementation changes require:
1. Identifying the existing decision.
2. Explaining the reason for the change.
3. Creating an ADR (`docs/architecture/adr/`).
4. Updating this `docs/IMPLEMENTATION_PLAN.md` file.
5. Updating affected dependent artifacts.

**No implementation agent may change the architecture or stack without following this process.**

---

## 12. Final Status

**LOCKED**
