import repositories from '../repositories';
import utility from '../utils';

const { userRepository } = repositories;

export default {

  /**
   * Create staff
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   */
  async createNewUser(req, res, next) {
    try {
      const result = await userRepository.createNewUser(req);
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
          message: utility.getMessage(req, false, 'User Already Exist'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async verifyUserOtp(req, res, next) {
    try {
      const result = await userRepository.verifyUserOtp(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async userCertificate(req, res, next) {
    try {
      const result = await userRepository.userCertificate(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async userEducation(req, res, next) {
    try {
      const result = await userRepository.userEducation(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async userDetails(req, res, next) {
    try {
      const result = await userRepository.userProjectDetail(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async getUserDetail(req, res, next) {
    try {
      const result = await userRepository.getUserDetail(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const result = await userRepository.login(req);
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
          message: utility.getMessage(req, false, 'Email or Password is incorrect'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async userThumbnail(req, res, next) {
    try {
      const result = await userRepository.userThumbnail(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async userIntenalData(req, res, next) {
    try {
      const result = await userRepository.userIntenalData(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async userRegistration(req, res, next) {
    try {
      const result = await userRepository.userRegistration(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async userProjectDetail(req, res, next) {
    try {
      const result = await userRepository.userProjectDetail(req);
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
          message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

// export default {
//   /**
//    * Otp verify
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async otpVerify(req, res, next) {
//     try {
//       const { body: { changeNumberVerificationStatus } } = req;
//       const result = await userRepository.otpVerify(req);
//       if (result) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: result,
//           message: utility.getMe
// ssage(req, false, result.userRo
// le === 'customer' && !changeNumber
// VerificationStatus ? 'LOGIN_SUCCESS' : 'CHANGE_MOBILE_OTP_VERIFY'),
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * Otp verify
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async checkDetail(req, res, next) {
//     try {
//       res.status(utility.httpStatus('OK')).json({
//         success: true,
//         data: [],
//         message: utility.getMessage(req, false, ''),
//       });
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * Add bank details
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async addBankDetail(req, res, next) {
//     try {
//       const result = await userRepository.addBankDetail(req);
//       if (result) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: result,
//           message: utility.getMessage(req, false, 'SELLER_ADDED'),
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * Update bank details
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async updateBankDetail(req, res, next) {
//     try {
//       const result = await userRepository.updateBankDetail(req);
//       if (result) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: result,
//           message: utility.getMessage(req, false, 'BANK_DETAIL_UPDATED'),
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * Update Staff
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async updateUser(req, res, next) {
//     try {
//       const { body: { confirmPassword, mobileNumberUpdate } } = req;
//       const result = await userRepository.updateUser(req);
//       if (result && mobileNumberUpdate) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: result,
//           message: utility.getMessage(req, false, 'MOBILE_NUMBER_UPDATED'),
//         });etMessage(req, false, confirmPassword ? 'PASSWORD_CHANGED' : 'USER_DETAIL_UPDATED'),
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * Create customer and seller
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async createUser(req, res, next) {
//     try {nStatus === 'completed' ? 'LOGIN_SUCCESS' : 'CHANGE_MOBILE_OTP_SENT';
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: userRole === 'customer' && verificationStatus !== 'completed' ? {} : result,
//           message: utility.getMessage(req, false, message),
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//   * Resend otp customer and seller
//   * @param {object} req
//   * @param {object} res
//   * @param {Function} next
//   */
//   async resendOtp(req, res, next) {
//     try {
//       const result = await userRepository.resendOtp(req);
//       if (result) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: {},
//           message: utility.getMessage(req, false, 'OTP_RE_SENT'),
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * User Details
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async getUserDetail(req, res, next) {
//     try {
//       const { user } = req;
//       if (user) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: user,
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * User Details
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async guestUser(req, res, next) {
//     try {
//       const result = await userRepository.guestUser(req);
//       if (result) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: result,
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * User update status
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async updateStatus(req, res, next) {
//     try {
//       const user = await userRepository.updateStatus(req);
//       if (user) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: user,
//           message: utility.getMessage(req, false, 'USER_STATUS_UPDATED'),
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * Delete user
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async deleteUser(req, res, next) {
//     try {
//       await userRepository.deleteUser(req);
//       res.status(utility.httpStatus('OK')).json({
//         success: true,
//         data: {},
//         message: utility.getMessage(req, false, ''),
//       });
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * User list
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async getAllUser(req, res, next) {
//     try {
//       const result = await userRepository.getAllUser(req);
//       if (result) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: result,
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * Seller request reject status
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async requestRejectMessage(req, res, next) {
//     try {
//       req.body.userRole = 'seller';
//       req.body.status = 'rejected';
//       const user = await userRepository.updateStatus(req);
//       if (user) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: user,
//           message: utility.getMessage(req, false, 'USER_STATUS_UPDATED'),
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    *Stripe details
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async getStripeDetails(req, res, next) {
//     try {
//       const details = await userRepository.getStripeDetails();
//       if (details) {
//         res.status(utility.httpStatus('OK')).json({
//           success: true,
//           data: details,
//         });
//       } else {
//         res.status(utility.httpStatus('BAD_REQUEST')).json({
//           success: false,
//           data: null,
//           message: utility.getMessage(req, false, 'FALSE_RESPONSE'),
//         });
//       }
//     } catch (error) {
//       next(error);
//     }
//   },

//   /**
//    * Send Test Notification
//    * @param {object} req
//    * @param {object} res
//    * @param {Function} next
//    */
//   async sendTestNotification(req, res, next) {
//     try {
//       const data = await userRepository.sendTestNotification(req);
//       res.status(utility.httpStatus('OK')).json({
//         success: true,
//         data,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },

// };
