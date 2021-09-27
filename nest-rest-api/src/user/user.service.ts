import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { randomUUID } from 'crypto';
import { AuthService } from 'src/auth/auth.service';
import { users } from 'src/db';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(private authService: AuthService) {
    this.users = users;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = this.findOneOrReject({
      email: loginUserDto.email.toLocaleLowerCase(),
    });
    const isMatch = await this.authService.comparePasswords(
      loginUserDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException("Passwor is'nt corect");
    }
    const access_token = await this.authService.generateJwt({ id: user.id });
    return { access_token };
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User({ id: randomUUID(), ...createUserDto });
    user.email = user.email.toLocaleLowerCase();
    const isExists = this.findOne({ email: user.email });
    if (isExists) {
      throw new ConflictException(`User with such email already exists`);
    }
    user.password = await this.authService.hashPassword(createUserDto.password);
    this.save(user);
  }

  getAll() {
    return this.find();
  }

  getOne(id: string) {
    return this.findOneOrReject({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOneOrReject({ id });
    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.password) {
      const hashPassword = await this.authService.hashPassword(
        updateUserDto.password,
      );
      if (user.password !== hashPassword) {
        throw new UnauthorizedException(
          'New password must differ from previous',
        );
      }
      user.password = hashPassword;
    }
  }

  remove(id: string) {
    const user = this.findOneOrReject({ id });
    user.enabled = false;
    this.save(user);
  }

  private findOneOrReject(search: Record<string, any>) {
    const [[key, value]] = Object.entries(search);
    const user = this.users.find((user) => user[key] === value && user.enabled);
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return user;
  }

  private findOne(search: Record<string, any>) {
    const [[key, value]] = Object.entries(search);
    const user = this.users.find((user) => user[key] === value && user.enabled);
    return user;
  }

  private find(search: Record<string, any> = {}) {
    const isEmpty = !Object.keys(search);
    if (isEmpty) {
      const [[key, value]] = Object.entries(search);
      const user = this.users.filter(
        (user) => user[key] === value && user.enabled,
      );
      return user;
    }
    return this.users.filter((user) => user.enabled);
  }

  private save(userSave: User) {
    const isExists = this.users.some((user) => user.email === userSave.email);
    if (isExists) {
      this.users.forEach((user) => {
        if (user.id === userSave.id) {
          user = { ...userSave };
        }
      });
    } else {
      this.users.push(userSave);
    }
  }
}
