import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service.js';
import { ConfigService } from '@nestjs/config';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn((key: string) => {
              if (key === 'BREVO_API_KEY') return 'your_brevo_api_key_here';
              if (key === 'BREVO_FROM_EMAIL') return 'noreply@bambifound.com';
              if (key === 'BREVO_FROM_NAME') return 'BambiFound';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should simulate welcome email in sandbox mode when API key is unconfigured', async () => {
    const res = await service.sendWelcomeEmail('user@example.com', 'Alex');
    expect(res.status).toBe('mock_sent');
    expect(res.recipient).toBe('user@example.com');
    expect(res.provider).toBe('brevo_sandbox');
  });
});
