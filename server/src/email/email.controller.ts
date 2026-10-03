import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send-test')
  async sendTestEmail(@Body('email') email: string) {
    return this.emailService.sendWelcomeEmail(email || 'test@example.com', 'Test Builder');
  }
}
