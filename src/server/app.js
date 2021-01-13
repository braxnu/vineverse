const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 3000

const protect = require('./controllers/auth').protect
const api = require('./routes/api')
const auth = require('./routes/auth')
const config = require('../../config')
const mongoose = require('mongoose')
const ProductModel = require('./models/product')

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

  const products = [
    'Jabłko',
    'Gruszka',
    'Marchew',
    'Chmiel',
    'Banan',
    'Pszenica',
    'Ryż',
    'Awokado',
    'Czarna porzeczka',
    'Agrest',
    'Burak czerwony',
  ]

  for (let i = 0; i < products.length; i++) {
    await ProductModel.updateOne(
      {name: products[i]},
      { $set: { name: products[i] }},
      {upsert: true}
    ).exec()
  }

  app.locals.productCache = (await ProductModel.find().exec())
    .map(d => d.toObject())
    .reduce((acc, p) => ({
      ...acc,
      [p._id]: p,
    }), {})

  app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`)
  )
})()
