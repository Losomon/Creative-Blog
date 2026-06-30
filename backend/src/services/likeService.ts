import { PrismaClient } from '@prisma/client';
import { ConflictError, NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();

export const likeService = {
  async toggleLike(userId: string, articleId: string) {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return { liked: false };
    }

    await prisma.like.create({
      data: {
        userId,
        articleId,
      },
    });

    return { liked: true };
  },

  async isLiked(userId: string, articleId: string) {
    const like = await prisma.like.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    return !!like;
  },

  async getLikesCount(articleId: string) {
    return prisma.like.count({
      where: { articleId },
    });
  },

  async getUserLikes(userId: string) {
    return prisma.like.findMany({
      where: { userId },
      include: {
        article: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  },
};
