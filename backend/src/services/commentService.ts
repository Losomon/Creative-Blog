import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors';

const prisma = new PrismaClient();

export const commentService = {
  async createComment(data: { content: string; articleId: string; authorId: string }) {
    return prisma.comment.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  },

  async getArticleComments(articleId: string) {
    return prisma.comment.findMany({
      where: {
        articleId,
        approved: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getComment(id: string) {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        article: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!comment) {
      throw new NotFoundError('Comment not found');
    }

    return comment;
  },

  async deleteComment(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  },

  async approveComment(id: string) {
    return prisma.comment.update({
      where: { id },
      data: { approved: true },
    });
  },

  async rejectComment(id: string) {
    return prisma.comment.delete({
      where: { id },
    });
  },

  async getPendingComments() {
    return prisma.comment.findMany({
      where: { approved: false },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        article: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  },
};
