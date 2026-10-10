import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ConnectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async sendRequest(requesterId: string, recipientId: string, note?: string) {
    if (requesterId === recipientId) {
      throw new BadRequestException('Cannot send connection request to yourself');
    }

    const recipientExists = await this.prisma.user.findUnique({ where: { id: recipientId } });
    if (!recipientExists) {
      throw new NotFoundException('Target builder not found');
    }

    const existing = await this.prisma.connection.findFirst({
      where: {
        OR: [
          { requesterId, recipientId },
          { requesterId: recipientId, recipientId: requesterId },
        ],
      },
    });

    if (existing) {
      if (existing.status === 'PENDING') {
        throw new BadRequestException('A pending connection request already exists');
      }
      if (existing.status === 'ACCEPTED') {
        throw new BadRequestException('You are already connected with this builder');
      }
      // Re-open request if rejected/withdrawn
      return this.prisma.connection.update({
        where: { id: existing.id },
        data: {
          requesterId,
          recipientId,
          status: 'PENDING',
          note: note || existing.note,
        },
        include: {
          recipient: {
            select: { id: true, fullName: true, email: true },
          },
        },
      });
    }

    return this.prisma.connection.create({
      data: {
        requesterId,
        recipientId,
        status: 'PENDING',
        note,
      },
      include: {
        recipient: {
          select: { id: true, fullName: true, email: true },
        },
      },
    });
  }

  async getMyConnections(userId: string) {
    const connections = await this.prisma.connection.findMany({
      where: {
        OR: [{ requesterId: userId }, { recipientId: userId }],
      },
      include: {
        requester: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: true,
          },
        },
        recipient: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profile: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const pendingIncoming = connections.filter((c) => c.recipientId === userId && c.status === 'PENDING');
    const pendingOutgoing = connections.filter((c) => c.requesterId === userId && c.status === 'PENDING');
    const accepted = connections.filter((c) => c.status === 'ACCEPTED');

    return {
      pendingIncoming,
      pendingOutgoing,
      accepted,
      all: connections,
    };
  }

  async respondToRequest(userId: string, connectionId: string, status: 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN') {
    const connection = await this.prisma.connection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      throw new NotFoundException('Connection request not found');
    }

    if (status === 'ACCEPTED' || status === 'REJECTED') {
      if (connection.recipientId !== userId) {
        throw new ForbiddenException('Only the recipient can accept or reject a connection request');
      }
    } else if (status === 'WITHDRAWN') {
      if (connection.requesterId !== userId && connection.recipientId !== userId) {
        throw new ForbiddenException('Not authorized to withdraw this request');
      }
    }

    return this.prisma.connection.update({
      where: { id: connectionId },
      data: { status },
      include: {
        requester: { select: { id: true, fullName: true, email: true } },
        recipient: { select: { id: true, fullName: true, email: true } },
      },
    });
  }
}
