const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const api = require('./routes/api')
const { User } = require('./models')
const config = require('../../config')
const { preparePassport, protect, registerUser } = require('./auth')
const app = express()
const PORT = process.env.PORT || 3000
const passport = preparePassport({User})

app.use('/', express.static('build'))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.session.secret,
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', protect, api)

app.post('/login/local', passport.authenticate('local'), (req, res) => {
  res.send({username: req.user.username})
})

app.post('/register', async (req, res) => {
  try {
    await registerUser(req.body)
    res.send()
  } catch (err) {
    res.status(400)
    res.send({error: err.message})
  }
})

app.post('/logout', (req, res) => {
  req.logout()
  res.send()
})

;(async () => {
  app.locals.db = await mongoose.connect(config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
})()
