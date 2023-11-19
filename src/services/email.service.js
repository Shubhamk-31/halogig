import nodemailer from 'nodemailer';
import config from '../config';
import logger from './logger.service';

const { mail: { fromEmail, smtp }, app: { environment } } = config;
const transport = nodemailer.createTransport(smtp);

export default {
  /**
   * Verify email server
   * @param {object} options
   * @returns
   */
  async verifyEmailServer(options) {
    try {
      if (environment === 'production') {
        // return await sendGridService.sendGridEmail(options);
      }
      const result = await transport.verify();
      if (result) {
        return await this.sendEmail(options);
      }
      return false;
    } catch (e) {
      logger.warn('Unable to connect to email server');
      throw e;
    }
  },

  /**
   * Send email
   * @param {object} options
   * @param {string} type
   * @returns
   */
  async sendEmail(options, type = 'send') {
    try {
      /* *************** Mail send details **************** */
      const mailOptions = {
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.message,
      };

      /* *************** Mail recived details **************** */
      const mailRecOptions = {
        to: fromEmail,
        from: options.to,
        subject: options.subject,
        html: options.message,
      };

      // File attachment
      if (options.attachments) {
        mailOptions.attachments = options.attachments;
      }

      // BCC users mail send
      if (options.bcc) {
        mailOptions.bcc = options.bcc;
      }

      // CC users mail send
      if (options.cc) {
        mailOptions.cc = options.cc;
      }
      return new Promise((resolve, reject) => {
        transport.sendMail(
          type === 'send' ? mailOptions : mailRecOptions,
          (error, info) => {
            if (error) {
              logger.error(`Email sent error: ${error}`);
              reject(error);
            } else {
              resolve(info);
            }
          },
        );
      });
    } catch (error) {
      logger.error(`Email sent error: ${error}`);
      throw error;
    }
  },

};
