import express from 'express';
import auth from '../middleware/auth.js';
import { login, getUser } from '../controllers/auth.js';

const router = express.Router();

router.post('/', login);
router.get('/user', auth, getUser);

export default router;
