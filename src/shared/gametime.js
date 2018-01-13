const TIME_SPEED = 12 * 24 // 5 min real time == 24 game time

export function realSecondsToGameDays (realSeconds) {
  return realSeconds / TIME_SPEED
}

export function gameDaysToRealSeconds (gameDays) {
  return gameDays * TIME_SPEED
}
