import { Request, Response, NextFunction } from 'express';

export default function asyncHandler(handle: (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void | Response>) {
  return async (req: Request, res: Response) => {
    try {
      return await handle(req, res);
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json(error.JSON);
      }
      console.log(error);

      return res.status(500).send({
        typeError: 'SERVER',
        message: 'Server error',
        stack: error.stack,
      });
    }
  };
}
