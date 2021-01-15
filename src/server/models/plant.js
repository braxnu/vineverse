const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose

module.exports = model('Plant', new Schema({
  name: String,
  seedId: ObjectId,
  cropId: ObjectId,

  // how much crop from 1 unit of seed
  ratio: Number,
}), 'plant')
