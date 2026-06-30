import { Router } from 'express';
import { likeController } from '../controllers/likeController';
import { authenticate, optionalAuth } from '../middleware/auth';

const router = Router();

router.post('/article/:articleId/toggle', authenticate, likeController.toggleLike);
router.get('/article/:articleId/status', authenticate, likeController.isLiked);
router.get('/article/:articleId/count', optionalAuth, likeController.getLikesCount);
router.get('/user/likes', authenticate, likeController.getUserLikes);

export default router;
