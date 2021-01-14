const UserModel = require('../models/user')
const OrderModel = require('../models/order')

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
