import { Router } from 'express';
import { categoryController } from '../controllers/categoryController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, authorize('ADMIN'), categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:slug', categoryController.getCategory);
router.patch('/:id', authenticate, authorize('ADMIN'), categoryController.update);
router.delete('/:id', authenticate, authorize('ADMIN'), categoryController.delete);

export default router;
