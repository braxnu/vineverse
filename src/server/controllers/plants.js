const ProductModel = require('../models/product')
const PlantModel = require('../models/plant')
const { Types: { ObjectId } } = require('mongoose')

const productMap = {}

const getProductObj = async id => {
  if (!productMap[id]) {
    productMap[id] = (
      await ProductModel.findById(ObjectId(id)).exec()
    ).toObject()
  }

  return productMap[id]
}

const fillList = async () => {
  const result = (
    await PlantModel.find({}).exec()
  ).map(d => d.toObject())

  for (let i = 0; i < result.length; i++) {
    result[i].seed = await getProductObj(result[i].seedId)

    const crops = result[i].crops

    for (let j = 0; j < crops.length; j++) {
      crops[j].product = await getProductObj(crops[j].productId)
    }
  }

  return result
}

let list

exports.getList = async (req, res) => {
  if (!list) {
    list = await fillList()
  }

  res.send(list)
}
