import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { HealthModule } from './health/health.module.js';
import { OnboardingModule } from './onboarding/onboarding.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { CloudinaryModule } from './cloudinary/cloudinary.module.js';
import { EmailModule } from './email/email.module.js';
import { AiModule } from './ai/ai.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    HealthModule,
    OnboardingModule,
    PaymentsModule,
    CloudinaryModule,
    EmailModule,
    AiModule,
  ],
})
export class AppModule {}
