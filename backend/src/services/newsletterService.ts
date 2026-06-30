import { PrismaClient } from '@prisma/client';
import { ConflictError } from '../utils/errors';

const prisma = new PrismaClient();

export const newsletterService = {
  async subscribe(email: string) {
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictError('Email already subscribed');
    }

    return prisma.newsletter.create({
      data: { email },
    });
  },

  async unsubscribe(email: string) {
    return prisma.newsletter.delete({
      where: { email },
    });
  },

  async getAllSubscribers() {
    return prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
    });
  },

  async getSubscriberCount() {
    return prisma.newsletter.count();
  },
};
