import { Sequelize } from 'sequelize'
import { DATABASE_CONFIG } from '../utils/config'
import * as pg from 'pg';
import path from 'path';
import fs from 'fs';

const sequelize = new Sequelize(
  DATABASE_CONFIG.database,
  DATABASE_CONFIG.user,
  DATABASE_CONFIG.password,
  {
    host: DATABASE_CONFIG.host,
    port: Number(DATABASE_CONFIG.port),
    dialect: 'postgres',
    // dialectModule: pg,
    logging: false // Deshabilita el logging de Sequelize
  }
);

const models: { [key: string]: any } = {};

// Leer todos los archivos en el directorio de modelos
const modelFiles = fs.readdirSync(path.join(__dirname, '../models')).filter(
  (file) => file.indexOf('.') !== 0 && file.slice(-3) === '.ts'
);

// Inicializar cada modelo y agregar el método getModelKeys
modelFiles.forEach((file) => {
  const model = require(path.join(__dirname, '../models', file)).default;
  const modelInstance = model(sequelize);
  // console.log(`Loading model: ${modelInstance.name}`); // Log de carga de cada modelo
  models[modelInstance.name] = modelInstance;
});

// Ejecutar las asociaciones entre los modelos si existen
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
      models[modelName].associate(models);
  }
});

export { sequelize, models };