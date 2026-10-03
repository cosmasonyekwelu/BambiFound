import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { OnboardingService } from './onboarding.service.js';
import { UpdateOnboardingDto } from './dto/update-onboarding.dto.js';

@ApiTags('Onboarding')
@Controller('v1/onboarding')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user onboarding state' })
  @ApiResponse({ status: 200, description: 'Onboarding state retrieved' })
  async getOnboardingStatus(@Req() req: Request & { user: { id: string } }) {
    return this.onboardingService.getOnboardingStatus(req.user.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Save partial onboarding data and step' })
  @ApiResponse({ status: 200, description: 'Onboarding state updated' })
  async updateOnboarding(
    @Req() req: Request & { user: { id: string } },
    @Body() dto: UpdateOnboardingDto,
  ) {
    return this.onboardingService.updateOnboardingData(req.user.id, dto);
  }

  @Post('complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark onboarding as completed' })
  @ApiResponse({ status: 200, description: 'Onboarding marked completed' })
  async completeOnboarding(
    @Req() req: Request & { user: { id: string } },
    @Body() dto?: UpdateOnboardingDto,
  ) {
    return this.onboardingService.completeOnboarding(req.user.id, dto);
  }

  @Post('skip')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark onboarding as skipped' })
  @ApiResponse({ status: 200, description: 'Onboarding marked skipped' })
  async skipOnboarding(@Req() req: Request & { user: { id: string } }) {
    return this.onboardingService.skipOnboarding(req.user.id);
  }
}
