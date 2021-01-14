const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model('Product', new Schema({
  name: String,
}), 'product')
