const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose

module.exports = model('Farm', new Schema({
  ownerId: ObjectId,
  plantId: ObjectId,
  quantity: Number,
  createdDate: Date,
}), 'farm')
