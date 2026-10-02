import { describe, it, expect, beforeEach } from 'vitest';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(() => {
    healthController = new HealthController();
  });

  it('should return health check status', () => {
    const result = healthController.check();
    expect(result.status).toBe('ok');
    expect(result.service).toBe('BambiFound API');
    expect(result.timestamp).toBeDefined();
  });
});
