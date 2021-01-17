const ProductModel = require('../models/product')
const { Types: { ObjectId } } = require('mongoose')

let list

exports.list = async (req, res) => {
  if (!list) {
    list = (
      await ProductModel.find().exec()
    ).map(d => d.toObject())
  }

  res.send(list)
}
