import { realSecondsToGameDays, gameDaysToRealSeconds } from './gametime'

export default class Plantation {
  constructor ({
    date = Date.now(),
    maxAge
  }) {
    this.birthDate = date
    this.maxAge = maxAge // game days
  }

  getAge (realNow = Date.now()) {
    return realSecondsToGameDays(realNow - this.birthDate)
  }

  isAlive (realNow = Date.now()) {
    return realNow - this.birthDate <= gameDaysToRealSeconds(this.maxAge)
  }
}
