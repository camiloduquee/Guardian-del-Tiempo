import app from './app'
import { sequelize, models } from './database/database'
import { PORT } from './utils/config'
import dotenv from 'dotenv'

dotenv.config()

async function validateConnection() {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos exitosa');

      if (process.env.NODE_ENV === 'development') {
        await sequelize.sync({ force: true })

        // Inicializo la tabla de roles
        await models.Roles.bulkCreate([
          {  rol: 'Freelance' },
          {  rol: 'Client' },
        ]);

        console.log('Base de datos sincronizada y tablas recreadas en desarrollo')
      } else {
        // In production, just ensure the tables are in sync
        await sequelize.sync();
        console.log('Base de datos sincronizada');
      }
      break

    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error);
      retries += 1;
      console.log(`Volviendo a conectar... (${retries}/${maxRetries})`);
      await new Promise(res => setTimeout(res, 5000)); // Wait for 5 seconds before retrying
    }
  }
  if (retries === maxRetries) {
    console.error('Max retries reached. Exiting.');
    process.exit(1);
  }
}

async function main() {
  try {
    await validateConnection()

    app.listen(PORT, () => {
      console.log(`\n Server running on port ${PORT}\n`)
    })
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`)
  }
}

main().catch((err) => console.error('Error in main function:', err))



