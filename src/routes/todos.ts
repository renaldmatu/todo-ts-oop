import { Router } from 'express'
import { createTodo, getTodos } from '../controllers/todos.js'

const router = Router()

router.post('/', createTodo)
router.get('/', getTodos)

router.patch('/:id', (req, res) => {
  res.send('OK')
})

router.delete('/:id', (req, res) => {
  res.send('OK')
})

export default router