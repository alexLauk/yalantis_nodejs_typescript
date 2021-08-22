import { NextFunction, Request, Response } from 'express';
import HTTPError from '../errors/HttpError';

export default function errorHandler(
  err: HTTPError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.statusCode) {
    return res.status(err.statusCode).json(err.JSON);
  }
  console.log(req);

  return res.status(500).send({
    typeError: 'SERVER',
    message: 'Server error',
    stack: err.stack,
  });

  next();
}
