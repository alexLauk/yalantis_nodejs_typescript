import {
  IsDefined, IsEmail, IsNotEmpty, IsString, Matches,
} from 'class-validator';
import BaseDTO from './BaseDTO';

export default class AutPayloadDTO extends BaseDTO {
  @IsDefined()
  @IsNotEmpty()
  id: string;

  @IsDefined()
  @IsString()
  @IsEmail()
  @Matches(/(.+@gmail.com)/)
  email: string;
}
