import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('match-synergy')
  async matchSynergy(
    @Body('profileA') profileA: Record<string, any>,
    @Body('profileB') profileB: Record<string, any>,
  ) {
    return this.aiService.calculateSynergyScore(profileA || {}, profileB || {});
  }
}
