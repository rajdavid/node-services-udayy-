import express from 'express';

import healthCtrl from '../controllers/health';

const router = express.Router();

// mount auth routes at /auth
router.get('/health-check', healthCtrl.checkConnection);

export default router;
