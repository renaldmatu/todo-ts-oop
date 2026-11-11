import { type Request, type Response, type NextFunction } from 'express'
import { type ResultSetHeader, type RowDataPacket } from 'mysql2'
import { pool } from '../db.js'

export class TodoController {
  // 1. Kõikide ülesannete lugemine
  getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM todos')
      res.status(200).json({ todos: rows })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Andmebaasi viga ülesannete lugemisel' })
    }
  }

  // 2. Ühe ülesande lugemine ID järgi
  getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = req.params.id
      const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM todos WHERE id = ?', [todoId])

      if (rows.length === 0) {
        return res.status(404).json({ message: 'Sellise ID-ga ülesannet ei leitud' })
      }

      res.status(200).json({ todo: rows[0] })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Andmebaasi viga ülesande lugemisel' })
    }
  }

  // 3. Uue ülesande lisamine
  createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = (req.body as { task: string }).task
      if (!task) {
        return res.status(400).json({ message: 'Väli "task" on kohustuslik' })
      }

      const [result] = await pool.query<ResultSetHeader>(
        'INSERT INTO todos (task) VALUES (?)',
        [task]
      )

      res.status(201).json({
        message: 'Created new todo',
        createdTask: {
          id: result.insertId,
          task: task
        }
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Andmebaasi viga ülesande lisamisel' })
    }
  }

  // 4. Ülesande muutmine
  updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = req.params.id
      const updatedTask = (req.body as { task: string }).task

      if (!updatedTask) {
        return res.status(400).json({ message: 'Väli "task" on kohustuslik' })
      }

      const [result] = await pool.query<ResultSetHeader>(
        'UPDATE todos SET task = ? WHERE id = ?',
        [updatedTask, todoId]
      )

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Could not find todo with such id' })
      }

      res.status(200).json({
        message: 'Todo is updated!',
        updatedTask: {
          id: Number(todoId),
          task: updatedTask
        }
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Andmebaasi viga ülesande uuendamisel' })
    }
  }

  // 5. Ühe ülesande kustutamine
  deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = req.params.id
      const [result] = await pool.query<ResultSetHeader>(
        'DELETE FROM todos WHERE id = ?',
        [todoId]
      )

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Could not find todo with such id' })
      }

      res.status(200).json({
        message: 'Todo is deleted!'
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Andmebaasi viga ülesande kustutamisel' })
    }
  }

  // 6. Kõikide ülesannete kustutamine (Iseseisev töö)
  deleteAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await pool.query('DELETE FROM todos')
      res.status(200).json({
        message: 'All todos are deleted!',
        todos: []
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Andmebaasi viga kõikide ülesannete kustutamisel' })
    }
  }
}