import { realSecondsToGameDays, gameDaysToRealSeconds } from './gametime'

export default class Plantation {
  constructor ({
    date = Date.now(),
    maxAge,
    firstCropAfter,
    harvestTime,
    harvestEvery = 0
  }) {
    this.birthDate = date
    this.maxAge = maxAge // in game days
    this.firstCropAfter = firstCropAfter // in game days
    this.harvestTime = harvestTime // in game days
    this.harvestEvery = harvestEvery // in game days
  }

  getAge (realNow = Date.now()) {
    return realSecondsToGameDays(realNow - this.birthDate)
  }

  isAlive (realNow = Date.now()) {
    return realNow - this.birthDate <= gameDaysToRealSeconds(this.maxAge)
  }

  getAvailableCrop (realNow = Date.now()) {
    let x = this.getAge(realNow) - this.firstCropAfter

    if (this.harvestEvery) {
      x = x % this.harvestEvery
    }

    return (x >= 0 && x < this.harvestTime) ? 1 : 0
  }
}
