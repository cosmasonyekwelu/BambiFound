import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service.js';
import { ConfigService } from '@nestjs/config';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudinaryService,
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn((key: string) => {
              if (key === 'CLOUDINARY_CLOUD_NAME') return 'demo';
              if (key === 'CLOUDINARY_API_KEY') return 'mock_api_key';
              if (key === 'CLOUDINARY_API_SECRET') return 'mock_api_secret';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should generate an upload signature', () => {
    const sigData = service.generateSignature({ folder: 'avatars' });
    expect(sigData.signature).toBeDefined();
    expect(sigData.apiKey).toBe('mock_api_key');
    expect(sigData.cloudName).toBe('demo');
  });

  it('should return mock payload when operating in unconfigured sandbox mode', async () => {
    const res = await service.uploadBase64Image('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
    expect(res.status).toBe('success');
    expect(res.provider).toBe('cloudinary_sandbox');
    expect(res.secure_url).toBeDefined();
  });
});
