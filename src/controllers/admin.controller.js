import repositories from '../repositories';
import utility from '../utils';

const { adminRepository } = repositories;

export default {

  async getAllUser(req, res, next) {
    try {
      const result = await adminRepository.getAllUser(req);
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

  async adminLogin(req, res, next) {
    try {
      const result = await adminRepository.adminLogin(req);
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

  async getClientProject(req, res, next) {
    try {
      const result = await adminRepository.getClientProject(req);
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

  async getUserApplication(req, res, next) {
    try {
      const result = await adminRepository.getUserApplication(req);
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

  async getProjectProposal(req, res, next) {
    try {
      const result = await adminRepository.getProjectProposal(req);
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

};
