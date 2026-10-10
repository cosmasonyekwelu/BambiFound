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

  async createUser(data: { email: string; passwordHash: string; fullName?: string }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        fullName: data.fullName,
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

    let currentObj: Record<string, any> = {};
    if (existing.onboardingData) {
      try {
        currentObj = typeof existing.onboardingData === 'string'
          ? JSON.parse(existing.onboardingData)
          : (existing.onboardingData as Record<string, any>);
      } catch (e) {
        currentObj = {};
      }
    }

    let mergedData = currentObj;
    if (data.onboardingData) {
      let incomingObj: Record<string, any> = {};
      try {
        incomingObj = typeof data.onboardingData === 'string'
          ? JSON.parse(data.onboardingData)
          : data.onboardingData;
      } catch (e) {
        incomingObj = {};
      }
      mergedData = { ...currentObj, ...incomingObj };
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.onboardingStep !== undefined && { onboardingStep: data.onboardingStep }),
        ...(data.onboardingCompleted !== undefined && { onboardingCompleted: data.onboardingCompleted }),
        ...(data.onboardingSkipped !== undefined && { onboardingSkipped: data.onboardingSkipped }),
        onboardingData: JSON.stringify(mergedData ?? {}),
      },
    });
  }
}
