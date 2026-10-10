import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VenturesService } from './ventures.service.js';
import { VentureDto } from './dto/venture.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('Ventures')
@Controller('ventures')
export class VenturesController {
  constructor(private readonly venturesService: VenturesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active venture listings' })
  async getAllVentures() {
    return this.venturesService.getAllVentures();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get venture details by ID' })
  async getVentureById(@Param('id') id: string) {
    return this.venturesService.getVentureById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new venture listing' })
  async createVenture(@Req() req: any, @Body() dto: VentureDto) {
    return this.venturesService.createVenture(req.user.id, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing venture listing' })
  async updateVenture(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: Partial<VentureDto>,
  ) {
    return this.venturesService.updateVenture(req.user.id, id, dto);
  }
}
