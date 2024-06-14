import { Sequelize } from 'sequelize'
import { DATABASE_CONFIG } from '../utils/config'
import * as pg from 'pg';

export const sequelize = new Sequelize(
    DATABASE_CONFIG.database,
    DATABASE_CONFIG.user,
    DATABASE_CONFIG.password,
    {
      host: DATABASE_CONFIG.host,
      port: Number(DATABASE_CONFIG.port),
      dialect: 'postgres',
      dialectModule: pg
      
    }
  );

 


