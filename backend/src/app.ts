import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { router } from './routes'
import { isApiKey } from './middlewares/apiKey.middleware'
import { excludeRoutes } from './utils/helpers'
import cookieParser from 'cookie-parser'
import { corsOptions } from './utils/config'
import { swaggerDocs } from './docs/swagger'


const app = express()

// Middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(cookieParser())
app.disable('x-powered-by')

// Routes
app.get('/', (_, res) => {
  res.send('---Server OK !')
})
// Swagger app documentación
swaggerDocs(app)

const routesWithoutApiKey = ['/api/v1/docs', '/api/docs', '/']
app.use(excludeRoutes(routesWithoutApiKey, isApiKey))
app.use(router)

app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Unhandled error:', err)
  res.status(500).send('Something broke!')
})
export default app
