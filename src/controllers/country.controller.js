import repositories from '../repositories';
import utility from '../utils';

const { countryRepository } = repositories;

export default {

  async createCountry(req, res, next) {
    try {
      const result = await countryRepository.createCountry(req);
      if (result) {
        res.status(utility.httpStatus('OK')).json({
          success: true,
          data: result,
          message: utility.getMessage(req, false, 'SIGNUP'),
        });
      } else {
        res.status(utility.httpStatus('BAD_REQUEST')).json({
          success: false,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async getTechnology(req, res, next) {
    try {
      const result = await countryRepository.getTechnology(req);
      if (result) {
        res.status(utility.httpStatus('OK')).json({
          success: true,
          data: result,
          message: utility.getMessage(req, false, 'SIGNUP'),
        });
      } else {
        res.status(utility.httpStatus('BAD_REQUEST')).json({
          success: false,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async getAllCountry(req, res, next) {
    try {
      const result = await countryRepository.getAllCountry();
      if (result) {
        res.status(utility.httpStatus('OK')).json({
          success: true,
          data: result,
          message: utility.getMessage(req, false, ''),
        });
      } else {
        res.status(utility.httpStatus('BAD_REQUEST')).json({
          success: false,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async getDesignation(req, res, next) {
    try {
      const result = await countryRepository.getDesignation();
      if (result) {
        res.status(utility.httpStatus('OK')).json({
          success: true,
          data: result,
          message: utility.getMessage(req, false, ''),
        });
      } else {
        res.status(utility.httpStatus('BAD_REQUEST')).json({
          success: false,
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
