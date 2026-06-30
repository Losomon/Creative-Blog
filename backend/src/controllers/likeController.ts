import { Response } from 'express';
import { AuthRequest } from '../types';
import { likeService } from '../services/likeService';
import { asyncHandler } from '../middleware/errorHandler';
import { AuthorizationError } from '../utils/errors';

export const likeController = {
  toggleLike: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const { articleId } = req.params;
    const result = await likeService.toggleLike(req.user.id, articleId);

    res.status(200).json({
      success: true,
      message: result.liked ? 'Article liked' : 'Article unliked',
      data: result,
    });
  }),

  isLiked: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const { articleId } = req.params;
    const liked = await likeService.isLiked(req.user.id, articleId);

    res.status(200).json({
      success: true,
      message: 'Like status fetched successfully',
      data: { liked },
    });
  }),

  getLikesCount: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { articleId } = req.params;
    const count = await likeService.getLikesCount(articleId);

    res.status(200).json({
      success: true,
      message: 'Likes count fetched successfully',
      data: { count },
    });
  }),

  getUserLikes: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const likes = await likeService.getUserLikes(req.user.id);

    res.status(200).json({
      success: true,
      message: 'User likes fetched successfully',
      data: likes,
    });
  }),
};
