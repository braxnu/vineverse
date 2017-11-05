import { realSecondsToGameDays, gameDaysToRealSeconds } from './gametime'

export default class Plantation {
  constructor ({
    date = Date.now(),
    maxAge = -1,
    firstCropAfter,
    harvestTime,
    harvestEvery = 0,
    size = 1
  }) {
    this.birthDate = date
    this.maxAge = maxAge // in game days
    this.firstCropAfter = firstCropAfter // in game days
    this.harvestTime = harvestTime // in game days
    this.harvestEvery = harvestEvery // in game days
    this.size = size
  }

  getAge (realNow = Date.now()) {
    return realSecondsToGameDays(realNow - this.birthDate)
  }

  isAlive (realNow = Date.now()) {
    return this.maxAge === -1 ||
      realNow - this.birthDate <= gameDaysToRealSeconds(this.maxAge)
  }

  getAvailableCrop (realNow = Date.now()) {
    let x = this.getAge(realNow) - this.firstCropAfter

    if (this.harvestEvery) {
      x = x % this.harvestEvery
    }

    if (x < 0 || x >= this.harvestTime) return 0

    return this.size
  }
}
