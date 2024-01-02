import repositories from '../repositories';
import utility from '../utils';

const { paymentRepository } = repositories;

export default {
  /**
   * Create order
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   */
  async createRazorpayOrder(req, res, next) {
    try {
      const result = await paymentRepository.createRazorpayOrder(req);
      console.log(result, 99999);
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
   * Function to get list of Transaction
   */
  async getRazorpayOrderDetails(req, res, next) {
    try {
      const result = await paymentRepository.getRazorpayOrderDetails();
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
   * Function to get list of Transaction
   */
  async getAllTransaction(req, res, next) {
    try {
      const result = await paymentRepository.getAllTransaction();
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
