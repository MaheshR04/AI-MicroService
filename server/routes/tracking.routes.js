import { Router } from 'express';
import { getTrackingSnapshot } from '../controllers/tracking.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/:userId', protect, getTrackingSnapshot);

export default router;
