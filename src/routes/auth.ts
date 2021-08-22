import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import { changePassword, login, register } from '../controllers/auth';
import verifyToken from '../middleware/verifyToken';
import upload from '../middleware/uploadFile';

const router = Router();

router.post('/login', asyncHandler(login));
router.post('/register', upload.single('avatar'), asyncHandler(register));
router.put('/change-password', [verifyToken], asyncHandler(changePassword));

export default router;
