const express = require('express')
const app = express()

app.use(express.static('dist/client'))

app.use((err, req, res, next) => {
  console.log(err.message)
  console.log(err.stack)

  res.status(500).send({
    message: err.message
  })
})

app.listen(4000, () => console.log('you talk!'))
