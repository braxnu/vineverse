import { realSecondsToGameDays, gameDaysToRealSeconds } from './gametime'

export default class Plantation {
  constructor ({
    date = Date.now(),
    maxAge = -1,
    firstCropAfter = 1,
    harvestTime = 1,
    harvestEvery = 0,
    size = 1
  }) {
    this.birthDate = date
    this.lastHarvestDate = null
    this.lastHarvestSize = 0
    this.maxAge = maxAge // in game days
    this.firstCropAfter = firstCropAfter // in game days
    this.harvestTime = harvestTime // in game days
    this.harvestEvery = harvestEvery // in game days
    this.size = size // in ares
  }

  getAge (realNow = Date.now()) {
    return realSecondsToGameDays(realNow - this.birthDate)
  }

  isAlive (realNow = Date.now()) {
    return this.maxAge === -1 ||
      realNow - this.birthDate <= gameDaysToRealSeconds(this.maxAge)
  }

  getAvailableCrop (realNow = Date.now()) {
    const age = this.getAge(realNow)

    if (age < this.firstCropAfter) return 0

    let x = age - this.firstCropAfter
    let y = x

    if (this.harvestEvery) {
      y = x % this.harvestEvery
    }

    if (y < 0 || y >= this.harvestTime) return 0

    if (realSecondsToGameDays(realNow) >=
      realSecondsToGameDays(this.lastHarvestDate) + this.harvestEvery
    ) {
      return this.size
    } else {
      return this.size - this.lastHarvestSize
    }
  }

  harvest (realNow = Date.now(), size) {
    this.lastHarvestSize = Math.max(
      Math.min(0, size),
      this.getAvailableCrop(realNow)
    )

    this.lastHarvestDate = realNow
  }
}
