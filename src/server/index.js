import express from 'express'
import usersRoute from './routes/users'
import model from '../shared/model'

const app = express()

const store = {
  users: model()
}

app.use(express.static('dist/assets'))
app.use('/api/users', usersRoute({store}))

app.use((req, res) => res.status(404).end())

app.use((err, req, res, next) => {
  console.log(err.message)
  console.log(err.stack)

  res.status(500).send({
    message: err.message
  })
})

app.listen(4000, () => console.log('you talk!'))
