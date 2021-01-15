const StockModel = require('../models/stock')

exports.stock = async (req, res) => {
  const list = (
    await StockModel.find({
      ownerId: req.user.id,
    }).exec()
  )
    .map(d => d.toObject())

  res.send(list)
}
