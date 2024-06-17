
import { Router } from 'express'
import { router as auth } from './auth.router'
import { router as invoice } from './invoice.router'
import { router as labels } from './labels.router'
import { router as project } from './project.router'
import { router as roles } from './roles.router'
import { router as status } from './status.router'
import { router as stopwatch } from './stopwatch.router'
import { router as task } from './task.router'
import { router as teams } from './teams.router'
import { router as timer } from './timer.router'
import { router as user } from './user.router'

// error en ruta al desplegar no toma los modulos, por el momento se hace la importación manual

const router = Router()

router.use('/api/v1/auth', auth)
router.use('/api/v1/invoice', invoice)
router.use('/api/v1/labels', labels)
router.use('/api/v1/project', project)
router.use('/api/v1/roles', roles)
router.use('/api/v1/status', status)
router.use('/api/v1/stopwatch', stopwatch)
router.use('/api/v1/task', task)
router.use('/api/v1/teams', teams)
router.use('/api/v1/timer', timer)
router.use('/api/v1/user', user)



// const PATH_ROUTER = resolve(__dirname, '../routes')

// const cleanFileName = (fileName: string) => {
//   if (typeof fileName === 'string') {
//     const file = fileName.split('.').shift()
//     return file
//   } else {
//     return ''
//   }
// }

// const importPromises = readdirSync(PATH_ROUTER)
//   .filter(
//     (fileName) => fileName !== 'index.ts' && fileName.endsWith('.router.ts')
//   )
//   .map((fileName) => import(join(PATH_ROUTER, fileName)))

// Promise.all(importPromises)
//   .then((modules) => {
//     modules.forEach((module, index) => {
//       const fileName = readdirSync(PATH_ROUTER).filter(
//         (fileName) => fileName !== 'index.ts' && fileName.endsWith('.router.ts')
//       )[index]

//       if (module && module.router) {
//         const cleanName = cleanFileName(fileName)

//         router.use(`/api/v1/${cleanName}`, module.router)

//       }
//     })
//   })
//   .catch((error) => {
//     console.error('Error al importar módulos de ruta:', error)
//   })

export { router }
