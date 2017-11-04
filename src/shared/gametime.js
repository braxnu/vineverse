const TIME_SPEED = 12 * 24

export function realSecondsToGameDays (realSeconds) {
  return realSeconds / TIME_SPEED
}

export function gameDaysToRealSeconds (gameDays) {
  return gameDays * TIME_SPEED
}
