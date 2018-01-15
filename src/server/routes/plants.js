import express from 'express'

export default config => {
  const router = express.Router()
  const { plants } = config.store

  router.get('/', (req, res) => {
    res.send(plants.list())
  })

  return router
}
