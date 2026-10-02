export default () => ({
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL || 'postgresql://bambifound:bambifound_secret@localhost:5432/bambifound?schema=public',
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'super_secret_access_key_bambifound_2025',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'super_secret_refresh_key_bambifound_2025',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    groqApiKey: process.env.GROQ_API_KEY || '',
  },
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
});
