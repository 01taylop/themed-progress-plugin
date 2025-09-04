import chalk from 'chalk'

const dateConfigurations = {
  '01-01_01-05': ['🎉', '🪩'], // New Year's Day
  '01-23-2031': ['🐷', '🧧'], // Chinese New Year 2031
  '01-26-2028': ['🐒', '🧧'], // Chinese New Year 2028
  '01-31-2033': ['🐂', '🧧'], // Chinese New Year 2033
  '02-03-2030': ['🐶', '🧧'], // Chinese New Year 2030
  '02-06-2027': ['🐐', '🧧'], // Chinese New Year 2027
  '02-08-2035': ['🐰', '🧧'], // Chinese New Year 2035
  '02-09-2027': ['🥞', '🍽️'], // Pancake Day 2027
  '02-11-2032': ['🐀', '🧧'], // Chinese New Year 2032
  '02-13-2029': ['🥞', '🍽️'], // Pancake Day 2029
  '02-13-2029': ['🐓', '🧧'], // Chinese New Year 2029
  '02-14': ['🌹', '🥀'], // Valentine's Day
  '02-17-2026': ['🥞', '🍽️'], // Pancake Day 2026
  '02-17-2026': ['🐴', '🧧'], // Chinese New Year 2026
  '02-19-2034': ['🐯', '🧧'], // Chinese New Year 2034
  '02-29-2028': ['🥞', '🍽️'], // Pancake Day 2028
  '03-05-2030': ['🥞', '🍽️'], // Pancake Day 2030
  '03-14': ['🥧', '🍽️'], // Pi Day
  '03-17': ['🍀', '⬜️'], // St Patrick's Day
  '03-18-2027_03-28-2027': ['🐣', '🥚'], // Easter 2027
  '03-22-2029_04-01-2029': ['🐣', '🥚'], // Easter 2029
  '03-26-2026_04-05-2026': ['🐣', '🥚'], // Easter 2026
  '04-01': ['🃏', '🕳️'], // April Fool's Day
  '04-06-2028_04-16-2028': ['🐣', '🥚'], // Easter 2028
  '04-11-2030_04-21-2030': ['🐣', '🥚'], // Easter 2030
  '04-22': ['🌎', '⬜️'], // Earth Day
  '05-04': ['⭐️', '🌌'], // Star Wars Day
  '05-20': ['🐝', '🌸'], // World Bee Day
  '05-30': ['🥔', '⬜️'], // International Day of Potato
  '06-03': ['🚲', '⬜️'], // World Bicycle Day
  '06-05': ['🌳', '⬜️'], // World Environment Day
  '06-08': ['🌊', '⬜️'], // World Oceans Day
  '06-19_06-23': ['☀️', '☁️'], // Summer Solstice (21st June)
  '06-28-2027_07-11-2027': ['🎾', '⬛️'], // Wimbledon 2027 (UK)
  '06-29-2026_07-12-2026': ['🎾', '⬛️'], // Wimbledon 2026 (UK)
  '07-04': ['🎆', '⬛️'], // Independence Day (US)
  '07-20': ['🌝', '🌚'], // International Moon Day
  '09-05': ['💖', '🤍'], // International Charity Day
  '09-21': ['☮️', '⬛️'], // International Day of Peace
  '10-01': ['☕️', '🕘'], // International Coffee Day
  '10-24_10-31': ['🎃', '🦇'], // Halloween
  '11-21-2029_11-22-2029': ['🦃', '🍂'], // Thanksgiving 2029 (US)
  '11-22-2028_11-23-2028': ['🦃', '🍂'], // Thanksgiving 2028 (US)
  '11-24-2027_11-25-2027': ['🦃', '🍂'], // Thanksgiving 2027 (US)
  '11-25-2026_11-26-2026': ['🦃', '🍂'], // Thanksgiving 2026 (US)
  '11-26-2025_11-27-2025': ['🦃', '🍂'], // Thanksgiving 2025 (US)
  '11-27-2030_11-28-2030': ['🦃', '🍂'], // Thanksgiving 2030 (US)
  '12-01_12-31': ['⛄️', '🧊'], // Winter (Northern Hemisphere)
}

const getProgressConfig = (currentDate = new Date()) => {
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
