const express = require('express')
const apiController = require('../controllers/apiController')
const orderController = require('../controllers/orders')

const router = express.Router()

router.get('/me', apiController.me)
router.get('/stock', apiController.stock)
router.get('/prices', apiController.prices)

router.get('/orders', orderController.getList)

module.exports = router
