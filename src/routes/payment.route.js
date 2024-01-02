import { Router } from 'express';
import paymentController from '../controllers/payment.controller';

const router = Router();

router.post(
  '/order',
  paymentController.createRazorpayOrder,
);

router.get(
  '/order',
  paymentController.getRazorpayOrderDetails,
);

router.get(
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
