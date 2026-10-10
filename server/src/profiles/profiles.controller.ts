import { Controller, Get, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  async getMyProfile(@Req() req: any) {
    return this.profilesService.getMyProfile(req.user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  async updateMyProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.profilesService.updateMyProfile(req.user.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get public profile by user ID or profile ID' })
  async getPublicProfile(@Param('id') id: string) {
    return this.profilesService.getPublicProfile(id);
  }
}
