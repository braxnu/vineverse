const StockModel = require('../models/stock')
const ProductModel = require('../models/product')
const PlantModel = require('../models/plant')
const FarmModel = require('../models/farm')
const { Types: { ObjectId } } = require('mongoose')

exports.getList = async (req, res) => {
  res.send(
    (
      await FarmModel.find({
        ownerId: req.user.id,
      }).exec()
    ).map(d => d.toObject())
  )
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
