import express from 'express'
import usersRouter from './routes/users'
import plantsRouter from './routes/plants'
import depositsRouter from './routes/deposits'
import cookieParser from 'cookie-parser'
import { json } from 'body-parser'
import { setUser, protect } from './auth'
import { login } from './routes/auth'
import getStore from './store'

const app = express()
const store = getStore()

app.use(express.static('dist/assets'))
app.use(json())
app.use(cookieParser())
app.use(setUser({store}))

app.post('/api/login', login({store}))
app.use('/api/users', protect, usersRouter({store}))
app.use('/api/plants', protect, plantsRouter({store}))
app.use('/api/deposits', protect, depositsRouter({store}))

app.use((req, res) => res.status(404).end())

app.use((err, req, res, next) => {
  console.log(err.message)
  console.log(err.stack)

  res.status(500).send({
    message: err.message
  })
})

app.listen(4000, () => console.log('you talk!'))
