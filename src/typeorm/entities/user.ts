import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatar: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean ;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  public constructor(data: {
    id?: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar: string,
    enabled?: boolean,
  }) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.password = data.password;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.avatar = data.avatar;
      this.enabled = data.enabled;
    }
  }
}
