const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const emailValidator = require('email-validator')
const { User } = require('./models')

const hashPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const checkPassword = (password, hash) =>
  bcrypt.compareSync(password, hash)

const getToken = salt => hashPassword(
  salt +
  Math.random().toString(32) +
  Math.random().toString(32) +
  Math.random().toString(32) +
  Date.now()
)

const protect = (req, res, next) => {
  if (!req.user) {
    res.status(401).send('please log in')
    return
  }

  next()
}

const preparePassport = ({User}) => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username }).exec()

        if (!user || !checkPassword(password, user.password)) {
          return done(null, false)
        }

        user.token = getToken()
        await user.save()

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user.token)
  })

  passport.deserializeUser(function (token, done) {
    User.findOne({ token }, function (err, user) {
      done(err, user)
    })
  })

  return passport
}

const registerUser = async ({username = '', password = ''} = {}) => {
  if (password.length < 8) {
    throw new Error('password too weak')
  }

  if (!emailValidator.validate(username)) {
    throw new Error('username is not email')
  }

  if (await User.findOne({ username: username }).exec()) {
    throw new Error('user exists')
  }

  await User.create({
    username: username,
    password: hashPassword(password),
  })
}

module.exports = {
  hashPassword,
  checkPassword,
  getToken,
  preparePassport,
  protect,
  registerUser,
}
