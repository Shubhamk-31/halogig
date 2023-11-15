import { Router } from 'express';
import countryController from '../controllers/country.controller';

const router = Router();

router.post(
  '/country',
  countryController.createCountry,
);

router.get(
  '/country',
  countryController.getAllCountry,
);

router.get(
  '/designation',
  countryController.getDesignation,
);

export default router;
