const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose
// const UserModel = require('./user')
// const Product = require('./product')

module.exports = model('Stock', new Schema({
  ownerId: ObjectId,
  productId: ObjectId,
  quantity: Number,
}), 'stock')


