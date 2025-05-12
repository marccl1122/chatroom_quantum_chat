import express, { RequestHandler } from 'express';
import { getChatPage, createGroup } from '../controllers/chatController';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.get('/chat', requireAuth, getChatPage as RequestHandler);
router.post('/groups', requireAuth, createGroup as RequestHandler);

export default router;