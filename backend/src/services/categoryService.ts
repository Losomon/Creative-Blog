import { PrismaClient } from '@prisma/client';
import { NotFoundError, ConflictError } from '../utils/errors';

const prisma = new PrismaClient();

export const categoryService = {
  async createCategory(data: { name: string; slug: string; icon?: string; color?: string }) {
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new ConflictError('Category already exists');
    }

    return prisma.category.create({
      data,
    });
  },

  async getCategories() {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { articles: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return categories.map((cat) => ({
      ...cat,
      count: cat._count.articles,
    }));
  },

  async getCategory(slug: string) {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return {
      ...category,
      count: category._count.articles,
    };
  },

  async updateCategory(id: string, data: Partial<any>) {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  },
};
