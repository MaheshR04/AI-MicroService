import { Router } from 'express';
import authRoutes from './auth.routes.js';
import emergencyRoutes from './emergency.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/emergencies', emergencyRoutes);
router.use('/health', healthRoutes);

export default router;
