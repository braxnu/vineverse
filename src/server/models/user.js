const mongoose = require('mongoose')
const { model, Schema } = mongoose

module.exports = model('User', new Schema({
  name: String,
  login: String,
  password: String,
  npc: Boolean,
  balance: Number,
  token: String,
}), 'user')


