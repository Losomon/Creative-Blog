import { Response } from 'express';
import { AuthRequest, PaginationQuery } from '../types';
import { articleService } from '../services/articleService';
import { asyncHandler } from '../middleware/errorHandler';
import { validate, createArticleSchema, updateArticleSchema } from '../utils/validators';
import { AuthorizationError } from '../utils/errors';

export const articleController = {
  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const data = validate(createArticleSchema, req.body);
    const article = await articleService.createArticle({
      ...data,
      authorId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      data: article,
    });
  }),

  getArticle: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { slug } = req.params;
    const article = await articleService.getArticle(slug);

    res.status(200).json({
      success: true,
      message: 'Article fetched successfully',
      data: article,
    });
  }),

  getArticles: asyncHandler(async (req: AuthRequest, res: Response) => {
    const query = req.query as unknown as PaginationQuery & { published?: string };
    const result = await articleService.getArticles({
      ...query,
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 10,
      published: query.published !== 'false',
    });

    res.status(200).json({
      success: true,
      message: 'Articles fetched successfully',
      data: result,
    });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const { id } = req.params;
    const data = validate(updateArticleSchema, req.body);
    const article = await articleService.updateArticle(id, data);

    res.status(200).json({
      success: true,
      message: 'Article updated successfully',
      data: article,
    });
  }),

  delete: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const { id } = req.params;
    await articleService.deleteArticle(id);

    res.status(200).json({
      success: true,
      message: 'Article deleted successfully',
    });
  }),

  publish: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const { id } = req.params;
    const article = await articleService.publishArticle(id);

    res.status(200).json({
      success: true,
      message: 'Article published successfully',
      data: article,
    });
  }),

  getFeatured: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { limit } = req.query;
    const articles = await articleService.getFeaturedArticles(limit ? Number(limit) : 3);

    res.status(200).json({
      success: true,
      message: 'Featured articles fetched successfully',
      data: articles,
    });
  }),

  getTrending: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { limit } = req.query;
    const articles = await articleService.getTrendingArticles(limit ? Number(limit) : 5);

    res.status(200).json({
      success: true,
      message: 'Trending articles fetched successfully',
      data: articles,
    });
  }),
};
