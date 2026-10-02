# ADR 0001: pnpm Monorepo Structure

## Context
BambiFound requires a cohesive codebase for frontend (`apps/web`), backend API (`apps/api`), and shared domain logic (types, validation schemas, UI tokens).

## Decision
We adopt a **pnpm monorepo workspace** structure:
- `apps/web`: React 18, Vite, Tailwind CSS, TanStack Query, React Router
- `apps/api`: NestJS, Prisma, Argon2id, Swagger, WebSockets
- `packages/types`: Shared TypeScript interfaces
- `packages/validation`: Shared Zod schemas
- `packages/ui`: Shared UI primitives
- `packages/config`: Shared compiler and linter configurations

## Consequences
- Single `pnpm install` manages all workspace dependencies.
- Shared validation schemas enforce consistency across frontend form handling and backend API endpoints.
- Type safety is guaranteed end-to-end across API boundaries.
