import { Router } from 'express'
import { validateJWT } from '../middlewares/validateJWT.middleware'
import { authenticateToken } from '../middlewares/authApiKey.middleware'
import {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  disableTask,
  searchTasks,
  deleteTask,
  getAllTasksProjectId
} from '../controllers/task.controller'

const router = Router()

router.post('/', validateJWT, createTask)
router.get('/', getAllTasks)
router.get('/project/:project_uuid',authenticateToken, getAllTasksProjectId)
router.get('/search/:name', searchTasks)
router.get('/:id', getTaskById)
router.patch('/:id', validateJWT, updateTask)
router.patch('/disable/:id', validateJWT, disableTask)
router.delete('/:id', validateJWT, deleteTask)

export { router }
