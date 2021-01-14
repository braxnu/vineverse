const express = require('express')
const apiController = require('../controllers/apiController')
const orderController = require('../controllers/orders')

const router = express.Router()

router.get('/me', apiController.me)
router.get('/me/balance', apiController.balance)
router.get('/stock', apiController.stock)
router.get('/prices', apiController.prices)

router.get('/orders', orderController.getList)
router.post('/orders/sell', orderController.sell)
router.post('/orders/buy', orderController.buy)

module.exports = router
