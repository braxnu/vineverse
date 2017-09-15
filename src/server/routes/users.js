import express from 'express'

export default config => {
  const router = express.Router()
  const { users } = config.store

  router.get('/', (req, res) => {
    res.send(users.list())
  })

  return router
}
