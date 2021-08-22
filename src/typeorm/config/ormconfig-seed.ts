import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
import dotEnvOptions from './dotenvconfig';
import User from '../entities/user';

dotenv.config(dotEnvOptions);

const configSeed: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  database: process.env.TYPEORM_DATABASE,
  password: process.env.TYPEORM_PASSWORD,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ['src/typeorm/seeds/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/typeorm/seeds',
  },
};

export default configSeed;
