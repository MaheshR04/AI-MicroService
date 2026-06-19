import { Router } from 'express';
import { getTrackingSnapshot, getTrackedUsers, getAgentReasoningLogs } from '../controllers/tracking.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/tracked-users', protect, getTrackedUsers);
router.get('/:userId', protect, getTrackingSnapshot);
router.get('/:userId/reasoning-logs', protect, getAgentReasoningLogs);

export default router;
