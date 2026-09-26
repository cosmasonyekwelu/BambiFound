# BambiFound — Product Requirements Document (PRD)

**Product:** BambiFound
**Version:** 1.0
**Status:** MVP Definition & Assessment Plan
**Category:** Impact & Innovation
**Tagline:** Find your people. Build your future.

---

## Agent Steering & Implementation Decisions

### Database Decision & Trade-off Analysis
- **Original Option Considered:** SQLite via Prisma ORM
  - *Suitability for Relational Entities:* SQLite fully supports relational schema capabilities (Foreign Keys, JOINs, Indexes, Transactions) required to model BambiFound's core entities (`User`, `Profile`, `Intent`, `Startup`, `Opportunity`, `Match`, `Connection`, `Message`).
- **Alternative Considered:** PostgreSQL
  - *Features:* Client-server architecture, robust concurrency, native JSONB query support, and cloud-managed scalability.
- **Trade-off Discussed:**
  - *PostgreSQL* offers higher concurrency and advanced database features suitable for multi-user production deployments, but requires installing, running, and configuring a separate database server process locally or in the cloud.
  - *SQLite* is a lightweight, zero-configuration file-based database that runs seamlessly within the local application environment without external services or port dependencies.
- **Final Human Decision:** SQLite via Prisma ORM
- **Reasoning for Local Prototype:** The human evaluator explicitly decided to use SQLite with Prisma to maintain a clean, zero-dependency local database environment that runs entirely on disk (`./prisma/dev.db`) without requiring a separate PostgreSQL server setup.
- **Steering Process Note:** This was an explicit human steering decision made after reviewing the trade-off explanation provided by the AI agent.

### Technical Stack & Architecture Decisions
- **Frontend Framework:** React + Vite + TypeScript + Tailwind CSS (Strictly TypeScript, no plain JavaScript)
- **Backend Framework:** Node.js + Express + TypeScript
- **Database:** SQLite via Prisma ORM
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs
- **File Storage:** Local file system (`/uploads`) for media and user profile photos
- **Execution Model:** Both the application (frontend SPA & backend Express server) and the SQLite database will run locally.

---

## 1. Product Overview

BambiFound is an AI-powered startup ecosystem designed to help founders, startups, talent, and opportunity seekers find the right people and opportunities needed to build and grow startups.

The platform addresses a fragmented discovery problem: finding a co-founder, early employee, startup job, internship, founding role, collaborator, or other relevant opportunity often depends on personal networks, geography, timing, and multiple disconnected platforms.

BambiFound uses AI to understand a user's profile and current intent, identify relevant and complementary capabilities, and recommend people or opportunities with clear explanations for why a match may be relevant.

---

## 2. Technical Stack & Local Execution Model

| Component | Stack Specification | Execution Environment |
|---|---|---|
| **Frontend Framework** | React + Vite + TypeScript | Local Vite Dev Server (`http://localhost:5173`) |
| **Frontend Styling** | Tailwind CSS | Compiled locally via Vite / PostCSS |
| **Backend Framework** | Node.js + Express + TypeScript | Local Express API Server (`http://localhost:4000`) |
| **Database** | SQLite via Prisma ORM | Local File Database (`./prisma/dev.db`) |
| **Authentication** | JWT + bcryptjs | Express Middleware with HTTP Bearer Headers |
| **File Storage** | Local File System (`/uploads`) | Served statically via Express middleware |

---

## 3. User Intent Model

Users should not be locked into one permanent role. A person can have several simultaneous intents (e.g., Looking for a co-founder, Looking for talent, Hiring, Looking for a startup job, Looking for an internship).

Natural-language descriptions are parsed into structured matching attributes:
> *"I'm building a fintech startup and need a technical co-founder with backend experience who is open to remote collaboration."*

---

## 4. MVP Core Scope & User Journey

The core MVP flow follows: **Profile → Intent → Match → Connect**

```text
Sign Up → Create Profile → State Intent → AI Understands Profile + Intent
   ↓                              ↓
Matching Engine          Recommended People / Opportunities
   ↓                              ↓
Review Match                Connect
```

---

## 5. Ordered Implementation Phases & Concrete Outputs

### Phase 1: Project Foundation & Database Setup
- **Tasks:**
  - Set up root repository structure for React + Vite + TypeScript + Tailwind CSS frontend and Node.js + Express + TypeScript backend.
  - Configure Prisma ORM with SQLite database file (`prisma/dev.db`).
  - Define relational schema models: `User`, `Profile`, `Intent`, `Startup`, `Opportunity`, `Match`, `Connection`, `Message`.
  - Execute initial database migrations (`npx prisma migrate dev`).
- **Concrete Outputs:**
  - Initialized mono-repo/project structure with configured `package.json`, `tsconfig.json`, and Tailwind CSS setup.
  - Valid Prisma schema (`prisma/schema.prisma`) and initialized SQLite database (`prisma/dev.db`).
  - Database seed script populating mock test profiles and opportunities.

### Phase 2: Authentication & Profile Management
- **Tasks:**
  - Implement Auth API endpoints (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`) using JWT and `bcryptjs`.
  - Implement Profile API endpoints (`/api/profile`) with `multer` middleware storing image uploads in local `/uploads`.
  - Build UI components in React + Vite + TypeScript: Auth forms, Profile editor, Avatar uploader, Profile viewer.
- **Concrete Outputs:**
  - Working JWT registration and login flows with token storage in `localStorage`.
  - Profile management interface allowing skill inputs, preferences, bio updates, and profile picture upload to `/uploads`.
  - Auth route guards protecting backend endpoints and frontend views.

### Phase 3: Intent Capture & AI Understanding
- **Tasks:**
  - Build Intent API endpoints (`/api/intents` POST, GET).
  - Implement AI Intent Extractor (parsing natural language inputs into structured attributes: roles, skills, experience level, remote preference, complementarity needs).
  - Build `IntentForm` UI for selecting standard intent categories and entering natural-language goals.
- **Concrete Outputs:**
  - Active Intent API saving user intents with natural-language text.
  - JSON parser converting natural-language statements into structured matching parameters.
  - Intent management UI page.

### Phase 4: Hybrid Matching Engine & Match Explanations
- **Tasks:**
  - Build Hybrid Matching Engine (`/api/matches`):
    - *Hard filtering:* Availability and work preference (remote/hybrid/onsite).
    - *Structured matching:* Skill overlap, experience alignment, target roles.
    - *Complementarity scoring:* Business/founder needs matched to technical/developer capabilities.
  - Generate human-readable "Why this match?" justifications.
  - Build Discovery UI (`MatchList`, `MatchCard`) in React + Vite + TypeScript.
- **Concrete Outputs:**
  - Matching engine API returning ranked recommendations with scores and concise bulleted explanations.
  - Interactive Discovery page with search filters and clear match reasoning displayed on each card.

### Phase 5: Connection Requests & Basic Messaging
- **Tasks:**
  - Build Connection API (`/api/connections`): Request, accept, reject, save.
  - Build Messaging API (`/api/messages`): Fetch conversations and exchange 1-on-1 messages between connected users.
  - Build React UI for connection management and a 1-on-1 `ChatWindow` component.
- **Concrete Outputs:**
  - Functional Connection management tab showing pending, accepted, and saved connections.
  - Active text messaging interface between connected users.

### Phase 6: End-to-End Verification & Documentation
- **Tasks:**
  - Perform full end-to-end verification of the workflow: **Profile → Intent → Match → Connect**.
  - Verify local database (`dev.db`) and local media upload directory (`/uploads`).
  - Update complete documentation (`README.md`, `PRD.md`).
- **Concrete Outputs:**
  - Verified local application prototype running locally.
  - Clear local startup instructions and documentation.

---

## 6. Data Model

### User
```text
id, email, password_hash, account_type, created_at, updated_at
```

### Profile
```text
id, user_id, name, bio, location, photo_url, role, experience_level, years_experience, skills, industries, interests, availability, work_preference
```

### Intent
```text
id, user_id, intent_type, natural_language_desc, structured_attributes, created_at, updated_at
```

### Startup
```text
id, owner_id, name, description, industry, stage, team_size, location, website, created_at
```

### Opportunity
```text
id, startup_id, title, type, description, required_skills, experience_level, work_type, compensation, status, created_at, updated_at
```

### Match
```text
id, source_user_id, target_user_id, opportunity_id, score, reasons, status, created_at
```

### Connection
```text
id, requester_id, recipient_id, status, created_at
```

### Message
```text
id, conversation_id, sender_id, content, read_at, created_at
```

---

## 7. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Users can register and authenticate securely using JWT and bcryptjs. |
| FR-02 | Users can create and update profiles, including photo uploads saved to local `/uploads`. |
| FR-03 | Users can select and update multiple intents with natural language descriptions. |
| FR-04 | Startups can create and manage opportunities. |
| FR-05 | Users can search and filter candidate profiles and startup opportunities. |
| FR-06 | System generates recommendations using hybrid matching (hard filters + structured + complementarity). |
| FR-07 | Recommendations include clear, human-readable explanations ("Why this match?"). |
| FR-08 | Users can send, accept, reject, and save connection requests. |
| FR-09 | Connected users can communicate via 1-on-1 messaging. |
| FR-10 | Entire application and SQLite database execute locally. |

---

## 8. Definition of Done for Task 1

Task 1 is complete when:
- PRD.md contains the explicit `## Agent Steering & Implementation Decisions` section.
- Ordered implementation phases with concrete outputs are documented in PRD.md and `ASSESSMENT_PROTOTYPE_PLAN.md`.
- Tech stack is consistently defined across all documents:
  - Frontend: React + Vite + TypeScript + Tailwind CSS
  - Backend: Node.js + Express + TypeScript
  - Database: SQLite via Prisma
  - Authentication: JWT + bcryptjs
  - File Storage: local `/uploads`
  - Local execution for application and database explicitly documented.
