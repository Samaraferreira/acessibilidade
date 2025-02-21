import { Router } from 'express';
import { getDb } from '../config/database.js';

const router = Router();

router.get('/health', (req, res) => {
  const db = getDb();
  res.json({ 
    status: 'ok',
    database: db ? 'connected' : 'disconnected'
  });
});

export default router;