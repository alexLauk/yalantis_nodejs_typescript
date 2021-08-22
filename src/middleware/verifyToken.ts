import * as jwt from 'jsonwebtoken';
import { plainToClass } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../errors/UnauthorizeError';
import AuthPayloadDTO from '../dto/AutPayloadDTO';
import generateToken from '../utils/generateToken';

export default async function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const [tokenType, token] = req.headers.authorization.split(' ');

    if (tokenType !== 'Bearer') {
      throw new UnauthorizedError('Bearer token should be provided');
    }

    if (!token) {
      throw new UnauthorizedError('Access denied');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const result = plainToClass(AuthPayloadDTO, payload);

    await result.validate();

    const newToken = await generateToken(
      { id: result.id, email: result.email },
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRATION,
    );

    res.setHeader('token', `Bearer ${newToken}`);
    req.jwtPayload = result;

    return next();
  } catch (error) {
    console.log(error);
    return next(new UnauthorizedError('Invalid JWT token'));
  }
}
