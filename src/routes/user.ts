import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import {
  deleteByID, getAll, getByID, update,
} from '../controllers/user';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.get('/', [verifyToken], asyncHandler(getAll));
router.get('/:id([0-9]+)', [verifyToken], asyncHandler(getByID));
router.put('/', [verifyToken], asyncHandler(update));
router.delete('/:id([0-9]+)', [verifyToken], asyncHandler(deleteByID));

export default router;
