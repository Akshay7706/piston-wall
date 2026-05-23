import { Router } from 'express';
import { getSetting, updateSetting } from '../controllers/settingsController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();

router.get('/:key', getSetting);
router.post('/', authenticateToken, isAdmin, updateSetting);

export default router;
