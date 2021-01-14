const UserModel = require('../models').User

const authMap = {}

exports.protect = (req, res, next) => {
  const token = req.cookies.token

  if (token) {
    const user = authMap[token]

    if (user) {
      req.user = user
      next()
      return
    }
  }

  res.sendStatus(401)
}

exports.auth = async (req, res) => {
  const { login, password } = req.body

  const userDoc = await UserModel.findOne({
    login,
    password,
  }).exec()

  if (userDoc) {
    const token = Math.random().toString(30)

    authMap[token] = userDoc
    res.cookie('token', token, { maxAge: 1000 * 3600, httpOnly: true })
    res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }
}

exports.register = async (req, res) => {
  const { login, password } = req.body

  const existingUserDoc = await UserModel.findOne({
    login,
  }).exec()

  if (existingUserDoc) {
    res.status(409).send({
      error: 'user exists'
    })

    return
  }

  if (!login || !password) {
    res.status(409).send({
      error: 'bad credentials'
    })

    return
  }

  await UserModel.create({
    login,
    password,
  })

  res.sendStatus(200)
}
