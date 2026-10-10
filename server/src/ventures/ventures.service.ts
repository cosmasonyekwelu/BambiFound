import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { VentureDto } from './dto/venture.dto.js';

@Injectable()
export class VenturesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllVentures() {
    return this.prisma.venture.findMany({
      where: { status: 'ACTIVE' },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getVentureById(id: string) {
    const venture = await this.prisma.venture.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: true,
          },
        },
      },
    });

    if (!venture) {
      throw new NotFoundException('Venture listing not found');
    }

    return venture;
  }

  async createVenture(ownerId: string, dto: VentureDto) {
    return this.prisma.venture.create({
      data: {
        ownerId,
        name: dto.name,
        tagline: dto.tagline,
        description: dto.description,
        stage: dto.stage,
        industry: dto.industry,
        lookingFor: dto.lookingFor || [],
        website: dto.website,
      },
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: true,
          },
        },
      },
    });
  }

  async updateVenture(ownerId: string, id: string, dto: Partial<VentureDto>) {
    const existing = await this.prisma.venture.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException('Venture listing not found');
    }

    if (existing.ownerId !== ownerId) {
      throw new ForbiddenException('Not authorized to update this venture listing');
    }

    return this.prisma.venture.update({
      where: { id },
      data: dto,
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: true,
          },
        },
      },
    });
  }
}
