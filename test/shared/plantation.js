import test from 'ava'
import Plantation from '../../src/shared/plantation'
import {
  realSecondsToGameDays,
  gameDaysToRealSeconds
} from '../../src/shared/gametime'

test('has age which increases with game time', t => {
  const plantation = new Plantation({
    date: 0
  })

  t.is(plantation.getAge(0), 0)
  t.is(plantation.getAge(gameDaysToRealSeconds(15)), 15)
  t.is(plantation.getAge(gameDaysToRealSeconds(100)), 100)
})

test('has specific lifespan', t => {
  const plantation = new Plantation({
    date: 0,
    maxAge: 20
  })

  t.is(plantation.isAlive(0), true)
  t.is(plantation.isAlive(gameDaysToRealSeconds(20)), true)
  t.is(plantation.isAlive(gameDaysToRealSeconds(20.1)), false)
})
