const { Types: { ObjectId } } = require('mongoose')
const dayjs = require('dayjs')
const StockModel = require('../models/stock')
const ProductModel = require('../models/product')
const PlantModel = require('../models/plant')
const FarmModel = require('../models/farm')

const plantMap = {}

const getPlantObj = async plantId => {
  if (!plantMap[plantId]) {
    plantMap[plantId] = (
      await PlantModel.findById(plantId).exec()
    ).toObject()
  }

  return plantMap[plantId]
}

const isRipe = date => dayjs().diff(date, 'minute') > 5

exports.getList = async (req, res) => {
  const list = (
    await FarmModel.find({
      ownerId: req.user.id,
    }).exec()
  ).map(d => d.toObject())

  for (let i = 0; i < list.length; i++) {
    list[i].plant = await getPlantObj(list[i].plantId)
    list[i].isRipe = isRipe(list[i].createdDate)
  }

  res.send(list)
}

exports.create = async (req, res) => {
  const { stockId, quantity, plantId } = req.body
  const session = await StockModel.db.startSession()

  await session.startTransaction()

  const stock = await StockModel.findById(stockId).exec()

  if (stock.quantity < quantity) {
    res.status(400).send({
      error: 'not enough stock',
    })

    session.abortTransaction()
    return
  }

  await StockModel.findByIdAndUpdate(
    stockId,
    {
      $inc: {
        quantity: -1 * quantity,
      },
    }
  ).exec()

  const farm = new FarmModel({
    ownerId: req.user.id,
    plantId,
    quantity,
    createdDate: new Date(),
  })

  await farm.save()

  await session.commitTransaction()
  session.endSession()
  res.send('ok')
}

exports.harvest = async (req, res) => {
  const { farmId, cropIndex } = req.body
  const session = await StockModel.db.startSession()

  await session.startTransaction()

  const farm = await FarmModel.findById(farmId).exec()
  const plant = await PlantModel.findById(farm.plantId).exec()
  const crop = plant.crops[cropIndex]
  const product = await ProductModel.findById(crop.productId).exec()
  const quantity = Math.ceil(crop.ratio * farm.quantity)

  let stock = await StockModel.findOne({
    ownerId: req.user.id,
    product,
  }).exec()

  if (!stock) {
    stock = new StockModel({
      ownerId: req.user.id,
      product,
      quantity: 0,
    })

    await stock.save()
  }

  await StockModel.findByIdAndUpdate(
    stock.id,
    {
      $inc: {
        quantity,
      },
    }
  ).exec()

  await farm.remove()

  await session.commitTransaction()
  session.endSession()
  res.send('ok')
}
