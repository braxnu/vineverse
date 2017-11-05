import test from 'ava'
import Plantation from '../../src/shared/plantation'
import {
  realSecondsToGameDays,
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
  const plantation = new Plantation({
    date: 0,
    maxAge: 20,
    harvestTime: 5
  })

  t.is(plantation.isAlive(0), true)
  t.is(plantation.isAlive(gtr(20)), true)
  t.is(plantation.isAlive(gtr(20.1)), false)
})

test('becomes harvestable at specified age', t => {
  const pl = new Plantation({
    date: 0,
    maxAge: 20,
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
    maxAge: 20,
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
    maxAge: 40,
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
