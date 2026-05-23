import { Router } from 'express';
import { createMessage, getAllMessages, deleteMessage } from '../controllers/messageController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createMessage);
router.get('/', authenticateToken, isAdmin, getAllMessages);
router.delete('/:id', authenticateToken, isAdmin, deleteMessage);

export default router;
