# BambiFound Environment Variables Reference

Below is the complete specification of required environment variables across the monorepo.

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `development` | Runtime environment (`development`, `production`, `test`) |
| `PORT` | `4000` | Backend API port |
| `WEB_PORT` | `3000` | Frontend React/Vite development server port |
| `DATABASE_URL` | `postgresql://bambifound:bambifound_secret@localhost:5432/bambifound?schema=public` | PostgreSQL connection string with pgvector support |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection URL for queues and caching |
| `JWT_ACCESS_SECRET` | `super_secret_access_key_bambifound_2025` | Secret key used to sign access tokens |
| `JWT_ACCESS_EXPIRES_IN` | `15m` | Access token duration |
| `JWT_REFRESH_SECRET` | `super_secret_refresh_key_bambifound_2025` | Secret key used to sign refresh tokens |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | Refresh token duration |
| `OPENAI_API_KEY` | `sk-proj-placeholder` | OpenAI API Key (Primary AI provider) |
| `GROQ_API_KEY` | `gsk_placeholder` | Groq API Key (Fallback AI provider) |
| `STORAGE_ENDPOINT` | `localhost` | MinIO / S3 endpoint host |
| `STORAGE_PORT` | `9000` | MinIO S3 API port |
| `STORAGE_USE_SSL` | `false` | SSL flag for object storage |
| `STORAGE_ACCESS_KEY` | `minioadmin` | MinIO access key |
| `STORAGE_SECRET_KEY` | `minioadmin` | MinIO secret key |
| `STORAGE_BUCKET` | `bambifound-uploads` | S3 bucket name for user uploads |
| `SMTP_HOST` | `localhost` | Mailpit SMTP host |
| `SMTP_PORT` | `1025` | Mailpit SMTP port |
| `EMAIL_FROM` | `noreply@bambifound.com` | Default sender email address |
| `FRONTEND_URL` | `http://localhost:3000` | CORS allowed frontend origin |
