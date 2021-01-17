const express = require('express')
const apiController = require('../controllers/apiController')
const orderController = require('../controllers/orders')
const plantController = require('../controllers/plants')
const farmController = require('../controllers/farms')
const productController = require('../controllers/products')

const router = express.Router()

router.get('/me', apiController.me)
router.get('/me/balance', apiController.balance)
router.get('/stock', apiController.stock)
router.get('/prices', apiController.prices)
router.get('/plants', plantController.getList)
router.get('/products', productController.list)

router.get('/farms', farmController.getList)
router.post('/farms', farmController.create)
router.post('/farms/harvest', farmController.harvest)

router.get('/orders', orderController.getList)
router.post('/orders', orderController.create)
router.post('/orders/sell', orderController.sell)
router.post('/orders/buy', orderController.buy)

module.exports = router
