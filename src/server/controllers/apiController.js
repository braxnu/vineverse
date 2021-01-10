exports.me = (req, res) => {
  res.send({ balance: 1000, username: 'Zenon'})
}

exports.stock = (req, res) => {
  res.send([
    { name: 'Marchew', quantity: 200 },
    { name: 'Pszenica', quantity: 500 },
  ])
}

exports.prices = (req, res) => {
  res.send([
    { name: 'Marchew', price: 20 },
    { name: 'Pszenica', price: 50 }
  ])
}
