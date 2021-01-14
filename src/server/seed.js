const ProductModel = require('./models/product')
const UserModel = require('./models/user')
const StockModel = require('./models/stock')
const OrderModel = require('./models/order')

const rand = arr => arr[Math.floor(Math.random() * arr.length)]

const seed = async () => {
  const products = [
    'Jabłko',
    'Gruszka',
    'Marchew',
    'Chmiel',
    'Banan',
    'Pszenica',
    'Ryż',
    'Awokado',
    'Czarna porzeczka',
    'Agrest',
    'Burak czerwony',
  ]

  for (let i = 0; i < products.length; i++) {
    products[i] = await ProductModel.findOneAndUpdate(
      { name: products[i] },
      { $set: { name: products[i] } },
      { upsert: true }
    ).exec()
  }

  const users = await UserModel.find().exec()

  await StockModel.deleteMany()

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 20; j++) {
      const stock = new StockModel({
        ownerId: rand(users).id,
        product: rand(products),
        quantity: Math.floor(Math.random() * 100) * 10 || 10,
      })

      await stock.save()
    }
  }

  await OrderModel.deleteMany()

  for (let i = 0; i < 100; i++) {
    const order = new OrderModel({
      ownerId: rand(users).id,
      side: rand(['buy', 'sell']),
      product: rand(products),
      quantity: Math.ceil(Math.random() * 50) * 100,
      price: Number((Math.ceil(Math.random() * 1000) / 100).toFixed(2)),
    })

    await order.save()
  }
}

module.exports = seed
