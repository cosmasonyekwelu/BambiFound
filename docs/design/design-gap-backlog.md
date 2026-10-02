# BambiFound Design Gap Backlog

The Google Stitch project `stitch_bambifound_ai_startup_ecosystem` is the primary visual source of truth for BambiFound.

Per the **Stitch Implementation Rules**, visual layouts for missing screens MUST NOT be invented. Technical routes may exist to preserve system architecture, but arbitrary UI is strictly forbidden until official Stitch designs are provided.

---

## Missing Screen Inventory

### 1. Onboarding
- **Screen Name**: Onboarding Flow (Detailed Profile & Preferences)
- **Intended Purpose**: Capture detailed background, technical skills, startup stage preferences, and working availability after registration.
- **Intended Route**: `/onboarding`
- **User Journey**: Sign Up → Intent Selection → Onboarding → AI Understanding → Match Discovery
- **Dependencies**: AuthModule, Profile Schema
- **Status**: `MISSING — DESIGN REQUIRED`

### 2. Dashboard
- **Screen Name**: Builder / Talent Dashboard
- **Intended Purpose**: Central hub displaying active matches, recent connection requests, intent status, and recommended opportunities.
- **Intended Route**: `/dashboard`
- **User Journey**: Login → Dashboard → Match Review / Connection Management
- **Dependencies**: Matching Engine, Connections API
- **Status**: `MISSING — DESIGN REQUIRED`

### 3. Profile
- **Screen Name**: User / Founder Profile Editor & View
- **Intended Purpose**: Manage bio, professional experience, portfolio links, skills, and active intent statements.
- **Intended Route**: `/profile`
- **User Journey**: Navigation → Edit Profile → Save → Re-index AI Vectors
- **Dependencies**: User Profile Service, MinIO Storage
- **Status**: `MISSING — DESIGN REQUIRED`

### 4. Discover / Matches
- **Screen Name**: AI Match Discovery
- **Intended Purpose**: Browse AI-recommended people, founders, and talent with match scores and "Why This Match" explanations.
- **Intended Route**: `/discover`
- **User Journey**: Dashboard → Discover → Filter/Search → View Match Detail → Connect
- **Dependencies**: Hybrid Matching Engine, pgvector
- **Status**: `MISSING — DESIGN REQUIRED`

### 5. Match Detail
- **Screen Name**: Match Explanation & Capability Breakdown
- **Intended Purpose**: In-depth analysis showing complementary capabilities, shared industries, and AI match rationale.
- **Intended Route**: `/discover/match/:id`
- **User Journey**: Discover → Match Detail → Send Connection Request
- **Dependencies**: AI Match Explanation Service
- **Status**: `MISSING — DESIGN REQUIRED`

### 6. Opportunities
- **Screen Name**: Opportunities Marketplace
- **Intended Purpose**: Browse founding roles, co-founder positions, early startup jobs, and equity advisory opportunities.
- **Intended Route**: `/opportunities`
- **User Journey**: Navigation → Opportunities → Filter by Stage/Comp/Location → Apply/Connect
- **Dependencies**: Opportunity Listings API
- **Status**: `MISSING — DESIGN REQUIRED`

### 7. Opportunity Detail
- **Screen Name**: Single Opportunity View
- **Intended Purpose**: Full description of startup role, equity, compensation, team background, and application form.
- **Intended Route**: `/opportunities/:id`
- **User Journey**: Opportunities → Opportunity Detail → Express Interest
- **Dependencies**: Opportunity Service
- **Status**: `MISSING — DESIGN REQUIRED`

### 8. Startup Discovery
- **Screen Name**: Startup Directory & Ecosystem Search
- **Intended Purpose**: Explore early-stage startups building in the ecosystem filtered by sector, stage, and hiring status.
- **Intended Route**: `/startups`
- **User Journey**: Navigation → Startup Directory → Startup Profile
- **Dependencies**: Startup Entity Service
- **Status**: `MISSING — DESIGN REQUIRED`

### 9. Startup Detail
- **Screen Name**: Public Startup Profile
- **Intended Purpose**: Startup pitch, founding team, open roles, product traction, and contact button.
- **Intended Route**: `/startups/:id`
- **User Journey**: Startup Directory → Startup Detail → Request Connection / Apply
- **Dependencies**: Startup Service
- **Status**: `MISSING — DESIGN REQUIRED`

### 10. Connections
- **Screen Name**: Active Connections & Pending Requests
- **Intended Purpose**: Manage sent, received, accepted, and declined connection requests.
- **Intended Route**: `/connections`
- **User Journey**: Dashboard → Connections → Accept Request → Open Messaging
- **Dependencies**: Connection Request Engine
- **Status**: `MISSING — DESIGN REQUIRED`

### 11. Messaging
- **Screen Name**: Direct Messaging & Collaboration Threads
- **Intended Purpose**: 1-on-1 real-time messaging between connected founders, talent, and collaborators.
- **Intended Route**: `/messages`
- **User Journey**: Connections / Profile → Send Message → Realtime Chat
- **Dependencies**: WebSockets / Socket.IO, Redis
- **Status**: `MISSING — DESIGN REQUIRED`

### 12. Settings
- **Screen Name**: Account & Security Settings
- **Intended Purpose**: Update email, change password, manage notification preferences, and privacy controls.
- **Intended Route**: `/settings`
- **User Journey**: User Avatar Menu → Settings → Save Preferences
- **Dependencies**: AuthModule, User Service
- **Status**: `MISSING — DESIGN REQUIRED`

---

## Governance Procedure
When a new Stitch design becomes available in `stitch_bambifound_ai_startup_ecosystem`:
1. Verify the design against product requirements and PRD.
2. Implement exact layout, typography, colors, borders, and interaction states.
3. Remove the screen entry from this gap backlog document.
4. Record implementation details in the canonical engineering log.
