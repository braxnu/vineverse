import express from 'express'

export default config => {
  const router = express.Router()
  const { deposits, plants } = config.store

  router.get('/', (req, res) => {
    const { id } = res.locals.user

    res.send(deposits.list({
      userId: id
    }))
  })

  return router
}
