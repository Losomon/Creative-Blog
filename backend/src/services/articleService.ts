import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors';
import { PaginationQuery } from '../types';

const prisma = new PrismaClient();

const DEFAULT_LIMIT = 10;

export const articleService = {
  async createArticle(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categoryId: string;
    authorId: string;
    image?: string;
    readTime?: number;
    featured?: boolean;
  }) {
    return prisma.article.create({
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  },

  async getArticle(slug: string) {
    const article = await prisma.article.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            bio: true,
          },
        },
        category: true,
        comments: {
          where: { approved: true },
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
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    if (!article) {
      throw new NotFoundError('Article not found');
    }

    // Increment views
    await prisma.article.update({
      where: { id: article.id },
      data: { views: article.views + 1 },
    });

    return article;
  },

  async getArticles(query: PaginationQuery & { published?: boolean }) {
    const page = query.page || 1;
    const limit = query.limit || DEFAULT_LIMIT;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.published !== undefined) {
      where.published = query.published;
    }

    if (query.category) {
      where.category = {
        slug: query.category,
      };
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { excerpt: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          category: true,
          _count: {
            select: { likes: true, comments: true },
          },
        },
        orderBy: query.sort === 'oldest' ? { createdAt: 'asc' } : { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    return {
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  },

  async updateArticle(id: string, data: Partial<any>) {
    return prisma.article.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        category: true,
      },
    });
  },

  async deleteArticle(id: string) {
    return prisma.article.delete({
      where: { id },
    });
  },

  async publishArticle(id: string) {
    return prisma.article.update({
      where: { id },
      data: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  },

  async getFeaturedArticles(limit: number = 3) {
    return prisma.article.findMany({
      where: {
        featured: true,
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        category: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

  async getTrendingArticles(limit: number = 5) {
    return prisma.article.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        category: true,
        _count: {
          select: { likes: true },
        },
      },
      orderBy: { views: 'desc' },
      take: limit,
    });
  },
};
