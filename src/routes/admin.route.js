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

router.get(
  '/admin/client-project',
  adminController.getClientProject,
);

router.get(
  '/admin/application',
  adminController.getUserApplication,
);

router.get(
  '/admin/proposal',
  adminController.getProjectProposal,
);
export default router;
