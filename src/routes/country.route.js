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

router.get(
  '/technology',
  countryController.getTechnology,
);

export default router;
