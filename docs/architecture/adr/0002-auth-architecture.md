# ADR 0002: Authentication Architecture with Argon2id and JWT Tokens

## Context
BambiFound requires secure authentication with session management, stateless request authorization, token rotation, and instant session revocation.

## Decision
1. **Password Hashing**: We select **Argon2id** (`argon2` module) for password hashing due to its memory-hard resistance to GPU/ASIC attacks.
2. **Token Strategy**:
   - Short-lived **JWT Access Tokens** (15 min) sent in HTTP Authorization headers (`Bearer <token>`).
   - Long-lived **JWT Refresh Tokens** (7 days) stored in database (`RefreshToken` table) for token rotation and active revocation.
3. **Endpoints**:
   - `POST /api/v1/auth/register`
   - `POST /api/v1/auth/login`
   - `POST /api/v1/auth/refresh`
   - `POST /api/v1/auth/logout`
   - `GET /api/v1/auth/me`

## Consequences
- High cryptographic security against credentials theft.
- Refresh token rotation prevents replay attacks.
- Instant server-side logout capability by marking tokens as revoked in database.
