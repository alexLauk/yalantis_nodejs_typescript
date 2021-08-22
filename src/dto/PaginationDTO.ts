import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import BaseDTO from './BaseDTO';

export default class PaginationDTO extends BaseDTO {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  public skip: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  public take: number;
}
