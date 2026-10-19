import express, { type Request, type Response, type NextFunction } from 'express'
import { json } from 'express'
import todoRoutes from './routes/todos.js'

const app = express()

app.use(json())
app.use('/todos', todoRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.message })
})

app.listen(3011, () => {
  console.log('Server is started at http://localhost:3011')
})