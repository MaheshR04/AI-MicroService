import { Router } from 'express';
import authRoutes from './auth.routes.js';
import emergencyRoutes from './emergency.routes.js';
import healthRoutes from './health.routes.js';
import trackingRoutes from './tracking.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/emergencies', emergencyRoutes);
router.use('/health', healthRoutes);
router.use('/tracking', trackingRoutes);

export default router;
