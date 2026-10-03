import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service.js';
import { ConfigService } from '@nestjs/config';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn((key: string) => {
              if (key === 'OPENAI_API_KEY') return 'your_openai_api_key_here';
              if (key === 'OPENAI_MODEL') return 'gpt-4o-mini';
              if (key === 'GROQ_API_KEY') return 'your_groq_api_key_here';
              if (key === 'GROQ_MODEL') return 'llama-3.3-70b-versatile';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
  });

  it('should calculate synergy match using AI sandbox fallback when keys are unconfigured', async () => {
    const profileA = { role: 'Founder', skills: ['React', 'Node.js'] };
    const profileB = { role: 'Co-founder', skills: ['Sales', 'Growth'] };

    const result = await service.calculateSynergyScore(profileA, profileB);
    expect(result.matchScore).toBeGreaterThanOrEqual(0);
    expect(result.matchScore).toBeLessThanOrEqual(100);
    expect(result.provider).toBe('ai_sandbox');
    expect(result.synergyAnalysis).toBeDefined();
  });
});
