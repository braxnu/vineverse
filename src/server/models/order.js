const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose
const ProductModel = require('./product')

module.exports = model('Order', new Schema({
  ownerId: ObjectId,
  side: {type: String, enum: ['buy', 'sell']},
  product: ProductModel.schema,
  quantity: Number,

  // per unit
  price: Number,
}), 'order')
