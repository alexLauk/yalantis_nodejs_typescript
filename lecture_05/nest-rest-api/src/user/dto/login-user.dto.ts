import { IsDefined, IsEmail, Matches } from 'class-validator';
import { REGEXP } from 'src/constants';

export class LoginUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @Matches(REGEXP.PASSWORD_MATCH)
  password: string;
}
