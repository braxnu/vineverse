const express = require('express')
const config = require('../../config')
const mongoose = require('mongoose')
const api = require('./routes/api')

const app = express()
const PORT = process.env.PORT || 3000

app.use('/', express.static('build'))
app.use('/api', api)

;(async () => {
  app.locals.db = await mongoose.connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
})()
