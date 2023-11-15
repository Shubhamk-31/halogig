/* eslint-disable no-unused-vars */
import { Router } from 'express';
import path from 'path';
import loggers from '../services/logger.service';
import countryRoute from './country.route';
import userRoute from './user.route';

import utility from '../utils';

const router = Router();
const register = (app) => {
  app.use(router);
  app.get('/*', (req, res) => {
    if (!req.path.includes('/api')) {
      res.sendFile(path.join(`${__dirname}/../../build/index.html`));
    }
  });

  router.use('/api', [
    countryRoute,
    userRoute,
  ]);

  app.use((error, req, res, next) => {
    const internalError = utility.httpStatus('INTERNAL_SERVER_ERROR');
    if (!error.status || error.status === internalError) {
      loggers.error(`internal error ${new Date()} ${error}`);
    }
    res.status(error.status || internalError).json({
      success: false,
      data: null,
      error,
      message:
        error.status === internalError
          ? utility.getMessage(req, false, 'INTERNAL_ERROR')
          : error.message,
    });
  });

  app.use((req, res) => {
    const error = new Error('Not Found');
    error.status = utility.httpStatus('NOT_FOUND');
    res.status(error.status).json({
      success: false,
      data: null,
      error,
      message: error.message,
    });
  });
};
export default register;
