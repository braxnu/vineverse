const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 3000

const protect = require('./controllers/auth').protect
const api = require('./routes/api')
const auth = require('./routes/auth')

app.use('/', express.static('build'))
app.use(cookieParser())
app.use(express.json())

app.use('/api', protect, api)
app.use('/auth', auth)

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
)
