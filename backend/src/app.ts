import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { router } from './routes'
import { isApiKey } from './middlewares/apiKey.middleware'
import { excludeRoutes } from './utils/helpers'
import cookieParser from 'cookie-parser'
import { corsOptions } from './utils/config'


import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// CDN CSS

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.disable('x-powered-by')

// Routes
app.get('/', (_, res) => {
  res.send('---Server OK !')
})

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "https://guardiandeltiempo-server.vercel.app/",
        description: "My API Documentation",
      },
    ],
  },
  // This is to call all the file
  apis: ["src/**/*.js"],
};

const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(
  "/api/v1/docs",
  swaggerUI.serve,
  swaggerUI.setup(specs)
);

const routesWithoutApiKey = ['/api/v1/docs', '/api/docs', '/']
app.use(excludeRoutes(routesWithoutApiKey, isApiKey))
app.use(router)

app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Unhandled error:', err)
  res.status(500).send('Something broke!')
})
export default app
