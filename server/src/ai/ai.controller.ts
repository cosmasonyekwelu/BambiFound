import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('AI & Discover')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('match-synergy')
  @ApiOperation({ summary: 'Calculate synergy score and AI match explanation between profiles' })
  async matchSynergy(
    @Body('profileA') profileA: Record<string, any>,
    @Body('profileB') profileB: Record<string, any>,
  ) {
    return this.aiService.calculateSynergyScore(profileA || {}, profileB || {});
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('discover')
  @ApiOperation({ summary: 'Discover and retrieve real AI-matched builders from PostgreSQL' })
  async getDiscoverMatches(@Req() req: any) {
    return this.aiService.getDiscoverMatches(req.user.id);
  }
}
