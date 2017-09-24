import express from 'express'

export default config => {
  const router = express.Router()
  const { plants } = config.store

  router.get('/', (req, res) => {
    console.log(req.query)
    res.send(plants.list())
  })

  return router
}
