import { getRepository, Repository } from 'typeorm';
import BadRequestError from '../errors/BadRequestError';
import User from '../typeorm/entities/user';
import { hashPassword, comparePasswords } from '../utils/password';
import NotFoundError from '../errors/NotFoundError';
import ConflictError from '../errors/ConflictError';
import UnauthorizedError from '../errors/UnauthorizeError';

export default class UserService {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async getUserProfileById(id: number) {
    return this.getUserProfile({ id, enabled: true });
  }

  public async getUserProfileByEmail(email: string) {
    return this.getUserProfile({ email: email.toLowerCase(), enabled: true });
  }

  public async createUser(data: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar: string
  }) {
    const email = data.email.toLowerCase();

    const userIsExists = await this.repository.findOne({ where: { email } });

    if (userIsExists) {
      throw new ConflictError(`User with email ${userIsExists.email} already exists!`);
    }

    const passwordHash = await hashPassword(data.password);

    const user = new User({ ...data, email, password: passwordHash });

    await this.repository.save(user);

    return user;
  }

  public async updateUserProfile(id: number, changes: {
    firstName?: string,
    lastName?: string,
    oldPassword?: string,
    newPassword?: string,
  }) {
    const user = await this.getUserProfileById(id);

    if (changes.firstName) {
      user.firstName = changes.firstName;
    }

    if (changes.lastName) {
      user.lastName = changes.lastName;
    }

    if (changes.oldPassword) {
      const passwordsMatch = await comparePasswords(changes.oldPassword, user.password);

      if (!passwordsMatch) {
        throw new UnauthorizedError('Current password is not correct');
      }
      if (changes.oldPassword === changes.newPassword) {
        throw new BadRequestError('New password must differ from previous');
      }
      const newHashedPass = await hashPassword(changes.newPassword);
      user.password = newHashedPass;
    }

    await this.repository.save(user);

    return user;
  }

  public async deleteUser(id: number) {
    const user = await this.getUserProfileById(id);

    user.enabled = false;

    await this.repository.save(user);

    return user;
  }

  public async getAllUsers(skip?: number, take?: number) {
    if (skip && skip < 0) {
      throw new BadRequestError('Wrong skip parameter!');
    }

    if (take && take <= 0) {
      throw new BadRequestError('Wrong take parameter!');
    }

    const users = await this.repository.find({
      where: { enabled: true },
      skip,
      take,
      order: {
        id: 'DESC',
      },
    });

    return users;
  }

  private async getUserProfile(where: {}) {
    const user = await this.repository.findOne({ where });

    if (!user) {
      throw new NotFoundError('User was not found');
    }

    return user;
  }
}
