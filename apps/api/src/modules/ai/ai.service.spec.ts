import { describe, it, expect, beforeEach } from 'vitest';
import { AIService } from './ai.service';
import { OpenAIProvider } from './providers/openai.provider';
import { GroqProvider } from './providers/groq.provider';
import { ConfigService } from '@nestjs/config';

describe('AIService', () => {
  let aiService: AIService;

  beforeEach(() => {
    const configService = new ConfigService({
      ai: { openaiApiKey: '', groqApiKey: '' },
    });
    const openAIProvider = new OpenAIProvider(configService);
    const groqProvider = new GroqProvider(configService);
    aiService = new AIService(openAIProvider, groqProvider);
  });

  it('should fall back gracefully when no live AI keys are configured', async () => {
    const response = await aiService.generateCompletion({
      prompt: 'Summarize startup founder intent',
    });

    expect(response.content).toContain('Simulated AI Response');
    expect(response.provider).toBeDefined();
  });
});
