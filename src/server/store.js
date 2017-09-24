import model from '../shared/model'

const store = {
  users: model(),
  plants: model(),
  deposits: model(),
  locations: model()
}

store.users.create({
  login: 'fiu',
  password: 'fiu',
  token: 'abc'
})

store.plants.create({
  name: 'Pomidor'
})

store.deposits.create({
  userId: store.users.list()[0].id,
  plantId: store.plants.list()[0].id,
  quantity: 200
})

store.locations.create({
  userId: store.users.list()[0].id,
  plantId: store.plants.list()[0].id,
  quantity: 200
})

export default () => store
