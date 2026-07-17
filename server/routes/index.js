const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const customerRoutes = require('./customer.routes');
const ticketRoutes = require('./ticket.routes');
const dashboardRoutes = require('./dashboard.routes');
const analyticsRoutes = require('./analytics.routes');
const chatRoutes = require('./chat.routes');

const router = express.Router();

// Register router sub-modules
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/tickets', ticketRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/chat', chatRoutes);

module.exports = router;
