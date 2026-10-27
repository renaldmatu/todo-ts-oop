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

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.id as string
    const updatedTask = (req.body as { task: string }).task
    const todoIndex = todos.findIndex(todo => todo.id === todoId)

    if (todoIndex < 0) {
      throw new Error('Could not find todo with such id')
    }

    const updatedTodo = new Todo(todoId, updatedTask)
    todos[todoIndex] = updatedTodo

    res.status(201).json({
      message: 'Todo is updated!',
      updatedTask: updatedTodo
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    const todoId = req.params.id as string
    const todoIndex = todos.findIndex(todo => todo.id === todoId)

    if (todoIndex < 0) {
      throw new Error('Could not find todo with such id')
    }

    todos.splice(todoIndex, 1)

    res.status(201).json({
      message: 'Todo is deleted!'
    })
  } catch (error) {
    console.log(error)
  }
}