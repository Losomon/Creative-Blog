import { Response } from 'express';
import { AuthRequest } from '../types';
import { newsletterService } from '../services/newsletterService';
import { asyncHandler } from '../middleware/errorHandler';
import { validate, newsletterSchema } from '../utils/validators';

export const newsletterController = {
  subscribe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = validate(newsletterSchema, req.body);
    const subscriber = await newsletterService.subscribe(data.email);

    res.status(201).json({
      success: true,
      message: 'Subscribed to newsletter successfully',
      data: subscriber,
    });
  }),

  unsubscribe: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = validate(newsletterSchema, req.body);
    await newsletterService.unsubscribe(data.email);

    res.status(200).json({
      success: true,
      message: 'Unsubscribed from newsletter successfully',
    });
  }),

  getSubscribers: asyncHandler(async (req: AuthRequest, res: Response) => {
    const subscribers = await newsletterService.getAllSubscribers();

    res.status(200).json({
      success: true,
      message: 'Subscribers fetched successfully',
      data: subscribers,
    });
  }),

  getCount: asyncHandler(async (req: AuthRequest, res: Response) => {
    const count = await newsletterService.getSubscriberCount();

    res.status(200).json({
      success: true,
      message: 'Subscriber count fetched successfully',
      data: { count },
    });
  }),
};
