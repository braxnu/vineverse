const express = require('express')
const router = express.Router()

router.get('/me', (req, res) => {
  res.send({ balance: 1000, username: 'Zenon' })
})

router.get('/stock', (req, res) => {
  res.send([
    { name: 'Marchew', quantity: 200 },
    { name: 'Pszenica', quantity: 500 },
  ])
})

router.get('/prices', (req, res) => {
  res.send([
    { name: 'Marchew', price: 20 },
    { name: 'Pszenica', price: 50 }
  ])
})

module.exports = router
