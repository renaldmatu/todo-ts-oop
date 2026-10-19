import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  res.send('OK')
})

router.get('/', (req, res) => {
  res.send('OK')
})

router.patch('/:id', (req, res) => {
  res.send('OK')
})

router.delete('/:id', (req, res) => {
  res.send('OK')
})

export default router