import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import User from '../entities/user';
import dotEnvOptions from './dotenvconfig';

dotenv.config(dotEnvOptions);

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  database: process.env.TYPEORM_DATABASE,
  password: process.env.TYPEORM_PASSWORD,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ['src/typeorm/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/typeorm/entities',
    migrationsDir: 'src/typeorm/migrations',
  },
};

export default config;
