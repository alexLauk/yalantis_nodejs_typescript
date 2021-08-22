import { Expose, Transform } from 'class-transformer';

export default class UserViewDTO {
  @Expose()
  public email: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  @Expose()
  @Transform(({ value }) => `localhost:3000/file/uploads/${value}`)
  public avatar: string;
}
