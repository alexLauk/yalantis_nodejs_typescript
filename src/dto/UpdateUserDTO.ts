import {
  IsString, MinLength, IsAlpha, IsDefined,
} from 'class-validator';
import BaseDTO from './BaseDTO';

export default class UserUpdateDTO extends BaseDTO {
  @IsAlpha()
  @IsString()
  @IsDefined()
  @MinLength(2)
  firstName?: string;

  @IsAlpha()
  @IsString()
  @IsDefined()
  @MinLength(2)
  lastName?: string;
}
