# Multi-stage Dockerfile for BambiFound NestJS Backend

# Stage 1: Build stage
FROM node:22-slim AS builder

# Install OpenSSL required by Prisma
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy Prisma schema and generate Prisma Client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy tsconfig and nest-cli configuration
COPY tsconfig*.json nest-cli.json ./
COPY src ./src

# Build NestJS production bundle
RUN npm run build

# Stage 2: Production runner stage
FROM node:22-slim AS runner

# Install OpenSSL required for Prisma engine runtime
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# Copy package files, node_modules, dist, and prisma from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000

# Apply pending Prisma database migrations with fallback schema sync and start production server
CMD ["sh", "-c", "(npx prisma migrate deploy || npx prisma db push --skip-generate) && node dist/main"]
