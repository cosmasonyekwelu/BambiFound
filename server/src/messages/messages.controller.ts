import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesService } from './messages.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@ApiTags('Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Get list of active conversations with connected builders' })
  async getConversations(@Req() req: any) {
    return this.messagesService.getConversations(req.user.id);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get message history with a specific builder' })
  async getMessagesWithUser(@Req() req: any, @Param('userId') targetUserId: string) {
    return this.messagesService.getMessagesWithUser(req.user.id, targetUserId);
  }

  @Post()
  @ApiOperation({ summary: 'Send a 1-on-1 message to a builder' })
  async sendMessage(
    @Req() req: any,
    @Body('receiverId') receiverId: string,
    @Body('content') content: string,
  ) {
    return this.messagesService.sendMessage(req.user.id, receiverId, content);
  }
}
