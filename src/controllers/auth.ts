import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import RegisterDTO from '../dto/RegisterDTO';
import UserViewDTO from '../dto/UserViewDTO';
import UserService from '../service/UserService';
import { comparePasswords } from '../utils/password';
import LoginDTO from '../dto/LoginDTO';
import generateToken from '../utils/generateToken';
import ChangePasswordDTO from '../dto/ChangePasswordDTO';
import UnauthorizedError from '../errors/UnauthorizeError';

export const login = async (req: Request, res: Response) => {
  const userLoginDTO = plainToClass(LoginDTO, req.body || {});

  await userLoginDTO.validate();

  const userService = new UserService();

  const user = await userService.getUserProfileByEmail(userLoginDTO.email);

  const isCompare = await comparePasswords(userLoginDTO.password, user.password);

  if (!isCompare) {
    throw new UnauthorizedError('Password is\'t corect');
  }

  const token = await generateToken(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRATION,
  );

  res.setHeader('token', `Bearer ${token}`);

  return res.send({ token });
};

export const register = async (req: Request, res: Response) => {
  const body = { ...req?.body || {}, ...{ avatar: req?.file?.filename || '' } };

  const userRegisterDTO = plainToClass(RegisterDTO, body);

  await userRegisterDTO.validate();

  const { ext } = path.parse(req.file.filename);

  const filename = req.body.email.replace(/(?=@).+/, '').toLowerCase();

  const avatar = `${filename}${ext}`;

  await sharp(req.file.path)
    .resize({ width: 200, height: 200 })
    .toFile(path.resolve(req.file.destination, avatar));

  await fs.promises.unlink(req.file.path);

  const userService = new UserService();

  const user = await userService.createUser({ ...userRegisterDTO, ...{ avatar } });

  return res.send(plainToClass(UserViewDTO, user, { excludeExtraneousValues: true }));
};

export const changePassword = async (req: Request, res: Response) => {
  const changePasswordDTO = plainToClass(ChangePasswordDTO, req.body || {});

  await changePasswordDTO.validate();

  const userService = new UserService();

  await userService.updateUserProfile(+req.jwtPayload.id, changePasswordDTO);

  return res.send({ message: 'Password successfully changed.' });
};
