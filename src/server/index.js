import express from 'express'
import usersRoute from './routes/users'
import model from '../shared/model'
import cookieParser from 'cookie-parser'

const app = express()

const store = {
  users: model()
}

const protect = (req, res, next) => {
  if (!res.locals.user) {
    res.status(301).end()
    return
  }

  next()
}

app.use(express.static('dist/assets'))
app.use(cookieParser())

app.use((req, res, next) => {
  const { token } = req.cookies

  res.locals.user = token && store.users.list({token})[0]
  next()
})

app.use('/api/users', protect, usersRoute({store}))

app.use((req, res) => res.status(404).end())

app.use((err, req, res, next) => {
  console.log(err.message)
  console.log(err.stack)

  res.status(500).send({
    message: err.message
  })
})

app.listen(4000, () => console.log('you talk!'))
