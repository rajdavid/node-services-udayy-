import bodyParser from 'body-parser';

import cors from 'cors';
import express from 'express';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import path from 'path';
import httpStatus from 'http-status';
import APIError from '../server/objects/APIError';
import config from './env';
import routes from '../server/routes';

// eslint-disable-next-line import/no-duplicates
import winstonInstance from './winston';
// eslint-disable-next-line import/no-duplicates
import logger from './winston';

const app = express();
const server = require('http').createServer(app); // eslint-disable-line

// To get the user agent


// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development') {
  // mount all mobile-routes on /node/api/mobile path
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
}

app.use((req, res, next) => {
  logger.log({
    level: 'info',
    message: 'In Middleware',
    url: req.url,
    language: req.headers['x-custom-language'],
    country: req.headers['x-custom-country'],
  });
  const a = req.originalUrl.split('/node/api');
  if (a.length === 2) {
    logger.log({
      level: 'info',
      message: 'In Middleware',
      url: `${req.url} ${new Date()}`,
      language: req.headers['x-custom-language'],
      country: req.headers['x-custom-country'],
    });
    req.url = req.originalUrl;
  } else {
    req.url = `/node/api${req.originalUrl}`;
  }
  next();
});
// some comment
// some comment 2
app.get('/node/api', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

// mount all routes on /api path
app.use('/node/api', routes);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map((error) => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  }
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(
    expressWinston.errorLogger({
      winstonInstance,
    })
  );
}

// error handler, send stacktrace only during development
app.use((err, req, res) =>
  res.status(err.status).json({
    success: false,
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {},
  })
);

export default server;
