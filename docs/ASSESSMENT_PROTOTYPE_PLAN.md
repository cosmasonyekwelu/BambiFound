# BambiFound Assessment Prototype — Implementation Plan

This document outlines the simple, phased implementation plan for the BambiFound assessment prototype. The prototype demonstrates the core experience: **Profile → Intent → Match → Connect**.

---

## 1. Tech Stack & Architecture

- **Frontend Framework**: **React + Vite + TypeScript + Tailwind CSS**
  - Single-page application (SPA) with strong type safety, modern bundling via Vite, and styling with Tailwind CSS.
- **Backend Framework**: **Node.js + Express + TypeScript**
  - RESTful API backend handling authentication, profile management, intent processing, matching algorithms, and data persistence.
- **Database**: **SQLite via Prisma ORM**
  - Zero-configuration, local file-based relational database ideal for rapid prototyping without needing a separate database server.
- **Authentication**: **JWT (JSON Web Tokens) + bcryptjs**
  - Stateless authentication with `bcryptjs` password hashing and HTTP `Authorization: Bearer <token>` authorization headers.
- **File Storage**: **Local File System (`/uploads`)**
  - Static file storage and serving via Express middleware (`express.static('uploads')`) for user profile photos and media uploads.
- **Local Execution**:
  - The entire application (frontend and backend) and the database will run locally during development and assessment.

---

## 2. Local Environment Execution

When running locally, the prototype consists of:
- **Frontend Dev Server**: Vite running on `http://localhost:5173` (React + Vite + TypeScript + Tailwind CSS)
- **Backend API Server**: Express running on `http://localhost:4000` (Node.js + Express + TypeScript)
- **Database File**: Local SQLite database file stored at `./prisma/dev.db`
- **Upload Directory**: Local file upload folder at `./uploads/`

---

## 3. Scope & MVP Boundaries

To keep the assessment prototype focused and maintainable, the following features are deferred:
- Enterprise ATS / Recruitment workflows
- Advanced investor intelligence / VC tools
- Real-time WebSockets / complex chat infrastructure
- Mobile native apps
- Payment processing or fundraising management

---

## 4. Phased Implementation Plan & Concrete Outputs

### Phase 1: Project Foundation & Database Setup
- **Tasks**:
  - Set up root project directory structure with React + Vite + TypeScript + Tailwind CSS frontend and Node.js + Express + TypeScript backend.
  - Initialize Prisma ORM and configure SQLite database connection.
  - Define relational Prisma schema models:
    - `User` (id, email, password_hash, account_type, created_at, updated_at)
    - `Profile` (id, user_id, name, role, location, bio, skills, experience_level, photo_url, work_preference, availability)
    - `Intent` (id, user_id, intent_type, natural_language_desc, structured_attributes, created_at)
    - `Match` (id, source_user_id, target_user_id, opportunity_id, score, reasons, status, created_at)
    - `Connection` (id, requester_id, recipient_id, status, created_at)
    - `Message` (id, conversation_id, sender_id, content, read_at, created_at)
  - Execute database migrations (`npx prisma migrate dev`).
- **Concrete Outputs**:
  - Initialized repository with configured `package.json`, `tsconfig.json`, Tailwind setup, and folder structures.
  - Working Prisma schema in `prisma/schema.prisma` with SQLite database initialized (`prisma/dev.db`).
  - Executable seed script to populate sample test data.

### Phase 2: Authentication & Profile Management
- **Tasks**:
  - Implement Express auth endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/me` using JWT and bcryptjs.
  - Implement Profile API endpoints: `/api/profile` (GET, PUT) with `multer` middleware for local `/uploads` photo handling.
  - Create React + Vite + TypeScript UI components: Register, Login, Profile Form, Profile View.
  - Implement client-side JWT persistence and request interceptors.
- **Concrete Outputs**:
  - Working registration and login API endpoints returning JWTs.
  - Profile creation and edit forms with avatar image upload storing files in `/uploads`.
  - Protected API route middleware and protected UI page guards.

### Phase 3: Intent Capture & AI Understanding
- **Tasks**:
  - Implement Intent API endpoints: `/api/intents` (POST, GET).
  - Implement AI Intent Extractor to parse natural-language goals into structured matching attributes (skills, target roles, experience level, work arrangement, complementary capabilities).
  - Build `IntentForm` UI allowing users to select intent types and enter natural-language descriptions.
- **Concrete Outputs**:
  - Working Intent API capable of storing and retrieving user intents.
  - Structured JSON parser converting unstructured intent strings into matching signals.
  - Interactive Intent management UI page.

### Phase 4: Hybrid Matching Engine & Match Explanations
- **Tasks**:
  - Implement Hybrid Matching Engine (`/api/matches`):
    - **Hard filters**: Availability, work preference (remote/hybrid/onsite).
    - **Structured matching**: Overlapping skills, target roles, industry alignment.
    - **Complementarity scoring**: Matching business/founder needs with technical/engineering capabilities.
  - Implement Match Explanation generator producing bulleted "Why this match?" justifications.
  - Build Discovery & Recommendations UI (`MatchList`, `MatchCard`).
- **Concrete Outputs**:
  - Matching API endpoint returning ranked candidate matches with match scores and structured explanation bullet points.
  - Discovery UI page with filtering options and clear match explanations for each recommendation.

### Phase 5: Connection Requests & Basic Messaging
- **Tasks**:
  - Implement Connection API (`/api/connections`): Send request, accept, reject, save match.
  - Implement Messaging API (`/api/messages`): Fetch conversations and send 1-on-1 messages between connected users.
  - Build UI components for Connection action buttons and a lightweight `ChatWindow` component.
- **Concrete Outputs**:
  - Functional Connection management UI showing pending, accepted, and saved connections.
  - 1-on-1 text messaging interface operating between accepted connections.

### Phase 6: End-to-End Verification & Documentation
- **Tasks**:
  - Walk through the core end-to-end user flow: **Profile → Intent → Match → Connect**.
  - Verify all local execution instructions and local storage paths (`/uploads`, `prisma/dev.db`).
  - Finalize documentation and verify test coverage.
- **Concrete Outputs**:
  - Verified and fully functional local prototype.
  - Comprehensive documentation in `README.md` and `PRD.md` detailing startup instructions and architecture.
