const mongoose = require('mongoose')
const { model, Schema } = mongoose
// const UserModel = require('./user')

module.exports = model('Product', new Schema({
  name: String,
}), 'product')


