import test from 'ava'
import getModel from '../../src/shared/model'

let model

test.beforeEach(() => {
  model = getModel()
})

test('list method lists stored records', t => {
  t.true(Array.isArray(model.list()))
})

test('create method creates a record', t => {
  const item = {}

  model.create(item)

  t.is(model.list()[0], item)
})

test('new instance starts with empty list', t => {
  t.is(model.list().length, 0)
})

test('created records are added to the collection', t => {
  model.create({})
  model.create({})

  t.is(model.list().length, 2)
})

test('list method uses params to filter records', t => {
  model.create({color: 'red'})
  model.create({color: 'green'})
  model.create({color: 'green'})
  model.create({color: 'yellow'})

  t.is(model.list({color: 'red'}).length, 1)
  t.is(model.list({color: 'green'}).length, 2)
  t.is(model.list({color: 'yellow'}).length, 1)
  t.is(model.list({color: 'blue'}).length, 0)
})

test('assigns unique id to every created record', t => {
  model.create({})

  t.is(model.list()[0].id, 1)
})
