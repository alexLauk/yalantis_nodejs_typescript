import { IsNotEmpty, IsString, Matches } from 'class-validator';
import BaseDTO from './BaseDTO';

export default class ChangePasswordDTO extends BaseDTO {
  @IsString()
  @IsNotEmpty()
  oldPassword?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{7,}$/)
  newPassword?: string;
}
