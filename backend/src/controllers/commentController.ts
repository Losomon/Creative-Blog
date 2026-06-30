import { Response } from 'express';
import { AuthRequest } from '../types';
import { commentService } from '../services/commentService';
import { asyncHandler } from '../middleware/errorHandler';
import { validate, createCommentSchema } from '../utils/validators';
import { AuthorizationError } from '../utils/errors';

export const commentController = {
  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const { articleId } = req.params;
    const data = validate(createCommentSchema, req.body);

    const comment = await commentService.createComment({
      content: data.content,
      articleId,
      authorId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment,
    });
  }),

  getArticleComments: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { articleId } = req.params;
    const comments = await commentService.getArticleComments(articleId);

    res.status(200).json({
      success: true,
      message: 'Comments fetched successfully',
      data: comments,
    });
  }),

  getComment: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const comment = await commentService.getComment(id);

    res.status(200).json({
      success: true,
      message: 'Comment fetched successfully',
      data: comment,
    });
  }),

  delete: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      throw new AuthorizationError();
    }

    const { id } = req.params;
    await commentService.deleteComment(id);

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  }),

  approve: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const comment = await commentService.approveComment(id);

    res.status(200).json({
      success: true,
      message: 'Comment approved successfully',
      data: comment,
    });
  }),

  getPending: asyncHandler(async (req: AuthRequest, res: Response) => {
    const comments = await commentService.getPendingComments();

    res.status(200).json({
      success: true,
      message: 'Pending comments fetched successfully',
      data: comments,
    });
  }),
};
