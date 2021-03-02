const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model('User', new Schema({
  username: String,
  password: String,
  token: String,
}), 'user')
