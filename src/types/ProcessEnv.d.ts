declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    TYPEORM_HOST: string;
    TYPEORM_USERNAME: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_DATABASE: string;
    TYPEORM_PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  }
}
