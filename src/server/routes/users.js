import express from 'express'

export default config => {
  const router = express.Router()
  const { users } = config.store

  router.get('/', (req, res) => {
    res.send(users.list())
  })

  router.get('/me', (req, res) => {
    const { token } = req.cookies

    res.send(users.list({ token })[0])
  })

  return router
}
