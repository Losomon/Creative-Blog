import { Response } from 'express';
import { AuthRequest } from '../types';
import { authService } from '../services/authService';
import { asyncHandler } from '../middleware/errorHandler';
import { validate, userRegisterSchema, userLoginSchema } from '../utils/validators';
import { logger } from '../utils/logger';

export const authController = {
  register: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = validate(userRegisterSchema, req.body);
    const result = await authService.register(data.email, data.password, data.name);

    logger.info(`User registered: ${data.email}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  }),

  login: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = validate(userLoginSchema, req.body);
    const result = await authService.login(data.email, data.password);

    logger.info(`User logged in: ${data.email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  }),

  getProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const profile = await authService.getProfile(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: profile,
    });
  }),

  updateProfile: asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { name, bio, avatar } = req.body;
    const updated = await authService.updateProfile(req.user.id, { name, bio, avatar });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updated,
    });
  }),
};
