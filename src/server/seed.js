const ProductModel = require('./models/product')
const UserModel = require('./models/user')
const StockModel = require('./models/stock')
const OrderModel = require('./models/order')
const PlantModel = require('./models/plant')

const rand = arr => arr[Math.floor(Math.random() * arr.length)]

const seed = async () => {
  const products = [
    'Jabłko',
    'Sadzonka jabłoni',
    'Gruszka',
    'Sadzonka gruszy',
    'Marchew',
    'Nasiona marchwi',
    'Chmiel',
    'Nasiona chmielu',
    'Banan',
    'Sadzonka bananowca',
    'Pszenica',
    'Nasiona pszenicy',
    'Ryż',
    'Awokado',
    'Pestka awokado',
    'Czarna porzeczka',
    'Nasiona czarnej porzeczka',
    'Agrest',
    'Sadzonka agrestu',
    'Burak czerwony',
    'Nasiona buraka czerwonego',
  ]

  for (let i = 0; i < products.length; i++) {
    products[i] = await ProductModel.findOneAndUpdate(
      { name: products[i] },
      { $set: { name: products[i] } },
      { upsert: true }
    ).exec()
  }

  const productMap = products.reduce((acc, p) => ({
    ...acc,
    [p.name]: p,
  }), {})

  const plants = [
    ['Sad jabłkowy', 'Sadzonka jabłoni', [
      ['Jabłko', 180],
      ['Sadzonka jabłoni', 2],
    ]],
    ['Sad gruszowy', 'Sadzonka gruszy', [
      ['Gruszka', 120],
      ['Sadzonka gruszy', 2],
    ]],
    // ['Sadzonka jabłoni', 'Sadzonka jabłoni',],
    // ['Gruszka', 'Sadzonka gruszy',],
    // ['Sadzonka gruszy', 'Sadzonka gruszy',],
    // ['Marchew', 'Nasiona marchwi',],
    // ['Chmiel', 'Nasiona chmielu',],
    // ['Banan', 'Sadzonka bananowca',],
    // ['Sadzonka bananowca', 'Sadzonka bananowca',],
    // ['Pszenica', 'Pszenica',],
    // ['Ryż', 'Ryż',],
    // ['Awokado', 'Pestka awokado',],
    // ['Czarna porzeczka', 'Nasiona czarnej porzeczka',],
    // ['Agrest', 'Sadzonka agrestu',],
    // ['Burak czerwony', 'Nasiona buraka czerwonego',],
  ]

  // await PlantModel.deleteMany()

  for (let i = 0; i < plants.length; i++) {
    const [name, seedName, crops] = plants[i]

    const plant = {
      name,
      seedId: productMap[seedName].id,
      crops: crops.map(c => ({
        productId: productMap[c[0]].id,
        ratio: c[1],
      })),
    }

    // cl(plant)

    await PlantModel.findOneAndUpdate(
      { name },
      { $set: plant },
      { upsert: true }
    ).exec()
  }

  const users = await UserModel.find().exec()

  await StockModel.deleteMany()

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < products.length; j++) {
      const stock = new StockModel({
        ownerId: users[i].id,
        product: products[j],
        quantity: Math.floor(Math.random() * 100) * 10 || 10,
      })

      await stock.save()
    }
  }

  await OrderModel.deleteMany()

  for (let i = 0; i < 10; i++) {
    const order = new OrderModel({
      createdDate: new Date(),
      ownerId: rand(users).id,
      side: rand(['buy', 'sell']),
      product: rand(products),
      quantity: Math.ceil(Math.random() * 50) * 100,
      price: Number((Math.ceil(Math.random() * 1000) / 100).toFixed(2)),
      public: true,
    })

    await order.save()
  }
}

module.exports = seed
