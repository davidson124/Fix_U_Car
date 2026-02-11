import {Router} from 'express';
import { createWorker } from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';
const router = Router();
router.post(
    '/workers',
    authMiddleware,
    roleMiddleware('ADMIN'),
    createWorker
);
export default router;
