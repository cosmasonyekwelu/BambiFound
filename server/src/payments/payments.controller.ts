import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  Headers,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { PaymentsService } from './payments.service.js';
import { InitializePaymentDto } from './dto/initialize-payment.dto.js';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
  rawBody?: Buffer;
}

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('initialize')
  async initializePayment(
    @Req() req: AuthenticatedRequest,
    @Body() dto: InitializePaymentDto,
  ) {
    return this.paymentsService.initializePayment(
      req.user.id,
      dto.planTier,
      dto.callbackUrl,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify/:reference')
  async verifyPayment(@Param('reference') reference: string) {
    return this.paymentsService.verifyPayment(reference);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Req() req: AuthenticatedRequest,
    @Body() payload: any,
  ) {
    const rawBody = req.rawBody || Buffer.from(JSON.stringify(payload));
    return this.paymentsService.handleWebhook(signature, rawBody, payload);
  }
}
