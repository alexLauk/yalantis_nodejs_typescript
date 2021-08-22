import config from '../../src/typeorm/config/ormconfig';
import { Connection, createConnection, getConnection, getConnectionManager } from 'typeorm';

export default class DatabaseUtils {
  private getConnection;
  private createConnection;
  private connectionManager;
  public user: string;
  
  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR: Test utils only for tests');
    }
    this.getConnection = getConnection;
    this.createConnection = createConnection;
    this.connectionManager = getConnectionManager;
    this.user = 'user';
  }

  async dbCreateConnection(): Promise<Connection | null> {
    try {
      if (!this.connectionManager().has('default')) {
        await this.createConnection(config);
      }
    } catch (error) {
      throw new Error(`ERROR: Create cconnection: ${error}`);
    }

    return null;
  }

  async dropUserSchema() {
    try {
      const repository = await this.getConnection().getRepository(this.user);
      await repository.query(`DROP TABLE "${this.user}";`);
    } catch (error) {
      throw new Error(`ERROR: Drop user schema: ${error}`);
    }

    await this.getConnection().close();
  }
  
  async createUserSchema() {
    try {
      const repository = this.getConnection().getRepository(this.user);
      await repository.query(
        `CREATE TABLE "user" (
          "id" SERIAL NOT NULL, 
          "email" character varying NOT NULL, 
          "password" character varying NOT NULL, 
          "firstName" character varying NOT NULL, 
          "lastName" character varying NOT NULL, 
          "avatar" character varying NOT NULL,
          "enabled" boolean NOT NULL DEFAULT true, 
          "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
          CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
          CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )`
      );
    } catch (error) {
      throw new Error(`ERROR: Create user schema: ${error}`);
    }
  }
}
