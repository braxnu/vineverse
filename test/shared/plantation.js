import test from 'ava'
import Plantation from '../../src/shared/plantation'
import {
  realSecondsToGameDays as rtg,
  gameDaysToRealSeconds as gtr
} from '../../src/shared/gametime'

test('has age which increases with game time', t => {
  const plantation = new Plantation({
    date: 0
  })

  t.is(plantation.getAge(0), 0)
  t.is(plantation.getAge(gtr(15)), 15)
  t.is(plantation.getAge(gtr(100)), 100)
})

test('has specific lifespan', t => {
  const pl = new Plantation({
    date: 0,
    maxAge: 20
  })

  t.true(pl.isAlive(0))
  t.true(pl.isAlive(gtr(20)))
  t.false(pl.isAlive(gtr(20.1)))
})

test('may live idefinitely', t => {
  const pl = new Plantation({
    date: 0,
    maxAge: -1
  })

  t.true(pl.isAlive(gtr(0)))
  t.true(pl.isAlive(gtr(20)))
  t.true(pl.isAlive(gtr(1000 * 1000)))
})

test('becomes harvestable at specified age', t => {
  const pl = new Plantation({
    date: 0,
    firstCropAfter: 5,
    harvestTime: 5
  })

  function hasCropAt (daysAge) {
    t.true(pl.getAvailableCrop(gtr(daysAge)) > 0)
  }

  function hasNoCropAt (daysAge) {
    t.true(pl.getAvailableCrop(gtr(daysAge)) === 0)
  }

  hasNoCropAt(0)
  hasNoCropAt(4.9)
  hasCropAt(5)
})

test('is harvestable for a specified time', t => {
  const pl = new Plantation({
    date: 0,
    firstCropAfter: 5,
    harvestTime: 5
  })

  function hasCropAt (daysAge) {
    t.true(pl.getAvailableCrop(gtr(daysAge)) > 0)
  }

  function hasNoCropAt (daysAge) {
    t.true(pl.getAvailableCrop(gtr(daysAge)) === 0)
  }

  hasCropAt(4.9 + 5)
  hasNoCropAt(5 + 5)
})

test('harvest time repeats periodically', t => {
  const pl = new Plantation({
    date: 0,
    firstCropAfter: 5,
    harvestTime: 5,
    harvestEvery: 10
  })

  function hasCropAt (daysAge) {
    t.true(pl.getAvailableCrop(gtr(daysAge)) > 0)
  }

  function hasNoCropAt (daysAge) {
    t.true(pl.getAvailableCrop(gtr(daysAge)) === 0)
  }

  hasNoCropAt(4.9 + 10)
  hasCropAt(5 + 10)
  hasCropAt(5 + 10 + 4.9)
  hasNoCropAt(5 + 10 + 5)

  hasNoCropAt(4.9 + 20)
  hasCropAt(5 + 20)
  hasCropAt(5 + 20 + 4.9)
  hasNoCropAt(5 + 20 + 5)
})

test('size affects crop size', t => {
  const params = {
    date: 0,
    firstCropAfter: 5,
    harvestTime: 5
  }

  const pl1 = new Plantation({
    ...params,
    size: 1
  })

  t.is(pl1.getAvailableCrop(gtr(5)), 1)

  const pl2 = new Plantation({
    ...params,
    size: 15
  })

  t.is(pl2.getAvailableCrop(gtr(5)), 15)
})
