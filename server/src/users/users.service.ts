import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: { email: string; passwordHash?: string | null; fullName?: string }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash ?? null,
        fullName: data.fullName,
      },
    });
  }

  async findOAuthAccount(provider: string, providerAccountId: string) {
    return this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async createOAuthUser(data: {
    email: string;
    fullName?: string | null;
    provider: string;
    providerAccountId: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        fullName: data.fullName ?? null,
        emailVerified: true,
        passwordHash: null,
        oauthAccounts: {
          create: {
            provider: data.provider,
            providerAccountId: data.providerAccountId,
          },
        },
      },
    });
  }

  async linkOAuthAccount(userId: string, provider: string, providerAccountId: string) {
    return this.prisma.oAuthAccount.create({
      data: {
        userId,
        provider,
        providerAccountId,
      },
    });
  }

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string | null): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }

  async updateOnboardingData(
    userId: string,
    data: {
      onboardingStep?: number;
      onboardingData?: any;
      onboardingCompleted?: boolean;
      onboardingSkipped?: boolean;
    },
  ): Promise<User> {
    const existing = await this.findById(userId);
    if (!existing) {
      throw new Error('User not found');
    }

    let mergedData = existing.onboardingData;
    if (data.onboardingData) {
      const currentObj = typeof existing.onboardingData === 'object' && existing.onboardingData !== null
        ? (existing.onboardingData as Record<string, any>)
        : {};
      mergedData = { ...currentObj, ...data.onboardingData };
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.onboardingStep !== undefined && { onboardingStep: data.onboardingStep }),
        ...(data.onboardingCompleted !== undefined && { onboardingCompleted: data.onboardingCompleted }),
        ...(data.onboardingSkipped !== undefined && { onboardingSkipped: data.onboardingSkipped }),
        onboardingData: mergedData ?? {},
      },
    });
  }
}
