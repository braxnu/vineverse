const express = require('express')
const { auth, register } = require('../controllers/auth')

const router = express.Router()

router.post('/', auth)
router.post('/register', register)

module.exports = router
