// import cors from 'cors'
// import express, { Request, Response, NextFunction } from 'express'
// import morgan from 'morgan'
// import { router } from './routes'
// import { isApiKey } from './middlewares/apiKey.middleware'
// import { excludeRoutes } from './utils/helpers'
// import cookieParser from 'cookie-parser'
// import { corsOptions } from './utils/config'
// const app = express()

// // Middlewares
// app.use(express.json())
// app.use(cors(corsOptions))
// app.use(morgan('dev'))
// app.use(cookieParser())
// app.disable('x-powered-by')

// // Routes
// app.get('/', (_, res) => {
//   res.send('Hello World!')
// })

// const routesWithoutApiKey = ['/api/v1/docs', '/api/docs', '/']
// app.use(excludeRoutes(routesWithoutApiKey, isApiKey))
// app.use(router)

// app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
//   console.error('Unhandled error:', err)
//   res.status(500).send('Something broke!')
// })

// export default app
import express from 'express';

const app = express();

// Ruta básica para verificar el funcionamiento del backend
app.get('/', (_, res) => {
  res.send('El backend está funcionando correctamente y puede procesar solicitudes.');
});

export default app;
