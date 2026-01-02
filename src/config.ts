import chalk from 'chalk'

import { THEMES } from './themes'

const DEFAULT_PROGRESS_LENGTH = 40
const THEMED_PROGRESS_LENGTH = 20

const DEFAULT_THEME: [string, string, number] = [
  chalk.green('\u2588'),
  chalk.bgWhite(' '),
  DEFAULT_PROGRESS_LENGTH,
]

const getProgressConfig = (currentDate = new Date()): [string, string, number] => {
  const today = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  ).getTime()

  const parseDate = (dateString: string): number => {
    const [month, day, year = currentDate.getFullYear()] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day).getTime()
  }

  const matchingThemes = THEMES.filter(([dateRange]) => {
    const [startDateString, endDateString] = dateRange.split('_')
    const startDate = parseDate(startDateString)

    if (!endDateString) {
      return startDate === today
    }

    const endDate = parseDate(endDateString)
    return startDate <= today && endDate >= today
  })

  if (matchingThemes.length === 0) {
    return DEFAULT_THEME
  }

  const selectedTheme = matchingThemes[Math.floor(Math.random() * matchingThemes.length)]

  const [_dateString, startEmoji, endEmoji] = selectedTheme
  return [startEmoji, endEmoji, THEMED_PROGRESS_LENGTH]
}

export {
  getProgressConfig,
}
