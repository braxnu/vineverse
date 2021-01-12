const userDb = [
  {id: 2, login: 'braxnu@gmail.com', password: 'Tokyo'},
]

exports.protect = (req, res, next) => {
  const token = req.cookies.token

  if (token) {
    const user = userDb.find(u => u.token === token)

    if (user) {
      req.user = user
      next()
      return
    }
  }

  res.sendStatus(401)
}

exports.userDb = userDb

exports.auth = (req, res) => {
  const { login, password } = req.body

  const user = userDb.find(u =>
    u.login === login &&
    u.password === password
  )

  if (user) {
    const token = Math.random().toString(30)

    user.token = token
    res.cookie('token', token, { maxAge: 1000 * 3600, httpOnly: true })
    res.sendStatus(200)
  } else {
    res.sendStatus(401)
  }
}
