import axios from 'axios';
import config from '../config';
import loggers from './logger.service';
import utility from '../utils/index';
import emailer from './email.service';
import ejsTemplate from './ejs.service';

const {
  app: { adminUrl, baseUrl }, firebase: {
    passwordToken, domainUriPrefix, dynamicLink,
    androidPackageName, androidFallbackLink,
    iosBundleId,
  },
} = config;
const logo = `${baseUrl}public/logo.png`;
export default {
  /**
   * Send email on forgot password
   * @param {Object} data
   */
  async forgotPassword(object) {
    try {
      const {
        email, userName, token, userRole, to,
      } = object;
      const data = {
        userName,
        redirectUrlCheck: `${adminUrl}${userRole}/reset-password/${token}`,
        logo,
      };
      if (userRole === 'seller') {
        data.redirectUrlCheck = `${adminUrl}reset-password/${token}`;
      }
      if (userRole === 'customer') {
        const tokenData = await this.getShortLink(token);
        if (tokenData) {
          data.redirectUrlCheck = tokenData.shortLink;
          data.redirectUrl = `${dynamicLink}/type=resetPassword,resetToken=${token}`;
        }
      }
      if (to) {
        data.to = to;
        // return await smsService.forgotResetLinkSms(data);
      }
      const ejsResult = await ejsTemplate.generateEjsTemplate({
        template: 'resetPassword.ejs',
        data,
      });
      const options = {
        to: email,
        subject: utility.getMessage({}, false, 'RESET_PASSWORD_EMAIL'),
        message: ejsResult,
      };
      return await emailer.verifyEmailServer(options);
    } catch (error) {
      loggers.error(`Forgot password error %s: ${error}`, error);
      throw Error(error);
    }
  },

  /**
 * Get shirt link
 * @param {object} req
 * @returns
 */
  async getShortLink(resetToken, type) {
    try {
      const bodyData = {
        dynamicLinkInfo: {
          domainUriPrefix: `${domainUriPrefix}`,
          link: `${dynamicLink}/type=${type ?? 'resetPassword'},${type ? 'productId' : 'resetToken'}=${resetToken}`,
          androidInfo: {
            androidPackageName: `${androidPackageName}`,
            androidFallbackLink: `${androidFallbackLink}`,
          },
          iosInfo: {
            iosBundleId: `${iosBundleId}`,
            iosFallbackLink: `${androidFallbackLink}`,
          },
          desktopInfo: {
            desktopFallbackLink: `${adminUrl}reset-password/${resetToken}`,
          },
        },
      };
      const uri = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${passwordToken}`;
      return new Promise((resolve, reject) => {
        axios.post(uri, bodyData).then((response) => {
          resolve(response.data);
        }).catch((error) => {
          reject(error);
        });
      });
    } catch (error) {
      loggers.error(`Connection forms list error: ${error}`);
      return error;
      // throw Error(error);
    }
  },

  /**
   * Send email on change password
   * @param {Object} data
   */
  async changePassword(object) {
    try {
      const { email } = object;
      const data = {
        ...object,
        logo,
      };
      const result = await ejsTemplate.generateEjsTemplate({
        template: 'changePassword.ejs',
        data,
      });

      const options = {
        to: email,
        subject: utility.getMessage({}, false, 'ACCOUNT_CHANGE_PASSWORD_EMAIL'),
        message: result,
      };
      return await emailer.verifyEmailServer(options);
    } catch (error) {
      loggers.error(`Change password error %s: ${error}`, error);
      throw Error(error);
    }
  },

  /**
 * Upload Product Email
 * @param {Object} data
 */
  async uploadProductEmail(object) {
    try {
      const { email } = object;
      const data = {
        ...object,
        logo,
      };
      data.redirectUrl = `${config.app.baseUrl}public/uploads/product/invalid/${object.downloadFile}.xlsx`;
      const result = await ejsTemplate.generateEjsTemplate({
        template: 'productUploadSummary.ejs',
        data,
      });

      const options = {
        to: email,
        subject: utility.getMessage({}, false, 'UPLOAD_PRODUCT_SUMMARY'),
        message: result,
      };
      return await emailer.verifyEmailServer(options);
    } catch (error) {
      loggers.error(`Change password error %s: ${error}`, error);
      throw Error(error);
    }
  },

  /**
   * Seller profile request accept and reject
   * @param {Object} data
   */
  async sellerRequestUpdate(object) {
    try {
      const { email, status, pendingApproval } = object;
      const data = {
        ...object,
        logo,
      };
      let template = 'userStatus.ejs';
      if (pendingApproval === 'pendingApproval' && status === 'active') {
        data.subject = utility.getMessage({}, false, 'SELLER_REQUEST_APPROVED_EMAIL');
        template = 'approvalUser.ejs';
      } else if (status === 'rejected') {
        data.subject = utility.getMessage({}, false, 'SELLER_REQUEST_REJECTED_EMAIL');
        template = 'approvalRejectUser.ejs';
      } else if (status === 'active') {
        data.message = utility.getMessage({}, false, 'SELLER_ACTIVE_MESSAGE');
        data.heading = 'activated';
        data.subject = utility.getMessage({}, false, 'ACTIVE_STATUS_UPDATED_EMAIL');
      } else {
        data.message = utility.getMessage({}, false, 'SELLER_INACTIVE_MESSAGE');
        data.heading = 'restricted';
        data.subject = utility.getMessage({}, false, 'INACTIVE_STATUS_UPDATED_EMAIL');
      }
      const result = await ejsTemplate.generateEjsTemplate({
        template,
        data,
      });
      const options = {
        to: email,
        subject: data?.subject,
        message: result,
      };
      return await emailer.verifyEmailServer(options);
    } catch (error) {
      loggers.error(`Change password error %s: ${error}`, error);
      throw Error(error);
    }
  },

  /**
   * Send email to customer on changing status
   * @param {Object} data
   */
  async customerStatusUpdate(object) {
    try {
      const { email, status } = object;

      const activeMessage = utility.getMessage({}, false, 'CUSTOMER_ACTIVE_MESSAGE');
      const inActiveMessage = utility.getMessage({}, false, 'CUSTOMER_INACTIVE_MESSAGE');
      const message = status === 'active' ? activeMessage : inActiveMessage;
      const heading = status === 'active' ? 'activated' : 'restricted';
      const subject = status === 'active'
        ? utility.getMessage({}, false, 'ACTIVE_STATUS_UPDATED_EMAIL')
        : utility.getMessage({}, false, 'INACTIVE_STATUS_UPDATED_EMAIL');
      const data = {
        ...object,
        logo,
        message,
        heading,
      };
      const result = await ejsTemplate.generateEjsTemplate({
        template: 'userStatus.ejs',
        data,
      });
      const options = {
        to: email,
        subject,
        message: result,
      };
      return await emailer.verifyEmailServer(options);
    } catch (error) {
      loggers.error(`Change password error %s: ${error}`, error);
      throw Error(error);
    }
  },

  /**
 * Add staff
 * @param {Object} data
 */
  async createStaff(object) {
    try {
      const { email } = object;
      const data = {
        ...object,
        logo,
        url: adminUrl,
      };
      const result = await ejsTemplate.generateEjsTemplate({
        template: 'createUserAccount.ejs',
        data,
      });

      const options = {
        to: email,
        subject: utility.getMessage({}, false, 'STAFF_ADD_EMAIL'),
        message: result,
      };
      return await emailer.verifyEmailServer(options);
    } catch (error) {
      loggers.error(`Change password error %s: ${error}`, error);
      throw Error(error);
    }
  },

};
