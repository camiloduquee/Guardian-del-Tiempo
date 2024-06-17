import fs from 'fs'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'
import { Request, Response } from '../utils/types'
import { type Router } from 'express'

// CDN ----
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.2/swagger-ui.min.css";

const filePath = path.resolve(__dirname, '../docs/swagger.yaml')

const file = fs.readFileSync(filePath, 'utf8')

const swaggerYaml = YAML.parse(file);

export const swaggerDocs = (app: Router) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL,
  }))
  app.get('/api/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerYaml)
  })

  console.log(`📄 Docs available at https://guardiandeltiempo-server.vercel.app/api/docs`)
}
