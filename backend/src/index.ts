// import app from './app'
// import { sequelize } from './database/database'
// import { PORT } from './utils/config'
// // import { swaggerDocs } from './docs/swagger'

// async function main() {
//   try {
//     await sequelize.authenticate()
//     console.log('Successful connection to the database')
//     app.listen(PORT, () => {
//       console.log(`\n🚀 Server running on port ${PORT}\n`)
//       // swaggerDocs(app, PORT)
//     })
//   } catch (error) {
//     console.log(`Unable to connect to the database: ${error}`)
//   }
// }

// main().catch((err) => console.error('Error in main function:', err))

import express from 'express';

const app = express();

// Ruta básica para verificar el funcionamiento del backend
app.get('/', (_:any, res:any) => {
  res.send('El backend está funcionando correctamente y puede procesar solicitudes.');
});

app.listen(3000, () => {
  console.log(`\n🚀 Server running on port 3000\n`);
  
});

