# BambiFound Development Troubleshooting Guide

### Common Issues & Resolutions

#### 1. PostgreSQL Connection Error (`P1001: Can't reach database server`)
- **Cause**: PostgreSQL service is not running on port 5432 or credentials differ.
- **Resolution**:
  Ensure PostgreSQL is active:
  ```bash
  sudo service postgresql status || pnpm docker:up
  ```
  Verify `DATABASE_URL` in `.env` matches your local database credentials.

#### 2. Vector Extension Missing (`extension "vector" does not exist`)
- **Cause**: `pgvector` extension is not installed on PostgreSQL.
- **Resolution**:
  Install `postgresql-16-pgvector` or run:
  ```sql
  CREATE EXTENSION IF NOT EXISTS vector;
  ```

#### 3. pnpm Workspace Build Script Ignored
- **Cause**: pnpm v10+ requires explicit script build approval for native packages (`@prisma/client`, `argon2`).
- **Resolution**:
  Ensure `.npmrc` contains `onlyBuiltDependencies=["@prisma/client", "@prisma/engines", "argon2", "prisma", "esbuild"]` and run `pnpm rebuild`.

#### 4. JWT Authorization 401 Unauthorized
- **Cause**: Access token expired or invalid `JWT_ACCESS_SECRET`.
- **Resolution**:
  Ensure `JWT_ACCESS_SECRET` in `apps/api/.env` and `.env` match. Token automatically refreshes via the frontend API interceptor using `/api/v1/auth/refresh`.
