import {
  IsAlpha, IsDefined, IsEmail, IsNotEmpty, IsString, Matches, MinLength,
} from 'class-validator';
import BaseDTO from './BaseDTO';

export default class RegisterDTO extends BaseDTO {
  @IsDefined()
  @IsString()
  @IsEmail()
  @Matches(/(.+@gmail.com)/)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{7,}$/)
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(2)
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(2)
  lastName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  avatar: string;
}
