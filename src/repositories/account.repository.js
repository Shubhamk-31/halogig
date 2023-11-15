// /* eslint-disable import/no-cycle */
// import { Op } from 'sequelize';
// import bcrypt from 'bcryptjs';
// import winston from 'winston';
// import path from 'path';
// import fs from 'fs';
// import models from '../models';
// import utility from '../utils';
// import jwt from '../services/jwt.service';
// import loggers from '../services/logger.service';
// import emailServices from '../services/emailTemplate.service';

// const {
//   User, UserDevice, Address,
// } = models;
// export default {
// async createUser()

// };
// export default {
//   async getDeviceDetailByToken(token) {
//     try {
//       const where = {
//         accessToken: token,
//       };
//       return await UserDevice.findOne({ where });
//     } catch (error) {
//       loggers.error(`Account get device detail by token error:${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Function to Encrypt Password
//    * @param {string} password
//    */
//   async createHashPassword(password) {
//     try {
//       const salt = await bcrypt.genSalt();
//       return await bcrypt.hash(password, salt);
//     } catch (error) {
//       loggers.error(`Account create hash password error:${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Create New User
//    * @param {Object} req
//    */
//   async signup(req) {
//     try {
//       const bodyData = req.body;
//       const hashPassword = await this.createHashPassword(bodyData.password);
//       bodyData.password = hashPassword;
//       const userData = await User.create(bodyData);

//       if (userData) {
//         return userData;
//       }
//       return false;
//     } catch (error) {
//       loggers.error(`Account signup error:${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Function to Check Password
//    * @param {string} password
//    * @param {string} hashPassword
//    */
//   async compareUserPassword(password, hashPassword) {
//     if (password && hashPassword) {
//       const isPasswordMatch = await bcrypt.compare(password, hashPassword);
//       return !!isPasswordMatch;
//     }
//     return false;
//   },

//   /**
//    * Create or Update Login Device Details of all user
//    * @param {Object} data
//    */
//   async addUpdateUserDevice(data, transaction) {
//     try {
//       const { userId } = data;
//       const userDeviceToken = await this.getUserDeviceToken(userId);
//       if (!transaction) {
//         await this.updateLastLoginDate(userId);
//       }
//       if (userDeviceToken) {
//         await this.updateUserDevice(userDeviceToken, data, transaction);
//       } else {
//         await this.addUserDevice(data, transaction);
//       }
//     } catch (error) {
//       loggers.error(`Account add update user device error:${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Fetches all user Login Device Details
//    * @param {*} userId
//    */
//   async getUserDeviceToken(userId, req) {
//     try {
//       return await UserDevice.findOne({ where: { userId } });
//     } catch (error) {
//       loggers.error(
//         `Account get user device token error:${error},user id: ${req?.user?.id}`,
//       );
//       throw Error(error);
//     }
//   },

//   /**
//  * Update all user last login detail
//  * @param {Integer} userId
//  */
//   async updateLastLoginDate(userId) {
//     try {
//       await User.update(
//         { lastLoginDate: utility.getCurrentDate(Date(), 'YYYY-MM-DD HH:mm:ss') },
//         { where: { id: userId } },
//       );
//     } catch (error) {
//       loggers.error(
//         `Account get user device token error:${error},user id: ${userId}`,
//       );
//       throw Error(error);
//     }
//   },

//   /**
//    * Update all user Login Device Details
//    * @param {Object} userDeviceObject
//    * @param {Object} data
//    */
//   async updateUserDevice(userDeviceObject, data, transaction = {}) {
//     try {
//       return await UserDevice.update(
//         data,
//         {
//           where: { userId: userDeviceObject?.userId },
//         },
//         { transaction },
//       );
//     } catch (error) {
//       loggers.error(
//         `Account update user device error: ${error} ,user id: ${userDeviceObject?.userId}`,
//       );
//       throw Error(error);
//     }
//   },

//   /**
//    * Add all user Login Device Details
//    * @param {Object} data
//    */
//   async addUserDevice(data, transaction) {
//     try {
//       return await UserDevice.create(data, { transaction });
//     } catch (error) {
//       loggers.error(`Account add user device error:${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Check customer login
//    * @param {Object} req
//    */
//   async checkMobileAccountLogin(req) {
//     try {
//       const {
//         body: {
//           email, password, firebaseToken, deviceType, appVersion,
//         },
//         headers,
//       } = req;
//       const where = {
//         [Op.or]: [{ email }, { phoneNumber: email }],
//         userRole: 'customer',
//         status: { [Op.ne]: 'deleted' },
//       };
//       let user = await User.findOne({
//         where,
//         include: [
//           {
//             association: 'userAddressDetails',
//             where: { status: 'active' },
//             required: false,
//           }],
//       });
//       if (user) {
//         const userDetails = {
//           email: user?.email,
//           phoneNumber: user?.phoneNumber,
//           phoneNumberCountryCode: user?.phoneNumberCountryCode,
//         };
//         if (user?.socialId || user?.socialType) {
//           userDetails.status = 'unAuthorized';
//           return userDetails;
//         }
//         const isPasswordMatch = await this.compareUserPassword(
//           password,
//           user.password,
//         );
//         if (isPasswordMatch) {
//           if (user && user.verificationStatus === null) {
//             await User.update(bodyData, { where }); // Otp update
//             user = user.get();
//             return {
//               verificationStatus: 'pending', ...userDetails,
//             };
//           }
//           if (user.status === 'active' && user.verificationStatus === 'completed') {
//             const { ...userData } = user.get();
//             const tokenData = user.get();
//             delete tokenData.userAddressDetails;
//             const token = await jwt.createToken(tokenData);
//             const deviceData = {
//               userId: userData.id,
//               deviceId: firebaseToken,
//               deviceType,
//               accessToken: token,
//               appVersion,
//               timezone: headers?.timezone ?? headers?.timeZone,
//             };
//             await this.addUpdateUserDevice(deviceData);
//             delete userData.password;
//             delete userData.token;
//             delete userData.otp;
//             return { token, ...userData };
//           }
//           return {
//             status: user?.status,
//             verificationStatus: user?.verificationStatus,
//             ...userDetails,
//           };
//         }
//       }
//       return { status: 'invalid' };
//     } catch (error) {
//       loggers.error(`Account user account login error:${error}`);
//       throw Error(error);
//     }
//   },
//   /**
//    * Check admin and seller login
//    * @param {Object} req
//    */
//   async checkUserAccountLogin(req) {
//     try {
//       const { body } = req;
//       const emailNumber = body?.emailMobileNumber ?? body.email;
//       const where = {
//         [Op.or]: [{ email: emailNumber }, { phoneNumber: emailNumber }],
//         userRole: body?.userRole,
//         status: { [Op.ne]: 'notDeletedUser' },
//       };
//       const user = await User.findOne({ where });
//       const statusData = {
//         verificationStatus: user?.verificationStatus,
//         status: user?.status,
//         userRole: user?.userRole,
//         id: user?.id,
//         phoneNumber: user?.phoneNumber,
//         req.body.id = id;
//         const isPasswordMatch = await this.compareUserPassword(
//           body?.password,
//           user.password,
//         );
//         if (!isPasswordMatch) {
//           return false;
//         }
//         if (user.status === 'active') {
//           const userData = { id, email };
//           const token = await jwt.createToken(userData);
//           const deviceData = {
//             userId: id,
//             accessToken: token,
//             deviceType: 'web',
//           };
//           await this.addUpdateUserDevice(deviceData, null);
//           const data = user.get();
//           delete data.password;
//           delete data.token;
//           delete data.otp;
//           return { ...data, token, userId: id };
//         }
//         return statusData;
//       }
//       if (user && user.userRole === 'seller') {
//         const isPasswordMatch = await this.compareUserPassword(
//           body?.password,
//           user.password,
//         );
//         if (!isPasswordMatch) {
//           return false;
//         }
//         if (user && user.verificationStatus === null) {
//           const otp = 4444 ?? utility.generateOtp();
//           const bodyData = {
//             otp,
//             expireDateTimeTime: utility.getCurrentDate(new Date(), 'YYYY-MM-DD HH:mm:ss'),
//           };
//           smsService.sendOtp({ otp, to: `${user?.phoneNumberCountryCode}${user?.phoneNumber}` });
//           await User.update(bodyData, { where }); // Otp update
//           statusData.otpSend = true;
//         }
//         return statusData;
//       }
//       return { status: 'invalid' };
//     } catch (error) {
//       loggers.error(`Admin Account user account login error:${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Find user detail
//    * @param {Object} whereObj
//    */
//   async findOne(whereObj) {
//     this.whereObj = whereObj;
//     try {
//       if (!this.whereObj.status) {
//         this.whereObj.status = { [Op.ne]: 'deleted' };
//       }
//       return await User.findOne({
//         where: this.whereObj,
//         attributes: {
//           exclude: ['password', 'verifyToken'],
//         },
//       });
//     } catch (error) {
//       loggers.error(`Account find one error: ${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Send Reset Password Link on Email
//    * @param {Object} req
//    */
//   async sendResetPasswordLink(req) {
//     try {
//       const { body: { email } } = req;
//       const data = await User.findOne({
//         where: { [Op.or]: [{ email }, { phoneNumber: email }] },
//       });
//       let notificationMsg = utility.getMessage(
//         {},
//         false,
//         'PASSWORD_LINK_SENT',
//       );

//       if (!email.includes('@')) {
//         notificationMsg = notificationMsg
//           .replace('email address', 'phone Number');
//       }

//           userName: `${data.firstName ?? ''}`,
//           email: data.email,
//           token,
//         await emailServices.forgotPassword(object);
//         return notificationMsg;
//       }
//       return false;
//     } catch (error) {
//       loggers.error(`Account send reset password link error: ${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Create new password
//    * @param {Object} req
//    * @returns
//    */
//   async createNewPassword(req) {
//     try {
//       const {
//         body: { newPassword, confirmPassword, location }, headers,
//         data,
//       } = req;
//       if (newPassword === confirmPassword) {
//         const deviceType = headers['User-agent'] ?? headers['user-agent'] ?? headers.User_agent;
//         const hashPassword = await this.createHashPassword(newPassword);
//         const result = await data.update({
//           password: hashPassword, token: null, changePasswordLocation: location, deviceType,
//         });
//         const object = {
//           userName: `${result.firstName ?? ''}`,
//           email: result.email,
//           location: location ?? '',
//           deviceType,
//           dateTime: utility.getCurrentLocalDate(Date(), 'YYYY-MM-DD HH:mm:ss') ?? '',
//         };
//         // Change password email send
//         emailServices.changePassword(object);
//       }
//       return true;
//     } catch (error) {
//       loggers.error(`Account password reset error: ${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * Update password
//    * @param {Object} req
//    */
//   async resetPassword(req) {
//     try {
//       const {
//         body: { email, password },
//       } = req;
//       const user = await User.findOne({ where: { email } });
//       if (user) {
//         const hashPassword = await this.createHashPassword(password);
//         const changedPassword = await User.update(
//           { password: hashPassword },
//           { where: { email } },
//         );
//         return changedPassword[0] === 1;
//       }
//       return false;
//     } catch (error) {
//       loggers.error(`Account reset password error: ${error}`);
//       throw Error(error);
//     }
//   },

//   /**
//    * change password
//    * @param {object} req
//    * @returns
//    */
//   async changePassword(req) {
//     try {
//       const {
//         body: { newPassword, location },
//         user, headers,
//       } = req;
//       const deviceType = headers['User-agent'] ?? headers['user-agent'] ?? headers.User_agent;
//       const hashPassword = await this.createHashPassword(newPassword);
//       const result = await user.update(
//         { password: hashPassword, deviceType, changePasswordLocation: location },
//       );
//       const object = {
//         userName: `${result.firstName ?? ''}`,
//         email: result.email,
//         location: location ?? '',
//         deviceType,
//         dateTime: utility.getCurrentLocalDate(new Date(), 'YYYY-MM-DD HH:mm:ss') ?? '',
//       };
//       // Change password email send
//       emailServices.changePassword(object);
//       notificationRepository.updateProfileNotification(user.id, 'password');
//       return result;
//     } catch (error) {
//       loggers.error(
//         `Account change password error: ${error}, user id: ${req?.user?.id}`,
//       );
//       throw Error(error);
//     }
//   },

//   /**
//    * edit profile
//    * @param {object} req
//    * @returns
//    */
//   async editProfile(req) {
//     const transaction = await models.sequelize.transaction();
//     try {
//       const { body, user } = req;
//       const { address } = body;

//       if (address) {
//         await Address.update(
//           body,
//           { where: { userId: user.id } },
//           { transaction },
//         );
//       }
//       if (body.profilePicture !== user?.profilePicture) {
//         await mediaRepository.findMediaByBasePathAndUnlink(
//           user?.profilePicture,
//         );
//         // Media file used
//         await mediaRepository.markMediaAsUsed([body.profilePicture]);
//       }

//       if (user.userRole === 'seller') {
//         notificationRepository.updateProfileNotification(user.id, 'seller');
//       } else {
//         notificationRepository.updateProfileNotification(user.id);
//       }
//       const updateResult = await user.update(body, { transaction });
//       await transaction.commit();

//       return updateResult;
//     } catch (error) {
//       await transaction.rollback();
//       loggers.error(
//         `Account edit profile error: ${error}, user id: ${req?.user?.id}`,
//       );
//       throw Error(error);
//     }
//   },

//   /**
//    * Delete all user Login Device Details
//    * @param {Object} userDeviceObject
//    * @param {Object} data
//    */
//   async deleteUserDevice(userDeviceObject) {
//     try {
//       return await UserDevice.destroy(
//         {
//           where: { userId: userDeviceObject?.userId },
//         },
//       );
//     } catch (error) {
//       loggers.error(
//         `Account update user device error: ${error} ,user id: ${userDeviceObject?.userId}`,
//       );
//       throw Error(error);
//     }
//   },

//   async getFileList(dirName) {
//     const files = [];
//     const items = fs.readdirSync(dirName, { withFileTypes: true });
//     items.forEach(async (item) => {
//       if (item.isDirectory()) {
//         files.push(...(await this.getFileList(`${dirName}/${item.name}`)));
//       } else {
//         files.push(`${dirName}/${item.name}`);
//       }
//     });
//     return files;
//   },

//   async getWinstonLogsPath() {
//     try {
//       const data = [];
//       const logsPath = path.join(__dirname, '../logs');
//       const items = await this.getFileList(logsPath);
//       items.forEach((item) => {
//         if (path.extname(item) === '.log') {
//           data.push({
//             key: item.split('logs/')[1],
//             value: item,
//           });
//         }
//       });
//       return { rows: data };
//     } catch (error) {
//       throw Error(error);
//     }
//   },

//   async getWinstonLogs(queryData) {
//     try {
//       const {
//         fileName, limit, offset, order, startDate, endDate, level,
//       } = queryData;
//       const options = {
//         order: order || 'DESC',
//         // fields: ['timestamp']
//       };
//       delete options.rows;

//       // Default log for yesterday and today show
//       if (startDate) {
//         options.from = startDate; // Date format 2013-08-11 00:00:00.000 accept
//       }
//       if (endDate) {
//         options.until = endDate; // Date format 2013-08-11 00:00:00.000 accept
//       }
//       if (level) {
//         options.level = level;
//       }
//       const count = await this.getWinstonQuery(fileName, options);
//       options.limit = parseInt(limit, 10) || 10;
//       options.start = parseInt(offset, 10) || 0;

//       const rows = await this.getWinstonQuery(fileName, options);
//       return { rows: rows?.file, count: count?.file?.length ?? 0 };
//     } catch (error) {
//       throw Error(error);
//     }
//   },

//   /**
//  * Get log and count winston
//  * @param {object} req
//  * @returns
//  */
//   async getWinstonQuery(fileName, options) {
//     try {
//       winston.configure({
//         transports: [new winston.transports.File({ filename: fileName })],
//       });
//       return new Promise((resolve, reject) => {
//         winston.query(options, (err, results) => {
//           if (err) {
//             reject(err);
//           }
//           resolve(results);
//         });
//       });
//     } catch (error) {
//       throw Error(error);
//     }
//   },

// };
