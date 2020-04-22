exports.me = (req, res) => {
  res.send({ balance: 1000 })
}

exports.stock = (req, res) => {
  res.send([
    { name: 'Marchew', quantity: 200 },
    { name: 'Przenica', quantity: 500 }
  ])
}