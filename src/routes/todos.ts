import { Router } from 'express'
import { TodoController } from '../controllers/todos.js'

const router = Router()
const todoController = new TodoController()

router.post('/', todoController.createTodo)
router.get('/', todoController.getTodos)
router.patch('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

export default router