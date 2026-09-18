# BambiFound

**AI-powered startup ecosystem matching platform**

## Product Vision
Build an intelligent platform that helps people navigate the startup ecosystem by making relevant relationships and opportunities easier to discover.

## Problem Statement
Startup participants frequently have difficulty finding the right people or opportunities at the right time. Existing services often address only one relationship type. BambiFound aims to provide a contextual discovery layer across multiple startup relationships.

## Target Users
- **Founder**: Looking for co-founder, early team member, specialist, or collaborator
- **Startup/Company**: Looking for interns, junior/senior professionals, founding-team members, or specialist talent
- **Talent/Job Seeker**: Seeking startup jobs, internships, founding roles, projects, or other opportunities
- **Early Talent**: People with limited professional experience but relevant skills, ambition, or potential
- **Investor/VC**: Ecosystem participant interested in startup discovery and market intelligence (future-facing)

## Core Value Proposition
| User | Value |
|---|---|
| Founder | Find complementary people to build with |
| Startup | Discover relevant talent more efficiently |
| Talent | Find startup opportunities aligned with skills and goals |
| Early Talent | Discover meaningful entry points into startups |
| Ecosystem | Create a more connected startup discovery network |

## MVP Scope
The MVP focuses on four capabilities:
1. **Profile creation** - User profiles with basic, professional, and preference information
2. **Intent capture** - Select current intents with natural-language descriptions
3. **AI-assisted matching** - Hybrid matching engine combining structured and semantic matching
4. **Discovery and connection** - Search, filters, connection requests, and messaging

### Core Flow
```
Sign Up → Create Profile → State Intent → AI Understands Profile + Intent
   ↓                              ↓
Matching Engine          Recommended People / Opportunities
   ↓                              ↓
Review Match                Connect
```

## Key Features
- **Authentication**: Register, login, logout, password reset, account verification
- **User Profiles**: Basic info (name, photo, location, bio) + Professional (role, skills, experience, industry, education) + Preferences (remote/hybrid/onsite, availability, opportunity type, preferred industries, working arrangement)
- **Intent Capture**: Multiple intents with natural-language descriptions (e.g., "Looking for technical co-founder in Fintech needing backend engineering, open to remote")
- **AI Profile Understanding**: Structured attributes including skills, experience level, intent, industries, work preferences
- **AI Matching Engine**: Matching based on skills, experience, goals, intent, industry, startup stage, location, work preference, availability, interests, complementary capabilities
- **Match Explanations**: Understandable explanations of why a recommendation was made
- **Discovery**: Filter people/startups/jobs/founding opportunities/collaboration opportunities by role, skill, industry, experience, location, opportunity type, startup stage, work arrangement, intent
- **Connection**: Send/receive connection requests, accept/reject, save matches, decline recommendations, block/report users
- **Opportunity Listings**: Co-founder, founding engineer, backend engineer, product designer, growth intern, marketing lead, etc. with title, description, required skills, experience level, industry, startup stage, location, work arrangement, compensation type, equity information, status
- **AI Opportunity Recommendations**: Based on user profiles and intent
- **Basic Messaging**: One-to-one messages after connection accepted (conversation list, timestamps, read/unread state, block/report)

## Technology Stack
- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod
- **Backend**: Node.js + Express/NestJS or Python/Django
- **Database**: PostgreSQL
- **AI**: LLM API, embeddings, vector database/search when justified
- **Deployment**: Frontend on Vercel, backend on suitable cloud platform, managed PostgreSQL

## Development Roadmap
- **Phase 1**: Project setup, authentication, database, profiles, core UI
- **Phase 2**: Intent selection, natural-language intent, startup profiles, opportunity creation
- **Phase 3**: Structured matching, AI profile analysis, semantic matching, match explanations
- **Phase 4**: Connection requests, messaging, notifications
- **Phase 5**: Real-user testing, feedback collection, match-quality analysis, UX improvements, bug fixing
- **Phase 6**: Production deployment, security checks, monitoring, documentation, demo preparation

## MVP Success Criteria
- Users can register, create meaningful profiles, state current intent
- Startups can create opportunities with requirements
- AI understands profile/intent, produces relevant recommendations with explanations
- Users can connect and communicate

## Validation Plan
The key hypothesis: People want a more intelligent and contextual way to discover startup relationships and opportunities relevant to their goals and capabilities.

1. Interview founders
2. Interview startup hiring managers
3. Interview job seekers and early talent
4. Document how they currently find people and opportunities
5. Identify biggest frustrations
6. Test the BambiFound matching concept
7. Prototype the core workflow
8. Test with real users
9. Build smallest functional version
10. Measure actual usage and feedback

## Principles
1. **Relevance over volume** — recommend useful connections rather than maximizing matches
2. **Intent matters** — what a user wants now is as important as their static profile
3. **Complementarity matters** — strong matches may have different but complementary capabilities
4. **AI should assist, not obscure** — recommendations should be explainable
5. **Build for real users** — validate assumptions before expanding the product
6. **Keep the MVP focused** — prove the core matching loop before building the wider ecosystem

## One-Sentence Product Definition
> BambiFound is an AI-powered startup ecosystem that understands what founders, startups, and talent are looking for and intelligently connects them with relevant people and opportunities based on skills, experience, goals, interests, and compatibility.

## North Star
**Find → Match → Connect → Build**

BambiFound succeeds when a user enters with a clear goal, discovers a genuinely relevant person or opportunity, makes a connection, and takes a meaningful step toward building something real.