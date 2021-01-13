const mongoose = require('mongoose')
const { async } = require('regenerator-runtime')
const StockModel = require('../models/stock')
const { model, Schema, ObjectId } = mongoose

exports.me = (req, res) => {
  res.send(req.user)
}

exports.stock = async (req, res) => {
  const productCache = req.app.locals.productCache

  const list = (
    await StockModel.find({
      ownerId: req.user.id,
    }).exec()
  )
    .map(d => {
      const p = d.toObject()
      p.product = productCache[p.productId]
      return p
    })

    console.log({list})

  res.send(list)
}

exports.prices = (req, res) => {
  res.send([
    { name: 'Marchew', price: 20 },
    { name: 'Pszenica', price: 50 }
  ])
}
