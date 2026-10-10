import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ConnectionsService } from './connections.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('Connections')
@Controller('connections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Send connection request / intro note to a builder' })
  async sendRequest(
    @Req() req: any,
    @Body('recipientId') recipientId: string,
    @Body('note') note?: string,
  ) {
    return this.connectionsService.sendRequest(req.user.id, recipientId, note);
  }

  @Get()
  @ApiOperation({ summary: 'Get current user connection requests and connected builders' })
  async getMyConnections(@Req() req: any) {
    return this.connectionsService.getMyConnections(req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Accept, reject, or withdraw a connection request' })
  async respondToRequest(
    @Req() req: any,
    @Param('id') connectionId: string,
    @Body('status') status: 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN',
  ) {
    return this.connectionsService.respondToRequest(req.user.id, connectionId, status);
  }
}
