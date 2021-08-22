import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import UserUpdateDTO from '../dto/UpdateUserDTO';
import PaginationDTO from '../dto/PaginationDTO';
import UserViewDTO from '../dto/UserViewDTO';
import UserService from '../service/UserService';

export const getAll = async (req: Request, res: Response) => {
  const paginationDTO = plainToClass(PaginationDTO, req.query || {});

  await paginationDTO.validate();

  const { skip, take } = paginationDTO;

  const userService = new UserService();

  const users = await userService.getAllUsers(skip, take);

  const result = users.map((user) => plainToClass(
    UserViewDTO,
    user,
    { excludeExtraneousValues: true },
  ));

  return res.send(result);
};

export const getByID = async (req: Request, res: Response) => {
  const userService = new UserService();

  const user = await userService.getUserProfileById(+req.params.id);

  return res.send(plainToClass(UserViewDTO, user, { excludeExtraneousValues: true }));
};

export const update = async (req: Request, res: Response) => {
  const userUpdateDTO = plainToClass(UserUpdateDTO, req.body || {});

  await userUpdateDTO.validate();

  const userService = new UserService();

  const user = await userService.updateUserProfile(+req.jwtPayload.id, userUpdateDTO);

  return res.send(plainToClass(UserViewDTO, user, { excludeExtraneousValues: true }));
};

export const deleteByID = async (req: Request, res: Response) => {
  const userService = new UserService();

  const user = await userService.deleteUser(+req.params.id);

  return res.send(plainToClass(UserViewDTO, user, { excludeExtraneousValues: true }));
};
