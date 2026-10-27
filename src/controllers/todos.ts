import { type Request, type Response, type NextFunction } from 'express'
import { Todo } from '../models/todo.js'

const todos: Todo[] = []

export const createTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = (req.body as { task: string }).task
    const newTodo = new Todo(Math.random().toString(), task)
    todos.push(newTodo)

    res.status(201).json({
      message: 'Created new todo',
      createdTask: newTodo
    })
  } catch (error) {
    console.log(error)
  }
}

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
  res.json({ todos: todos })
}