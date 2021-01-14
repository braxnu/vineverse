const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose
const Product = require('./product')

module.exports = model('Stock', new Schema({
  ownerId: ObjectId,
  product: Product.schema,
  quantity: Number,
}), 'stock')


