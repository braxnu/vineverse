const { Types: { ObjectId } } = require('mongoose')
const dayjs = require('dayjs')
const UserModel = require('../models/user')
const OrderModel = require('../models/order')
const StockModel = require('../models/stock')

const userNameMap = {}
const MINUTE = 60 * 1000

const refillDepletedOrders = async () => {
  const oneHourAgo = dayjs().subtract(1, 'h').toDate()

  const list = await OrderModel.find({
    $or: [
      {
        quantity: 0,
      },
      {
        createdDate: { $exists: false },
      },
      {
        createdDate: { $lt: oneHourAgo },
      },
    ],
  }).exec()

  for (let i = 0; i < list.length; i++) {
    const order = list[i]

    order.quantity = Math.ceil(Math.random() * 50) * 100
    order.price = Number((Math.ceil(Math.random() * 1000) / 100).toFixed(2))
    order.createdDate = new Date()
    await order.save()
  }

  console.log(new Date(), list.length + ' orders refilled')
  setTimeout(refillDepletedOrders, 1 * MINUTE)
}

setTimeout(refillDepletedOrders, 1 * MINUTE)

exports.getList = async (req, res) => {
  const list = (
    await OrderModel.find({
      quantity: {$gt: 0},
    }).exec()
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

  if (
    b.quantity > stock.quantity ||
    b.quantity > order.quantity
  ) {
    res.status(400).send({error: {message: 'asking too much'}})
    await session.abortTransaction()
    return
  }

  await OrderModel.updateOne(
    { _id: order.id },
    { $inc: { quantity: -1 * b.quantity } }
  )

  await StockModel.updateOne(
    { _id: stock.id },
    { $inc: { quantity: -1 * b.quantity } }
  )

  await UserModel.updateOne(
    { _id: req.user.id },
    { $inc: { balance: b.quantity * order.price } }
  )

  await session.commitTransaction()
  session.endSession()
  res.send('ok')
}

exports.buy = async (req, res) => {
  const b = req.body
  const session = await UserModel.db.startSession()

  await session.startTransaction()

  const user = await UserModel.findById(req.user.id).exec()

  const order = await OrderModel.findOne({
    _id: ObjectId(b.orderId),
  }).exec()

  const stock = await StockModel.findOne({
    ownerId: req.user.id,
    product: order.product,
  }).exec()

  const amount = b.quantity * order.price

  if (
    user.balance < amount ||
    b.quantity > order.quantity
  ) {
    res.status(400).send({error: {message: 'asking too much'}})
    await session.abortTransaction()
    return
  }

  await OrderModel.updateOne(
    { _id: order.id },
    { $inc: { quantity: -1 * b.quantity } }
  )

  await StockModel.updateOne(
    { _id: stock.id },
    { $inc: { quantity: b.quantity } }
  )

  await UserModel.updateOne(
    { _id: req.user.id },
    { $inc: { balance: -1 * b.quantity * order.price } }
  )

  await session.commitTransaction()
  session.endSession()
  res.send('ok')
}
