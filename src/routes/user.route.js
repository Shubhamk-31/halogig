import { Router } from 'express';

// eslint-disable-next-line import/no-named-as-default
import middlewares from '../middlewares/index';
import controllers from '../controllers/index';

const { userController, industryController } = controllers;
const { authMiddleware } = middlewares;
const router = Router();

router.post('/user/create-user', userController.createNewUser);

router.put('/user/otp-verify', userController.verifyUserOtp);

router.put('/user/registration', userController.userRegistration);

router.put('/user/update-details', authMiddleware, userController.updateUser);

router.post('/user/details', authMiddleware, userController.userDetails);

router.get('/user/details', authMiddleware, userController.getUserDetail);

router.post('/login', userController.login);

router.post(
  '/user/details/thumbnail',
  authMiddleware,
  userController.userThumbnail,
);

router.post(
  '/user/details/thumbnail/:id',
  authMiddleware,
  userController.updateThumbnail,
);

router.post(
  '/user/details/internal-data/:id',
  authMiddleware,
  userController.updateInternalData,
);

router.post(
  '/user/details/internal-pages',
  authMiddleware,
  userController.userIntenalData,
);

router.post(
  '/user/details/education',
  authMiddleware,
  userController.userEducation,
);

router.get(
  '/user/details/application',
  authMiddleware,
  userController.userApplication,
);

router.get(
  '/category',
  userController.getAllCategory,
);

router.get(
  '/user/category',
  authMiddleware,
  userController.getAllCategory,
);

router.get(
  '/sub-category',
  userController.getAllSubCategory,
);

router.get(
  '/user/sub-category/:id',
  userController.getAllSubCategory,
);

router.get(
  '/user/details/application/:id',
  authMiddleware,
  userController.userApplicationDetail,
);

router.post(
  '/user/details/certificate',
  authMiddleware,
  userController.userCertificate,
);

router.post(
  '/user/details/professional-detail',
  authMiddleware,
  userController.userProfessionalDetail,
);

router.post(
  '/user/details/project',
  authMiddleware,
  userController.addUserProject,
);

router.get(
  '/user/details/project',
  authMiddleware,
  userController.getUserProject,
);

router.get(
  '/user/details/education',
  authMiddleware,
  userController.getEducation,
);

router.get(
  '/user/details/education',
  authMiddleware,
  userController.getAllProfessionalDetail,
);

router.get(
  '/user/details/certificate',
  authMiddleware,
  userController.getCertificate,
);

router.get(
  '/professional-detail',
  userController.getAllProfessionalDetail,
);
router.get('/industry', industryController.getIndustry);

router.post('/industry', authMiddleware, industryController.createIndustry);

router.get(
  '/customerIndustry',
  authMiddleware,
  industryController.getCustomerIndustries,
);
router.put(
  '/user/professional-detail/:id',
  authMiddleware,
  userController.updateProfessionalDetail,
);

router.put(
  '/user/project/:id',
  authMiddleware,
  userController.updateUserProject,
);
export default router;
