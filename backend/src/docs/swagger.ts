import fs from 'fs'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'
import { Request, Response } from '../utils/types'
import { type Router } from 'express'


const CSS_URL =
  "https://cdn.jsdelivr.net/npm/swagger-ui-express@5.0.1/index.min.js";

const filePath = path.resolve(__dirname, '../docs/swagger.yaml')

if (!fs.existsSync(filePath)) {
  console.log(`El archivo no funciona: ${filePath}`);
} else {
  console.error(`Swagger ruta del archivo: ${filePath}`);
}
console.log(filePath)
const file = fs.readFileSync(filePath, 'utf8')

const swaggerYaml = YAML.parse(file);

export const swaggerDocs = (app: Router) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml, { customCssUrl: CSS_URL }))
  app.get('/api/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerYaml)
  })

  console.log(`📄 Docs available at https://guardiandeltiempo-server.vercel.app/api/docs`)
}
