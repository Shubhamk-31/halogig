import { Router } from 'express';
import adminController from '../controllers/admin.controller';

const router = Router();

router.get(
  '/admin/user',
  adminController.getAllUser,
);

router.post(
  '/admin/login',
  adminController.adminLogin,
);

export default router;
