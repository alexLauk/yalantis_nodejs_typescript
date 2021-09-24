import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';

export class ViewUserDto {
  id: number;
  name: string;

  @Exclude()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  enabled: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
