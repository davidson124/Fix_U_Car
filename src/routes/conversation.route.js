import {Router} from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import {getMyConversations, getMessagesByConversation} from '../controllers/conversation.controller.js';

const router = Router();
router.get('/', authMiddleware, getMyConversations);
router.get('/:conversationId', authMiddleware, getMessagesByConversation);
export default router;