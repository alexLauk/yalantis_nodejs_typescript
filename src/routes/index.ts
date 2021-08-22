import { Router } from 'express';
import auth from './auth';
import user from './user';
import file from './file';

const router = Router();
router.use('/auth', auth);
router.use('/user', user);
router.use('/file', file);

export default router;
