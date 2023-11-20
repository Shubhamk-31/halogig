import { Router } from 'express';

// eslint-disable-next-line import/no-named-as-default
import middlewares from '../middlewares/index';
import controllers from '../controllers/index';

const { userController } = controllers;
const { authMiddleware } = middlewares;
const router = Router();

router.post(
  '/user/create-user',
  userController.createNewUser,
);

router.put(
  '/user/otp-verify',
  userController.verifyUserOtp,
);

router.put(
  '/user/registration',
  userController.userRegistration,
);

router.post(
  '/user/details',
  authMiddleware,
  userController.userDetails,
);

router.get(
  '/user/details',
  authMiddleware,
  userController.getUserDetail,
);

router.post(
  '/login',
  userController.login,
);

router.post(
  '/user/details/thumbnail',
  authMiddleware,
  userController.userThumbnail,
);

router.post(
  '/user/details/internal-pages',
  authMiddleware,
  userController.userIntenalData,
);

// router.put(
//   '/user/details',
//   authMiddleware,
//   userController.userDetails,
// );
export default router;
