import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyProfile(userId: string) {
    let profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            membershipTier: true,
            onboardingCompleted: true,
            onboardingData: true,
          },
        },
      },
    });

    if (!profile) {
      profile = await this.prisma.profile.create({
        data: {
          userId,
          headline: 'Builder',
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
              membershipTier: true,
              onboardingCompleted: true,
              onboardingData: true,
            },
          },
        },
      });
    }

    return profile;
  }

  async updateMyProfile(userId: string, dto: UpdateProfileDto) {
    const existing = await this.prisma.profile.findUnique({ where: { userId } });
    if (!existing) {
      await this.prisma.profile.create({
        data: {
          userId,
          ...dto,
        },
      });
    } else {
      await this.prisma.profile.update({
        where: { userId },
        data: dto,
      });
    }

    return this.getMyProfile(userId);
  }

  async getPublicProfile(idOrUserId: string) {
    const profile = await this.prisma.profile.findFirst({
      where: {
        OR: [
          { userId: idOrUserId },
          { id: idOrUserId },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            membershipTier: true,
            createdAt: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Builder profile not found');
    }

    return profile;
  }
}
