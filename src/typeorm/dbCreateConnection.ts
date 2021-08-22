import { Connection, createConnection } from 'typeorm';

const dbCreateConnection = async (config): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
  } catch (err) {
    console.log(err);
  }
  return null;
};

export default dbCreateConnection;
