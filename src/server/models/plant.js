const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose

module.exports = model('Plant', new Schema({
  name: String,
  seedId: ObjectId,
  cropId: ObjectId,
}), 'plant')
