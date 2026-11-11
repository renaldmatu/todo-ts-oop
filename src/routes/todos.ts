import { Router } from 'express'
import { TodoController } from '../controllers/todos.js'

const router = Router()
const todoController = new TodoController()

router.get('/', todoController.getTodos)
router.get('/:id', todoController.getTodoById)
router.post('/', todoController.createTodo)
router.patch('/:id', todoController.updateTodo)
router.delete('/', todoController.deleteAllTodos)
router.delete('/:id', todoController.deleteTodo)

export default router