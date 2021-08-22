import {
  IsDefined, IsEmail, IsNotEmpty, IsString, Matches,
} from 'class-validator';
import BaseDTO from './BaseDTO';

export default class LoginDTO extends BaseDTO {
  @IsDefined()
  @IsString()
  @IsEmail()
  @Matches(/(.+@gmail.com)/)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{7,}$/)
  password: string;
}
