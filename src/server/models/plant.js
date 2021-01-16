const mongoose = require('mongoose')
const { model, Schema, ObjectId } = mongoose

module.exports = model('Plant', new Schema({
  name: String,
  seedId: ObjectId,

  // types of products that can be harvested from this
  // type of plant
  crops: [
    {
      // how much crop from 1 unit of seed
      ratio: Number,

      productId: ObjectId,
    }
  ],
}), 'plant')
