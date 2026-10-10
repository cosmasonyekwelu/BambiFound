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
    const user = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        fullName: data.fullName,
      },
    });

    // Automatically initialize an empty profile for the user
    await this.prisma.profile.create({
      data: {
        userId: user.id,
        headline: data.fullName ? `${data.fullName} — Builder` : 'Builder',
      },
    });

    return user;
  }

  async updateHashedRefreshToken(userId: string, hashedRefreshToken: string | null): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }

  async setResetToken(userId: string, token: string, expiresAt: Date): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        resetToken: token,
        resetTokenExpiresAt: expiresAt,
      },
    });
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  async updatePassword(userId: string, passwordHash: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiresAt: null,
      },
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

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.onboardingStep !== undefined && { onboardingStep: data.onboardingStep }),
        ...(data.onboardingCompleted !== undefined && { onboardingCompleted: data.onboardingCompleted }),
        ...(data.onboardingSkipped !== undefined && { onboardingSkipped: data.onboardingSkipped }),
        onboardingData: mergedData ?? {},
      },
    });

    // Extract profile fields from onboarding data and sync to Profile model
    const skills = Array.isArray(mergedData.skills) ? mergedData.skills : [];
    const interests = Array.isArray(mergedData.interests) ? mergedData.interests : [];
    const role = mergedData.role || mergedData.primaryRole || undefined;
    const headline = mergedData.headline || mergedData.title || (updatedUser.fullName ? `${updatedUser.fullName} — Builder` : 'Builder');
    const bio = mergedData.bio || mergedData.experience || undefined;
    const location = mergedData.location || undefined;

    await this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        headline,
        bio,
        location,
        role,
        skills,
        interests,
      },
      update: {
        ...(headline && { headline }),
        ...(bio && { bio }),
        ...(location && { location }),
        ...(role && { role }),
        ...(skills.length > 0 && { skills }),
        ...(interests.length > 0 && { interests }),
      },
    });

    // Also sync intent if natural language description or goals are provided
    if (mergedData.intentText || mergedData.intent || mergedData.primaryGoal) {
      const intentType = mergedData.intent || mergedData.primaryGoal || 'FOUNDER_MATCH';
      const naturalLanguageDesc = mergedData.intentText || mergedData.builderIntent || '';
      await this.prisma.intent.create({
        data: {
          userId,
          intentType,
          naturalLanguageDesc,
          structuredAttributes: mergedData,
        },
      });
    }

    return updatedUser;
  }
}
