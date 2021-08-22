import * as jwt from 'jsonwebtoken';

export default async function generateToken(payload: object, jwtSecret: string, expiresIn: string) {
  return jwt.sign(payload, jwtSecret, { expiresIn });
}
