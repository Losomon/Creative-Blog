import { Router } from 'express';
import { newsletterController } from '../controllers/newsletterController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/subscribe', newsletterController.subscribe);
router.post('/unsubscribe', newsletterController.unsubscribe);
router.get('/subscribers', authenticate, authorize('ADMIN'), newsletterController.getSubscribers);
router.get('/count', authenticate, authorize('ADMIN'), newsletterController.getCount);

export default router;
