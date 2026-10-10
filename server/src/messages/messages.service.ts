import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async getConversations(userId: string) {
    // Get all accepted connections
    const acceptedConnections = await this.prisma.connection.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [{ requesterId: userId }, { recipientId: userId }],
      },
      include: {
        requester: { select: { id: true, fullName: true, email: true, profile: true } },
        recipient: { select: { id: true, fullName: true, email: true, profile: true } },
      },
    });

    let conversationPartners = acceptedConnections.map((c) =>
      c.requesterId === userId ? c.recipient : c.requester,
    );

    // If user has no active accepted connections yet, include default ecosystem builders
    if (conversationPartners.length === 0) {
      const defaultBuilders = await this.prisma.user.findMany({
        where: {
          id: { in: ['elena-vance', 'marcus-thorne', 'priya-desai'] },
          NOT: { id: userId },
        },
        select: { id: true, fullName: true, email: true, profile: true },
      });
      conversationPartners = defaultBuilders;
    }

    const conversations = await Promise.all(
      conversationPartners.map(async (partner) => {
        const lastMessage = await this.prisma.message.findFirst({
          where: {
            OR: [
              { senderId: userId, receiverId: partner.id },
              { senderId: partner.id, receiverId: userId },
            ],
          },
          orderBy: { createdAt: 'desc' },
        });

        const unreadCount = await this.prisma.message.count({
          where: {
            senderId: partner.id,
            receiverId: userId,
            readAt: null,
          },
        });

        return {
          partner,
          lastMessage,
          unreadCount,
        };
      }),
    );

    return conversations.sort((a, b) => {
      const timeA = a.lastMessage?.createdAt ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const timeB = b.lastMessage?.createdAt ? new Date(b.lastMessage.createdAt).getTime() : 0;
      return timeB - timeA;
    });
  }

  async getMessagesWithUser(userId: string, targetUserId: string) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, fullName: true, email: true, profile: true },
    });

    if (!targetUser) {
      throw new NotFoundException('Conversation partner not found');
    }

    // Mark messages as read
    await this.prisma.message.updateMany({
      where: {
        senderId: targetUserId,
        receiverId: userId,
        readAt: null,
      },
      data: { readAt: new Date() },
    });

    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
    });

    return {
      partner: targetUser,
      messages,
    };
  }

  async sendMessage(senderId: string, receiverId: string, content: string) {
    if (!content || !content.trim()) {
      throw new BadRequestException('Message content cannot be empty');
    }

    if (senderId === receiverId) {
      throw new BadRequestException('Cannot send a message to yourself');
    }

    const receiver = await this.prisma.user.findUnique({ where: { id: receiverId } });
    if (!receiver) {
      throw new NotFoundException('Message recipient not found');
    }

    return this.prisma.message.create({
      data: {
        senderId,
        receiverId,
        content: content.trim(),
      },
      include: {
        sender: { select: { id: true, fullName: true, email: true } },
        receiver: { select: { id: true, fullName: true, email: true } },
      },
    });
  }
}
