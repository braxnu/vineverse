const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose
// const UserModel = require('./user')

module.exports = model('Product', new Schema({
  name: String,
}), 'product')


