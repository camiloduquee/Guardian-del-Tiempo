import fs from 'fs'
import path from 'path' 
import swaggerUi from 'swagger-ui-express'
import yaml from 'yaml'
import { Request, Response } from '../utils/types'
import { type Router } from 'express'

const filePath = path.resolve(__dirname, '../docs/swagger.yaml')

if (!fs.existsSync(filePath)) {
  console.error(`El archivo no funciona: ${filePath}`);
} else {
  console.log(`Swagger ruta del archivo: ${filePath}`);
}

const file = fs.readFileSync(filePath, 'utf8')
const swaggerYaml = yaml.parse(file)

export const swaggerDocs = (app: Router, port: number) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml))
  app.get('/api/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerYaml)
  })

  console.log(`📄 Docs available at https://guardiandeltiempo-server.vercel.app:${port}/api/docs`)
}
