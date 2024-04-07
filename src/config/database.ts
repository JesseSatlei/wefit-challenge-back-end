import { createConnection, ConnectionOptions } from 'typeorm';

export async function connectDatabase(connectionOptions: ConnectionOptions) {
  try {
    await createConnection(connectionOptions);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
