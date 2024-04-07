import { ConnectionOptions } from 'typeorm';

const type: string = process.env.MYSQLDB_TYPE || 'mysql';

const validTypes: string[] = ['mysql', 'mariadb', 'postgres', 'cockroachdb', 'sqlite', 'mssql', 'sap', 'oracle', 'cordova', 'nativescript', 'react-native', 'sqljs', 'mongodb', 'aurora-data-api', 'aurora-data-api-pg', 'expo', 'better-sqlite3', 'capacitor'];
if (!validTypes.includes(type)) {
  throw new Error(`Tipo de banco de dados '${type}' não é suportado.`);
}

const connectionOptions: ConnectionOptions = {
  type: type as any,
  host: process.env.MYSQLDB_HOST || 'localhost',
  port: Number(process.env.MYSQLDB_PORT || 3306),
  username: process.env.MYSQLDB_USER || 'root',
  password: process.env.MYSQLDB_PASSWORD || 'senha_root_123',
  database: process.env.MYSQLDB_DATABASE || 'wefit',
  synchronize: true,
  logging: true,
  entities: [
    'src/modules/**/entities/**/*.ts'
  ],
};

export = connectionOptions;
