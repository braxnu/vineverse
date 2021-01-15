const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose
const PlantModel = require('./plant')

module.exports = model('Farm', new Schema({
  ownerId: ObjectId,
  quantity: Number,
  createdDate: Date,
  plant: PlantModel.schema,
}), 'farm')
