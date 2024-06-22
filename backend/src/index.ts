import app from './app'
import { sequelize } from './database/database'
import { PORT } from './utils/config'

async function validateConnection() {
  const maxRetries = 5;
  let retries = 0;

  while(retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Successful connection to the database');
      break; // Exit loop if connection is successful
    } catch (error) {
      console.error(`Unable to connect to the database: ${error}`);
      retries += 1;
      console.log(`Retrying to connect... (${retries}/${maxRetries})`);
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



