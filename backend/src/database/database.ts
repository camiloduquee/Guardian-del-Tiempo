import { Sequelize } from 'sequelize'
import { DATABASE_URL, DATABASE_CONFIG } from '../utils/config'
// import { PostgresDialect } from '@sequelize/postgres';

export const sequelize = new Sequelize(
    DATABASE_CONFIG.database,
    DATABASE_CONFIG.user,
    DATABASE_CONFIG.password,
    {
      host: DATABASE_CONFIG.host,
      port: Number(DATABASE_CONFIG.port),
      dialect: DATABASE_CONFIG.dialect,
      
    }
  );


