import AppError from '../utils/AppError';
import { NextFunction, Response, Request } from 'express';

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    err: err,
    message: err.message,
    status: err.status,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
    });
  }
};

const errorController = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV == 'development') sendErrorDev(err, res);
  else if (process.env.NODE_ENV == 'production') sendErrorProd(err, res);
};

module.exports = errorController;
