
import express from 'express';

import healthCtrl from '../controllers/health';
import { getConnection} from '../controllers/connection'
const router = express.Router();
// added some comment
// mount auth routes at /auth
router.get('/health-check', healthCtrl.checkConnection);
router.get('/connetion', getConnection);
export default router;
