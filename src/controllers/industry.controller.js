import repositories from '../repositories';
import utility from '../utils';

const { industryRepository } = repositories;

export default {
  /**
   * Create Industry
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   */
  async createIndustry(req, res, next) {
    try {
      const result = await industryRepository.createIndustry(req);
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
          message: utility.getMessage(req, false, 'Industry Already Exist'),
        });
      }
    } catch (error) {
      next(error);
    }
  },
  /**
   * Function to get list of industries
   */
  async getIndustry(req, res, next) {
    try {
      const result = await industryRepository.getIndustry();
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
          message: utility.getMessage(req, false, 'Industry Already Exist'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * Function to get list of industries
   */
  async getCustomerIndustries(req, res, next) {
    try {
      const result = await industryRepository.getCustomerIndustries();
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
          message: utility.getMessage(req, false, 'Industry Already Exist'),
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
