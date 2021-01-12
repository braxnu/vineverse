const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model('User', new Schema({
  login: String,
  password: String,
}), 'user')


