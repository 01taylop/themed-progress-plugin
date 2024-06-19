import chalk from 'chalk'

const dateConfigurations = {
  '01-01': ['🎉', '⬜️'], // New Year's Day
  '02-14': ['🌹', '🥀'], // Valentine's Day
  '03-04-2025': ['🥞', '🍽️'], // Pancake Day 2025
  '03-17': ['🍀', '⬜️'], // St Patrick's Day
  '04-01': ['🃏', '⬜️'], // April Fool's Day
  '04-10-2025_04-20-2025': ['🐣', '🥚'], // Easter 2025
  '04-22': ['🌎', '⬜️'], // Earth Day
  '06-05': ['🌳', '⬜️'], // World Environment Day
  '06-08': ['🌊', '⬜️'], // World Oceans Day
  '06-19_06-23': ['☀️', '☁️'], // Summer Solstice (21st June)
  '07-04': ['🎆', '⬜️'], // Independence Day (US)
  '07-01-2024_07-14-2024': ['🎾', '⬜️'], // Wimbledon 2024 (UK)
  '09-05': ['💖', '🤍'], // International Charity Day
  '10-01': ['☕️', '⬜️'], // International Coffee Day
  '10-24_10-31': ['🎃', '🦇'], // Halloween
  '12-01_12-31': ['⛄️', '🧊'], // Winter
}

const getProgressConfig = () => {
  const currentDate = new Date()
  const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime()

  const matchingConfig = Object.entries(dateConfigurations).find(([dateRange]) => {
    const [startDateString, endDateString] = dateRange.split('_')

    const [startMonth, startDay, startYear = currentDate.getFullYear()] = startDateString.split('-').map(Number)
    const startDate = new Date(startYear, startMonth - 1, startDay).getTime()

    if (!endDateString) {
      return startDate === today
    }

    const [endMonth, endDay, endYear = currentDate.getFullYear()] = endDateString.split('-').map(Number)
    const endDate = new Date(endYear, endMonth - 1, endDay).getTime()

    return startDate <= today && endDate >= today
  })

  return matchingConfig
    ? [matchingConfig[1], 20].flat()
    : [chalk.green('\u2588'), chalk.bgWhite(' '), 40]
}

export {
  getProgressConfig,
}
