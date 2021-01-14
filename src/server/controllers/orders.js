const { Types: { ObjectId } } = require('mongoose')
const UserModel = require('../models/user')
const OrderModel = require('../models/order')
const StockModel = require('../models/stock')

const userNameMap = {}

exports.getList = async (req, res) => {
  const list = (
    await OrderModel.find().exec()
  ).map(d => d.toObject())

  for (let i = 0; i < list.length; i++) {
    const o = list[i]

    if (!userNameMap[o.ownerId.toString()]) {
      userNameMap[o.ownerId] = (
        await UserModel.findOne({
          _id: o.ownerId,
        }).exec()
      ).name
    }

    o.ownerName = userNameMap[o.ownerId.toString()]
  }

  res.send(list)
}

exports.sell = async (req, res) => {
  const b = req.body
  const session = await UserModel.db.startSession()

  await session.startTransaction()

  const order = await OrderModel.findOne({
    _id: ObjectId(b.orderId),
  }).exec()

  const stock = await StockModel.findOne({
    ownerId: req.user.id,
    product: order.product,
  }).exec()

  console.log({b, order, stock })

  if (
    b.quantity > stock.quantity ||
    b.quantity > order.quantity
  ) {
    res.status(400).send({error: {message: 'asking too much'}})
    await session.abortTransaction()
    return
  }

  console.log(1)

  await OrderModel.updateOne(
    { _id: order.id },
    { $inc: { quantity: -1 * b.quantity } }
  )

  console.log(2)

  await StockModel.updateOne(
    { _id: stock.id },
    { $inc: { quantity: -1 * b.quantity } }
  )

  console.log(3, { quantity: -1 * b.quantity }, { balance: b.quantity * order.price })

  await UserModel.updateOne(
    { _id: req.user.id },
    { $inc: { balance: b.quantity * order.price } }
  )

  console.log(4)

  await session.commitTransaction()
  session.endSession()
  res.send('ok')
}
