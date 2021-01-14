const mongoose = require('mongoose')
const { async } = require('regenerator-runtime')
const StockModel = require('../models/stock')
const UserModel = require('../models/user')
const { model, Schema, ObjectId } = mongoose

exports.me = async (req, res) => {
  res.send(req.user)
}

exports.stock = async (req, res) => {
  const list = (
    await StockModel.find({
      ownerId: req.user.id,
    }).exec()
  )
    .map(d => d.toObject())

  res.send(list)
}

exports.prices = (req, res) => {
  res.send([
    { name: 'Marchew', price: 20 },
    { name: 'Pszenica', price: 50 }
  ])
}
