import fs from 'fs'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from "swagger-jsdoc";
import YAML from 'yaml'
import { Request, Response } from '../utils/types'
import { type Router } from 'express'


const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const filePath = path.resolve(__dirname, '../docs/swagger.yaml')

if (!fs.existsSync(filePath)) {
  console.log(`El archivo no funciona: ${filePath}`);
} else {
  console.error(`Swagger ruta del archivo: ${filePath}`);
}
console.log(filePath)
const file = fs.readFileSync(filePath, 'utf8')

export const rutaFile = () => { return filePath }
// const swaggerYaml = YAML.parse(file)
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

const swaggerYaml = swaggerJsDoc(options);

export const swaggerDocs = (app: Router) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml, { customCss: CSS_URL }))
  // app.get('/api/docs.json', (_req: Request, res: Response) => {
  //   res.setHeader('Content-Type', 'application/json')
  //   res.send(swaggerYaml)
  // })

  console.log(`📄 Docs available at https://guardiandeltiempo-server.vercel.app/api/docs`)
}



// app.use(
//   "/api/v1/docs",
//   swaggerUI.serve,
//   swaggerUI.setup(specs, { customCssUrl: CSS_URL })
// );