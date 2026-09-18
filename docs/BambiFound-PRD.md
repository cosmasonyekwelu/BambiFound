# BambiFound — Product Requirements Document (PRD)

**Product:** BambiFound  
**Version:** 1.0  
**Status:** MVP Definition  
**Category:** Impact & Innovation  
**Tagline:** Find your people. Build your future.

## 1. Product Overview

BambiFound is an AI-powered startup ecosystem designed to help founders, startups, talent, and opportunity seekers find the right people and opportunities needed to build and grow startups.

The platform addresses a fragmented discovery problem: finding a co-founder, early employee, startup job, internship, founding role, collaborator, or other relevant opportunity often depends on personal networks, geography, timing, and multiple disconnected platforms.

BambiFound uses AI to understand a user's profile and current intent, identify relevant and complementary capabilities, and recommend people or opportunities with clear explanations for why a match may be relevant.

## 2. Problem Statement

Startup participants frequently have difficulty finding the right people or opportunities at the right time.

A founder may need a technical co-founder or early employee. A startup may need talent. A professional may want a startup job or founding opportunity. An early-career person may be looking for an internship or a chance to join a startup team.

Existing services often address only one relationship type. BambiFound aims to provide a contextual discovery layer across multiple startup relationships while keeping the first MVP focused on a small, testable workflow.

## 3. Product Vision

Build an intelligent platform that helps people navigate the startup ecosystem by making relevant relationships and opportunities easier to discover.

## 4. Product Mission

Reduce the dependence on chance and personal networks when founders, startups, and talent are trying to find people or opportunities that fit their current goals and capabilities.

## 5. Target Users

### 5.1 Founder

A person building or planning to build a startup and looking for a co-founder, early team member, specialist, collaborator, or other startup opportunity.

### 5.2 Startup / Company

An early-stage company looking for interns, junior or senior professionals, founding-team members, or specialist talent.

### 5.3 Talent / Job Seeker

A professional, student, intern, or experienced worker seeking startup jobs, internships, founding roles, projects, or other opportunities.

### 5.4 Early Talent

People with limited professional experience but relevant skills, ambition, or potential who want opportunities to learn and contribute.

### 5.5 Investor / VC

An ecosystem participant interested in startup discovery and market intelligence. Investors are a future-facing user group rather than a primary MVP workflow.

## 6. User Intent Model

Users should not be locked into one permanent role. A person can have several simultaneous intents.

Examples:

- Looking for a co-founder
- Looking for talent
- Hiring
- Looking for a startup job
- Looking for an internship
- Open to a founding role
- Looking for collaborators
- Building a startup
- Exploring startup opportunities

Users can also describe their needs in natural language, for example:

> I'm building a fintech startup and need a technical co-founder with backend experience who is open to remote collaboration.

The AI should transform this into useful structured matching signals.

## 7. Core Value Proposition

| User | Value |
|---|---|
| Founder | Find complementary people to build with |
| Startup | Discover relevant talent more efficiently |
| Talent | Find startup opportunities aligned with skills and goals |
| Early Talent | Discover meaningful entry points into startups |
| Ecosystem | Create a more connected startup discovery network |

## 8. MVP Scope

The MVP will focus on four capabilities:

1. Profile creation
2. Intent capture
3. AI-assisted matching
4. Discovery and connection

### Core flow

```text
Sign Up
   ↓
Create Profile
   ↓
State Intent
   ↓
AI Understands Profile + Intent
   ↓
Matching Engine
   ↓
Recommended People / Opportunities
   ↓
Review Match
   ↓
Connect
```

The MVP should not attempt to become a complete jobs marketplace, investor marketplace, social network, and recruitment ATS simultaneously.

## 9. MVP Features

### 9.1 Authentication

Users can:

- Register
- Log in
- Log out
- Reset password
- Verify their account
- Maintain a secure session

**Acceptance criteria:** authentication works, duplicate accounts are handled, errors are clear, and protected resources require authorization.

### 9.2 User Profile

Profiles should contain:

**Basic**
- Name
- Profile photo
- Location
- Bio

**Professional**
- Current role
- Skills
- Experience level
- Years of experience
- Industry
- Education
- Previous experience

**Startup**
- Startup name, if applicable
- Startup stage
- Description
- Industry
- Team size
- Current needs

**Preferences**
- Remote / hybrid / onsite
- Availability
- Opportunity type
- Preferred industries
- Working arrangement

### 9.3 Intent Capture

Users select one or more current intents and may provide a natural-language description.

Example:

```text
Intent: Technical Co-Founder
Industry: Fintech
Required capability: Backend Engineering
Work preference: Remote
```

### 9.4 AI Profile Understanding

The AI converts profile and intent information into structured attributes such as:

```json
{
  "skills": ["Node.js", "Python", "PostgreSQL"],
  "experience_level": "mid",
  "intent": ["technical_cofounder", "startup"],
  "industries": ["fintech", "AI"],
  "work_preference": "remote"
}
```

The system should identify skills, experience, goals, intent, industries, preferences, and potential complementary capabilities.

### 9.5 AI Matching Engine

Matching is the central intelligence feature.

Signals can include:

- Skills
- Experience
- Goals
- Intent
- Industry
- Startup stage
- Location
- Work preference
- Availability
- Interests
- Complementary capabilities

A match should not be based only on identical skills. Complementary capabilities can be highly relevant.

### 9.6 Match Explanation

Instead of showing only a score, the system should explain the recommendation.

Example:

```text
Why this match?

• You are looking for a technical co-founder.
• The candidate has backend engineering experience.
• Both are interested in fintech.
• The candidate is open to founding roles.
• Both support remote collaboration.
```

### 9.7 Discovery

Users can discover:

- People
- Startups
- Jobs
- Founding opportunities
- Collaboration opportunities

Filters can include role, skill, industry, experience, location, opportunity type, startup stage, work arrangement, and intent.

### 9.8 Connection

Users can:

- Send a connection request
- Accept or reject a request
- Save a match
- Decline a recommendation
- Block or report a user

Private information should not be exposed without appropriate user control.

### 9.9 Opportunity Listings

Startups can create opportunities such as:

- Co-founder
- Founding engineer
- Backend engineer
- Product designer
- Growth intern
- Marketing lead

Each opportunity should include title, description, required skills, experience level, industry, startup stage, location, work arrangement, compensation type, equity information where applicable, and status.

### 9.10 AI Opportunity Recommendations

The system recommends opportunities based on user profiles and intent.

Example:

```text
Founding Backend Engineer
Fintech Startup · Remote

Why:
✓ Backend skills match
✓ Fintech interest matches
✓ User is open to founding roles
✓ Remote preference matches
```

### 9.11 Messaging

Basic one-to-one messaging can be available after a connection is accepted.

MVP requirements:

- Conversation list
- One-to-one messages
- Timestamps
- Read/unread state
- Block/report

Advanced real-time messaging can be deferred if it threatens MVP delivery.

## 10. Core User Journeys

### Founder → Co-Founder

```text
Register
 ↓
Create founder profile
 ↓
Select "Looking for co-founder"
 ↓
Describe startup and needs
 ↓
AI analyses requirements
 ↓
Matching engine finds candidates
 ↓
Founder reviews matches
 ↓
Founder sees match explanation
 ↓
Connection request
 ↓
Accepted
 ↓
Conversation
```

### Talent → Startup Opportunity

```text
Register
 ↓
Create professional profile
 ↓
Add skills and experience
 ↓
Select opportunity intent
 ↓
Set preferences
 ↓
AI analyses profile
 ↓
Recommended opportunities
 ↓
Review
 ↓
Apply / Connect
```

### Startup → Talent

```text
Create company profile
 ↓
Create opportunity
 ↓
Specify requirements
 ↓
Publish
 ↓
AI identifies relevant talent
 ↓
Review candidates
 ↓
Connect
```

## 11. Main Screens

### Public

- Landing page
- How It Works
- About
- Opportunities
- Login
- Register

### Authenticated

- Dashboard
- My Profile
- Edit Profile
- My Intent
- Discover
- Matches
- Saved
- Opportunities
- Messages
- Notifications
- Settings

### Company

- Company Profile
- Create Opportunity
- Manage Opportunities
- Recommended Talent
- Applicants

## 12. Dashboard Requirements

The dashboard should show:

- Profile completion
- Current intent
- Recommended matches
- Recommended opportunities
- Saved items
- Recent connections
- Suggested next action

Example:

```text
Welcome back

Looking for: Technical Co-Founder

Recommended Matches
[Match] [Match] [Match]

Recommended Opportunities
[Opportunity] [Opportunity]

Profile: 85% complete
Complete your profile to improve recommendations.
```

## 13. Matching Architecture

The MVP should use a hybrid approach rather than relying entirely on an LLM.

```text
Profile + Intent
       ↓
Structured Attributes
       ↓
Hard Filters
       ↓
Structured Matching
       ↓
Semantic Similarity / Embeddings
       ↓
Ranking
       ↓
AI Explanation
       ↓
Recommendation
```

### Hard filters

Remove clearly incompatible candidates where a requirement is mandatory.

### Structured matching

Compare explicit fields such as skills, intent, experience, industry, availability, and preferences.

### Semantic matching

Use embeddings/vector search where appropriate to identify meaning-level similarity between profiles, goals, descriptions, and opportunities.

### Explanation

Generate a concise, understandable explanation of the strongest matching signals.

## 14. AI Requirements

The AI should:

- Understand structured and natural-language profiles.
- Extract useful attributes.
- Understand user intent.
- Identify complementary capabilities.
- Recommend relevant people and opportunities.
- Explain recommendations.
- Learn from user feedback over time.

The AI should not:

- Automatically reject candidates solely from an AI score.
- Infer unnecessary sensitive characteristics.
- Present guesses as facts.
- Hide important recommendation factors.
- Replace human judgment in consequential hiring decisions.

## 15. Feedback Loop

Users should be able to indicate whether recommendations are useful.

Feedback examples:

- Relevant
- Not relevant
- Interested
- Not interested
- Wrong skill
- Wrong opportunity
- Wrong location
- Wrong intent
- Already connected

This feedback can later improve ranking and personalization.

## 16. Data Model

### User

```text
id
email
password_hash
account_type
status
created_at
updated_at
```

### Profile

```text
id
user_id
name
bio
location
photo
role
experience_level
years_experience
skills
industries
interests
availability
work_preference
```

### Intent

```text
id
user_id
intent_type
description
preferences
created_at
updated_at
```

### Startup

```text
id
owner_id
name
description
industry
stage
team_size
location
website
created_at
```

### Opportunity

```text
id
startup_id
title
type
description
required_skills
experience_level
work_type
compensation
status
created_at
updated_at
```

### Match

```text
id
source_user_id
target_user_id
opportunity_id
match_type
score
reasons
status
created_at
```

### Connection

```text
id
requester_id
recipient_id
status
created_at
```

### Message

```text
id
conversation_id
sender_id
content
read_at
created_at
```

## 17. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Users can register and authenticate securely. |
| FR-02 | Users can create and update profiles. |
| FR-03 | Users can select and update multiple intents. |
| FR-04 | Authorized startups can create and manage opportunities. |
| FR-05 | Users can search and filter people and opportunities. |
| FR-06 | The system generates relevant recommendations. |
| FR-07 | Recommendations include understandable explanations. |
| FR-08 | Users can request, accept, reject, and manage connections. |
| FR-09 | Connected users can communicate through the MVP workflow. |
| FR-10 | Users can provide recommendation feedback. |

## 18. Privacy, Safety and Responsible AI

BambiFound may process professional, career, founder, and startup information. The system should therefore implement:

- Secure authentication
- Authorization
- Data minimization
- Profile visibility controls
- Secure storage
- Access controls
- User reporting and blocking
- Appropriate audit logging
- Clear explanation that AI recommendations are recommendations, not guarantees

## 19. Security Requirements

- Password hashing
- Secure authentication/session handling
- Authorization checks
- Input validation
- API rate limiting
- Secure secret management
- Protection against common web vulnerabilities
- Safe file-upload handling if files are introduced
- Security event logging where appropriate

## 20. Non-Functional Requirements

### Performance

- Fast common page loads
- Responsive search and discovery
- Loading states for AI operations
- Graceful timeout/error handling

### Scalability

Architecture should allow future expansion to more users, opportunities, matching operations, AI models, vector search, and real-time messaging.

### Reliability

- Error handling
- Retry logic where appropriate
- Duplicate prevention
- Backups
- Monitoring

### Accessibility

The interface should work across common desktop and mobile screen sizes and maintain clear, understandable interaction patterns.

## 21. Suggested Technical Architecture

### Frontend

- React
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod

### Backend

A suitable option is:

- Node.js + Express/NestJS

A Python/Django implementation is also viable if it better supports the development workflow.

### Database

- PostgreSQL

### AI

- LLM API
- Embeddings
- Vector database/search when justified

### Deployment

- Frontend: Vercel or equivalent
- Backend: suitable cloud platform
- Database: managed PostgreSQL

## 22. MVP Boundaries

Do not require these for the first release:

- Full investor marketplace
- Advanced VC intelligence
- Complex payment infrastructure
- Full social network
- Advanced recruitment ATS
- Native mobile application
- Large-scale real-time messaging
- Automated hiring decisions
- Complex fundraising workflows

These can be evaluated after the core matching workflow is validated.

## 23. Validation Plan

The key hypothesis is:

> People want a more intelligent and contextual way to discover startup relationships and opportunities that are relevant to their goals and capabilities.

### Validation steps

1. Interview founders.
2. Interview startup hiring managers.
3. Interview job seekers and early talent.
4. Document how they currently find people and opportunities.
5. Identify their biggest frustrations.
6. Test the BambiFound matching concept.
7. Prototype the core workflow.
8. Test with real users.
9. Build the smallest functional version.
10. Measure actual usage and feedback.

## 24. MVP Success Criteria

### User

- Users can register.
- Users can create meaningful profiles.
- Users can state current intent.

### Startup

- Startups can create opportunities.
- Opportunities can specify requirements.

### AI

- The system understands profile/intent information.
- The system produces relevant recommendations.
- The system explains why a recommendation was made.

### Connection

- Users can express interest.
- Users can connect.
- Connected users can communicate.

### Validation

The MVP must be tested with real, non-self users and feedback should be captured about usefulness, relevance, usability, and missing functionality.

## 25. Product Metrics

### Activation

- Profile completion rate
- Intent completion rate
- Percentage receiving a first recommendation

### Engagement

- Profiles viewed
- Matches viewed
- Opportunities viewed
- Saved matches
- Connection requests

### Matching quality

- Relevant recommendation rate
- Match acceptance rate
- Connection rate
- Conversation initiation rate

### Retention

- Returning users
- Weekly active users
- Repeat discovery sessions

## 26. Competitive Positioning

BambiFound should not position itself simply as another job board or founder-investor marketplace.

Its intended positioning is a **contextual startup ecosystem matching platform**.

The core relationship graph is:

```text
Founder ↔ Co-Founder
Startup ↔ Talent
Talent ↔ Opportunity
Founder ↔ Startup

Future:
Startup ↔ Investor
```

The differentiating layer is the ability to understand the context and intent behind these relationships.

## 27. Risks and Mitigation

### Cold-start problem

**Risk:** A matching marketplace needs enough relevant users and opportunities.

**Mitigation:** Start with a focused community, geography, or startup segment and build density before expanding.

### Poor match quality

**Risk:** Irrelevant recommendations reduce trust.

**Mitigation:** Combine structured matching, semantic similarity, explainability, and user feedback.

### Fake or exaggerated profiles

**Risk:** Users may misrepresent experience or skills.

**Mitigation:** Add verification mechanisms over time and clearly distinguish user-provided claims from verified information.

### Overbuilding

**Risk:** The ecosystem concept can become too broad for an MVP.

**Mitigation:** Keep the initial workflow focused on **Profile → Intent → Match → Connection**.

### AI cost

**Risk:** Excessive LLM calls can increase operating cost.

**Mitigation:** Use structured data and deterministic filtering first, reserve LLM calls for tasks where they add measurable value, cache reusable outputs, and monitor usage.

## 28. Development Roadmap

### Phase 1 — Foundation

- Project setup
- Authentication
- Database
- Profiles
- Core UI

### Phase 2 — Intent and Opportunities

- Intent selection
- Natural-language intent
- Startup profiles
- Opportunity creation

### Phase 3 — Matching

- Structured matching
- AI profile analysis
- Semantic matching where justified
- Match explanations

### Phase 4 — Connection

- Connection requests
- Messaging
- Notifications

### Phase 5 — Validation

- Real-user testing
- Feedback collection
- Match-quality analysis
- UX improvements
- Bug fixing

### Phase 6 — Launch

- Production deployment
- Security checks
- Monitoring
- Documentation
- Demo preparation

## 29. Definition of Done

A feature is complete when:

- UI is implemented.
- Required backend functionality exists.
- Data persists correctly.
- Validation exists.
- Authorization is enforced.
- Errors are handled.
- The feature works in the deployed environment.
- The critical user journey has been tested.
- Relevant documentation exists.

## 30. Example End-to-End Scenario

### Founder input

> I'm building an AI fintech startup. I have business and sales experience but need a technical co-founder with backend engineering skills. I am open to remote collaboration.

### AI interpretation

```text
Industry: Fintech / AI
Current capabilities: Business / Sales
Looking for: Technical Co-Founder
Required skills: Backend Engineering
Work preference: Remote
```

### Candidate

```text
Backend Engineer
4 years experience
Interested in fintech
Open to founding roles
Remote
```

### Explanation

```text
Potentially relevant because:

• The founder is looking for a technical co-founder.
• The candidate has backend engineering experience.
• Both are interested in fintech.
• The candidate is open to founding opportunities.
• Both support remote collaboration.
```

The founder can then send a connection request.

## 31. Product Principles

1. **Relevance over volume** — recommend useful connections rather than maximizing the number of matches.
2. **Intent matters** — what a user wants now is as important as their static profile.
3. **Complementarity matters** — strong matches may have different but complementary capabilities.
4. **AI should assist, not obscure** — recommendations should be explainable.
5. **Build for real users** — validate assumptions before expanding the product.
6. **Keep the MVP focused** — prove the core matching loop before building the wider ecosystem.

## 32. One-Sentence Product Definition

> **BambiFound is an AI-powered startup ecosystem that understands what founders, startups, and talent are looking for and intelligently connects them with relevant people and opportunities based on skills, experience, goals, interests, and compatibility.**

## 33. MVP North Star

### Find → Match → Connect → Build

BambiFound succeeds when a user enters with a clear goal, discovers a genuinely relevant person or opportunity, makes a connection, and takes a meaningful step toward building something real.
