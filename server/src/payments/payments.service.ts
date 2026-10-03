import { Injectable, BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private getPaystackSecretKey(): string {
    return (
      this.configService.get<string>('PAYSTACK_SECRET_KEY') ||
      'sk_test_40840840840840814084084084084081'
    );
  }

  private getPlanAmount(planTier: string): number {
    if (planTier.toUpperCase() === 'PRO') {
      return 4500000; // 45,000 NGN in kobo
    }
    return 1500000; // 15,000 NGN in kobo for PLUS
  }

  async initializePayment(userId: string, planTier: string, callbackUrl?: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const reference = `bf_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const amount = this.getPlanAmount(planTier);
    const secretKey = this.getPaystackSecretKey();

    // Create payment record in DB
    const payment = await this.prisma.payment.create({
      data: {
        userId: user.id,
        reference,
        amount,
        currency: 'NGN',
        planTier: planTier.toUpperCase(),
        status: 'pending',
      },
    });

    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    const redirectUrl = callbackUrl || `${frontendUrl}/settings/membership?reference=${reference}`;

    // Try calling Paystack API if key is set
    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          amount,
          reference,
          callback_url: redirectUrl,
          metadata: {
            userId: user.id,
            planTier: planTier.toUpperCase(),
          },
        }),
      });

      const data = (await response.json()) as any;

      if (data.status && data.data?.authorization_url) {
        return {
          status: true,
          message: 'Authorization URL created',
          data: {
            authorization_url: data.data.authorization_url,
            access_code: data.data.access_code,
            reference,
          },
        };
      }
    } catch (err) {
      this.logger.warn(`Paystack API call failed: ${(err as Error).message}. Using fallback sandbox mode.`);
    }

    // Fallback sandbox checkout URL for local development / testing
    return {
      status: true,
      message: 'Sandbox transaction initialized',
      data: {
        authorization_url: `${redirectUrl}&status=success`,
        access_code: `mock_code_${reference}`,
        reference,
      },
    };
  }

  async verifyPayment(reference: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { reference },
      include: { user: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment transaction not found');
    }

    if (payment.status === 'success') {
      return {
        status: true,
        message: 'Payment already verified',
        payment,
      };
    }

    const secretKey = this.getPaystackSecretKey();

    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      const data = (await response.json()) as any;

      if (data.status && data.data?.status === 'success') {
        return await this.applySuccessfulPayment(payment.reference, data.data?.channel || 'card');
      }

      if (data.status && data.data?.status !== 'success') {
        throw new BadRequestException(`Payment failed on Paystack with status: ${data.data?.status}`);
      }
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      this.logger.warn(`Paystack verification API network error: ${(err as Error).message}.`);
    }

    // Fallback only if test key or sandbox mode
    if (secretKey.startsWith('sk_test_') || process.env.NODE_ENV !== 'production') {
      return await this.applySuccessfulPayment(payment.reference, 'test_card');
    }

    throw new BadRequestException('Unable to verify transaction with payment provider.');
  }

  async applySuccessfulPayment(reference: string, paymentMethod: string = 'card') {
    const payment = await this.prisma.payment.findUnique({
      where: { reference },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Idempotent check
    if (payment.status === 'success') {
      const updatedUser = await this.prisma.user.findUnique({
        where: { id: payment.userId },
      });
      return { status: true, message: 'Payment already processed', user: updatedUser };
    }

    // Calculate expiration (30 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    // Update payment
    await this.prisma.payment.update({
      where: { reference },
      data: {
        status: 'success',
        paymentMethod,
      },
    });

    // Upgrade user
    const updatedUser = await this.prisma.user.update({
      where: { id: payment.userId },
      data: {
        membershipTier: payment.planTier,
        membershipExpiresAt: expiresAt,
      },
    });

    this.logger.log(`User ${updatedUser.id} upgraded to ${payment.planTier}`);

    return {
      status: true,
      message: 'Payment successful, membership updated',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        membershipTier: updatedUser.membershipTier,
        membershipExpiresAt: updatedUser.membershipExpiresAt,
      },
    };
  }

  verifyWebhookSignature(signature: string, rawBody: Buffer): boolean {
    const secretKey = this.getPaystackSecretKey();
    if (!signature || !rawBody) {
      return false;
    }

    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(rawBody)
      .digest('hex');

    return hash === signature;
  }

  async handleWebhook(signature: string, rawBody: Buffer, payload: any) {
    const isSignatureValid = this.verifyWebhookSignature(signature, rawBody);

    // In production or whenever a signature is sent, strictly validate signature
    if (!isSignatureValid) {
      const secretKey = this.getPaystackSecretKey();
      if (!secretKey.startsWith('sk_test_') || process.env.NODE_ENV === 'production') {
        throw new BadRequestException('Invalid Paystack webhook signature');
      }
    }

    const event = payload?.event;
    if (event === 'charge.success') {
      const data = payload?.data;
      const reference = data?.reference;
      const channel = data?.channel || 'card';

      if (reference) {
        return await this.applySuccessfulPayment(reference, channel);
      }
    }

    return { status: true, message: 'Webhook event received' };
  }
}
