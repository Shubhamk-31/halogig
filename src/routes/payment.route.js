import { Router } from 'express';
import paymentController from '../controllers/payment.controller';
import middlewares from '../middlewares/index';

const router = Router();
const { authMiddleware } = middlewares;
router.post(
  '/order',
  authMiddleware,
  paymentController.createRazorpayOrder,
);

router.get(
  '/order',
  paymentController.getRazorpayOrderDetails,
);

router.post(
  '/order-status',
  paymentController.updatePaymentStatus,
);

router.get(
  '/user-order',
  paymentController.getAllTransaction,
);

// router.get(
//   '/technology',
//   countryController.getTechnology,
// );

export default router;
