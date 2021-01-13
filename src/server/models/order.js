const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose
// const UserModel = require('./user')
// const Product = require('./product')

module.exports = model('Order', new Schema({
  owner: ObjectId,
  direction: {type: String, enum: ['buy', 'sell']},
  productId: ObjectId,
  quantity: Number,
  price: Number,
}), 'order')


