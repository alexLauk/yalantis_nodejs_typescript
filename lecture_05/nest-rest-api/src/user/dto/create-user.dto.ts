import { IsDefined, IsString, MinLength } from 'class-validator';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @IsDefined()
  @IsString()
  @MinLength(3)
  name: string;
}
