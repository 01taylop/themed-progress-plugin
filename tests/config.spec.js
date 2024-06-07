import chalk from 'chalk'

import { getProgressConfig } from '../src/config'

jest.mock('chalk', () => ({
  bgWhite: jest.fn().mockImplementation(text => text),
  green: jest.fn().mockImplementation(text => text),
}))

describe('getProgressConfig', () => {

  test.each([
    ['2025-01-01', ['🎉', '⬜️', 20]],
    ['2025-01-02', ['\u2588', ' ', 40]],
    ['2025-02-14', ['🌹', '🥀', 20]],
    ['2025-03-17', ['🍀', '⬜️', 20]],
    ['2025-04-10', ['🐣', '🥚', 20]],
    ['2025-04-20', ['🐣', '🥚', 20]],
    ['2025-04-22', ['🌎', '⬜️', 20]],
    ['2025-06-05', ['🌳', '⬜️', 20]],
    ['2025-06-08', ['🌊', '⬜️', 20]],
    ['2025-06-19', ['☀️', '☁️', 20]],
    ['2025-06-23', ['☀️', '☁️', 20]],
    ['2025-07-04', ['🎆', '⬜️', 20]],
    ['2024-07-01', ['🎾', '⬜️', 20]],
    ['2024-07-14', ['🎾', '⬜️', 20]],
    ['2025-09-05', ['💖', '🤍', 20]],
    ['2025-10-01', ['☕️', '⬜️', 20]],
    ['2025-10-24', ['🎃', '🦇', 20]],
    ['2025-10-31', ['🎃', '🦇', 20]],
    ['2025-12-01', ['⛄️', '🧊', 20]],
    ['2025-12-31', ['⛄️', '🧊', 20]],
  ])('returns the correct configuration for %s', (date, expectedResult) => {
    jest.useFakeTimers().setSystemTime(new Date(date))

    const config = getProgressConfig()

    expect(config).toEqual(expectedResult)
  })

})
