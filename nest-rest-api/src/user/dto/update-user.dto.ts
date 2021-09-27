import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { REGEXP } from 'src/constants';

export class UpdateUserDto {
  @ValidateIf((o) => o.password === undefined)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name?: string;

  @ValidateIf((o) => o.name === undefined)
  @Matches(REGEXP.PASSWORD_MATCH)
  password?: string;
}
