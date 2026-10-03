import { IsOptional, IsInt, IsObject } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOnboardingDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  onboardingStep?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  onboardingData?: Record<string, any>;
}
