// routes/xeroRoutes.js
import express from 'express';
import { authXero, xeroCallback, getXeroData } from '../controllers/xeroController.js';

const router = express.Router();

router.get('/auth', authXero);
router.get('/callback', xeroCallback);
router.get('/data', getXeroData);

export default router;
