import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';

const router = Router();

router.post('/article/:articleId', authenticate, commentController.create);
router.get('/article/:articleId', optionalAuth, commentController.getArticleComments);
router.get('/pending', authenticate, authorize('ADMIN'), commentController.getPending);
router.get('/:id', optionalAuth, commentController.getComment);
router.delete('/:id', authenticate, authorize('ADMIN'), commentController.delete);
router.post('/:id/approve', authenticate, authorize('ADMIN'), commentController.approve);

export default router;
