const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 3000

const protect = require('./controllers/auth').protect
const api = require('./routes/api')
const auth = require('./routes/auth')
const config = require('../../config')
const mongoose = require('mongoose')
const seed = require('./seed')
const { Types: { ObjectId } } = require('mongoose')

global.ObjectId = ObjectId
global.cl = console.log

require('./models')

app.use('/', express.static('build'))
app.use(cookieParser())
app.use(express.json())

app.use('/api', protect, api)
app.use('/auth', auth)

;(async () => {
  app.locals.db = await mongoose.connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  await seed()

  app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`)
  )
})()
