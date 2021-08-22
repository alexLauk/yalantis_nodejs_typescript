import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import getFile from '../controllers/file';

const router = Router();

router.get('/uploads/:filename', asyncHandler(getFile));

export default router;
