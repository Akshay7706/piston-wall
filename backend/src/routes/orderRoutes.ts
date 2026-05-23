import { Router } from 'express';
import { createOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = Router();

router.post('/', createOrder);
router.get('/', authenticateToken, isAdmin, getAllOrders);
router.patch('/:id/status', authenticateToken, isAdmin, updateOrderStatus);

export default router;
