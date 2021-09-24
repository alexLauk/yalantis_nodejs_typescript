import { IsUUID } from 'class-validator';

export class ParamUserDto {
  @IsUUID()
  id: string;
}
