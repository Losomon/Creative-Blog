import { Router } from 'express';
import { articleController } from '../controllers/articleController';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, authorize('AUTHOR', 'ADMIN'), articleController.create);
router.get('/', optionalAuth, articleController.getArticles);
router.get('/featured', articleController.getFeatured);
router.get('/trending', articleController.getTrending);
router.get('/:slug', optionalAuth, articleController.getArticle);
router.patch('/:id', authenticate, authorize('AUTHOR', 'ADMIN'), articleController.update);
router.delete('/:id', authenticate, authorize('AUTHOR', 'ADMIN'), articleController.delete);
router.post('/:id/publish', authenticate, authorize('AUTHOR', 'ADMIN'), articleController.publish);

export default router;
