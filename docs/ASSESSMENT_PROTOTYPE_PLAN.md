# BambiFound Assessment Prototype — Implementation Plan

This document outlines the simple, phased implementation plan for the BambiFound assessment prototype. The prototype demonstrates the core experience: **Profile → Intent → Match → Connect**.

---

## 1. Architecture & Tech Stack

- **Frontend Framework**: **React + Vite + Tailwind CSS**
  - Simple, fast single-page application (SPA) setup with clean UI styling.
- **Backend Framework**: **Node.js + Express (TypeScript)**
  - RESTful API backend handling business logic, matching algorithms, and data access.
- **Database**: **SQLite (via Prisma ORM)**
  - Zero-configuration, file-based relational database suitable for local development and rapid prototyping.
- **Authentication**: **JWT (JSON Web Tokens)**
  - Simple stateless authentication with `bcryptjs` for secure password hashing and HTTP `Authorization: Bearer <token>` headers.
- **File Storage**: **Local File System (`/uploads`)**
  - Static file serving via Express middleware (`express.static('uploads')`) for user profile photos and media uploads.

---

## 2. Local Environment Execution

When running locally, the prototype consists of:
- **Frontend Dev Server**: Vite running on `http://localhost:5173`
- **Backend API Server**: Express running on `http://localhost:4000`
- **Database File**: Local SQLite database file stored at `./prisma/dev.db`
- **Upload Directory**: Local file upload folder at `./uploads/`

---

## 3. Scope & MVP Boundaries

To keep the assessment prototype focused and small, the following features are intentionally deferred:
- Enterprise ATS / Recruitment workflows
- Advanced investor intelligence / VC tools
- Real-time WebSockets / complex chat infrastructure
- Mobile native apps
- Payment processing or fundraising management

---

## 4. Phased Implementation Plan

### Phase 1: Project Foundation & Database Setup
- Set up root project structure with React (Vite) frontend and Express (TypeScript) backend.
- Initialize Prisma ORM and configure SQLite database connection.
- Define database models:
  - `User` (email, password_hash, account_type)
  - `Profile` (name, role, location, bio, skills, experience_level, photo_url)
  - `Intent` (intent_type, natural_language_desc, structured_attributes)
  - `Match` (source_user_id, target_user_id, score, reasons)
  - `Connection` (requester_id, recipient_id, status)
  - `Message` (conversation_id, sender_id, content, timestamp)
- Run database migrations (`npx prisma migrate dev`) and verify schema initialization.

### Phase 2: Authentication & Profile Creation (**Profile**)
- **Backend**:
  - Build Auth API endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`.
  - Build Profile API endpoints: `/api/profile` (GET, PUT) with `multer` middleware for local photo uploads.
- **Frontend**:
  - Build Register and Login views with token persistence in `localStorage`.
  - Build `ProfileForm` and `ProfileView` components to manage user details (skills, role, preferences, bio, photo upload).

### Phase 3: Intent Capture & AI Understanding (**Intent**)
- **Backend**:
  - Build Intent API endpoints: `/api/intents` (POST, GET).
  - Implement AI Intent Extractor (utilizing LLM API with structured output or rule-based fallback) to extract structured matching attributes (skills, experience, target roles, complementary needs) from natural language input.
- **Frontend**:
  - Build `IntentForm` UI allowing users to select intent types (e.g., "Looking for Co-Founder", "Looking for Startup Job") and enter natural-language goals (e.g., *"Building a fintech startup, need a technical co-founder with backend experience open to remote"*).

### Phase 4: Hybrid Matching Engine & Match Explanations (**Match**)
- **Backend**:
  - Implement matching engine endpoint (`/api/matches`):
    - **Hard filtering**: Incompatible availability/work preferences.
    - **Structured matching**: Overlapping and complementary skills/roles.
    - **Complementarity scoring**: Matching technical needs to business skills and vice versa.
  - Implement match explanation service to generate concise "Why this match?" justifications.
- **Frontend**:
  - Build Discovery & Recommendation UI (`MatchList`, `MatchCard`) displaying matched user profiles along with clear explanation points.

### Phase 5: Connection Requests & Basic Messaging (**Connect**)
- **Backend**:
  - Build Connection API endpoints (`/api/connections`): Send request, accept, reject, save match.
  - Build Messaging API endpoints (`/api/messages`): Send and fetch 1-on-1 messages between connected users.
- **Frontend**:
  - Add Connection action buttons ("Connect", "Accept", "Save") on match cards.
  - Build lightweight `ChatWindow` component to allow connected users to exchange text messages.

### Phase 6: End-to-End Verification & Scope Review
- Perform full end-to-end walkthrough of the prototype flow: **Profile → Intent → Match → Connect**.
- Ensure clean documentation and setup instructions are available for running the prototype locally.
