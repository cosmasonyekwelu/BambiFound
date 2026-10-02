export interface User {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
  isEmailVerified: boolean;
  intents?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: Record<string, any>;
}

export enum AIProviderName {
  OPENAI = 'openai',
  GROQ = 'groq',
}

export interface AIServicePromptOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIServiceResponse {
  content: string;
  provider: AIProviderName;
  tokensUsed?: number;
}
