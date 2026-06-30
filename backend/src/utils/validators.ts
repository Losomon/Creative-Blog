import { z } from 'zod';
import { ValidationError } from './errors';

export const userRegisterSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
});

export const createArticleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  categoryId: z.string(),
  image: z.string().optional(),
  readTime: z.number().optional(),
  featured: z.boolean().optional(),
});

export const updateArticleSchema = createArticleSchema.partial();

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment too long'),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name required'),
  slug: z.string().min(2, 'Slug required'),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email'),
});

export const validate = <T>(schema: z.ZodSchema, data: unknown): T => {
  try {
    return schema.parse(data) as T;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error.errors[0].message);
    }
    throw new ValidationError('Validation failed');
  }
};
