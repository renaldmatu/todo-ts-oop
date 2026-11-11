import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'todo_user',
  password: 'password',
  database: 'todo_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})