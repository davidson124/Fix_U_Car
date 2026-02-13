import { Router } from "express";
import {sendMessage, getMyMessage, getAllMessages, markAsRead, getUnreadCount} from '../controllers/message.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = Router();
// User sends message to Admin
router.post('/', authMiddleware, sendMessage);
//User views their messages
router.get('/me', authMiddleware, getMyMessage);
//Admin views all messages
router.get('/',authMiddleware, getAllMessages);
//Mark message as a readed
router.patch('/:id/read',authMiddleware, markAsRead);
//Counter message
router.get('/unread-count',authMiddleware, getUnreadCount);
export default router;