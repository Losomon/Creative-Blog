import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import { verifyToken } from '../utils/jwt';
import { AuthenticationError, AuthorizationError } from '../utils/errors';

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AuthenticationError('No token provided');
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthenticationError());
    }

    if (!roles.includes(req.user.role)) {
      return next(new AuthorizationError());
    }

    next();
  };
};

export const optionalAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decoded = verifyToken(token);
      req.user = decoded;
    }

    next();
  } catch {
    next();
  }
};
