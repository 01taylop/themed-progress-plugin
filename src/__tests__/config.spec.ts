import { getProgressConfig } from '../config'

jest.mock('chalk', () => ({
  bgWhite: jest.fn().mockImplementation(text => text),
  green: jest.fn().mockImplementation(text => text),
}))

describe('getProgressConfig', () => {

  describe('date parameter handling', () => {

    afterEach(() => {
      jest.useRealTimers()
    })

    it('uses the provided date parameter', () => {
      jest.useFakeTimers().setSystemTime(new Date('2000-01-01'))

      const config = getProgressConfig(new Date('2000-02-14'))

      expect(config).toEqual(['🌹', '🥀', 20])
    })

    it('uses the current date when no parameter is provided', () => {
      jest.useFakeTimers().setSystemTime(new Date('2000-02-14'))

      const config = getProgressConfig()

      expect(config).toEqual(['🌹', '🥀', 20])
    })

  })

  describe('theme matching logic', () => {

    test.each([
      '2000-01-06',
      '2000-01-31',
    ])('returns the default configuration when no event matches (%s)', date => {
      const config = getProgressConfig(new Date(date))

      expect(config).toEqual(['\u2588', ' ', 40])
    })

    test.each([
      ['2000-02-14', ['🌹', '🥀', 20]],
      ['2000-03-01', ['🌼', '🌱', 20]],
      ['2000-03-14', ['🥧', '🍽️', 20]],
      ['2000-03-17', ['🍀', '⬜️', 20]],
      ['2000-04-01', ['🃏', '🕳️', 20]],
      ['2000-04-22', ['🌎', '⬜️', 20]],
      ['2000-05-04', ['⭐️', '🌌', 20]],
      ['2000-05-20', ['🐝', '🌸', 20]],
      ['2000-05-30', ['🥔', '⬜️', 20]],
      ['2000-06-01', ['☀️', '🌤️', 20]],
      ['2000-06-03', ['🚲', '⬜️', 20]],
      ['2000-06-05', ['🌳', '⬜️', 20]],
      ['2000-06-08', ['🌊', '⬜️', 20]],
      ['2000-07-04', ['🎆', '⬛️', 20]],
      ['2000-07-20', ['🌝', '🌚', 20]],
      ['2000-09-01', ['🍂', '🍃', 20]],
      ['2000-09-05', ['💖', '🤍', 20]],
      ['2000-09-21', ['☮️', '⬛️', 20]],
      ['2000-10-01', ['☕️', '🕘', 20]],
    ])('returns themed configuration for a single matching date (%s)', (date, expectedResult) => {
      const config = getProgressConfig(new Date(date))

      expect(config).toEqual(expectedResult)
    })

    test.each([
      ['2000-01-01', ['🎉', '🪩', 20]],
      ['2000-01-03', ['🎉', '🪩', 20]],
      ['2000-01-05', ['🎉', '🪩', 20]],

      ['2000-06-19', ['☀️', '☁️', 20]],
      ['2000-06-21', ['☀️', '☁️', 20]],
      ['2000-06-23', ['☀️', '☁️', 20]],

      ['2000-10-24', ['🎃', '🦇', 20]],
      ['2000-10-28', ['🎃', '🦇', 20]],
      ['2000-10-31', ['🎃', '🦇', 20]],

      ['2000-12-01', ['⛄️', '🧊', 20]],
      ['2000-12-15', ['⛄️', '🧊', 20]],
      ['2000-12-31', ['⛄️', '🧊', 20]],
    ])('returns themed configuration for a date within a range (%s)', (date, expectedResult) => {
      const config = getProgressConfig(new Date(date))

      expect(config).toEqual(expectedResult)
    })

    test.each([
      // ['2026-02-17', ['🐴', '🧧', 20]],
      ['2027-02-06', ['🐐', '🧧', 20]],
      ['2028-01-26', ['🐒', '🧧', 20]],
      // ['2029-02-13', ['🐓', '🧧', 20]],
      ['2030-02-03', ['🐶', '🧧', 20]],
      ['2031-01-23', ['🐷', '🧧', 20]],
      ['2032-02-11', ['🐀', '🧧', 20]],
      ['2033-01-31', ['🐂', '🧧', 20]],
      ['2034-02-19', ['🐯', '🧧', 20]],
      ['2035-02-08', ['🐰', '🧧', 20]],

      ['2026-03-26', ['🐣', '🥚', 20]],
      ['2026-04-05', ['🐣', '🥚', 20]],
      ['2027-03-18', ['🐣', '🥚', 20]],
      ['2027-03-28', ['🐣', '🥚', 20]],
      ['2028-04-06', ['🐣', '🥚', 20]],
      ['2028-04-16', ['🐣', '🥚', 20]],
      ['2029-03-22', ['🐣', '🥚', 20]],
      // ['2029-04-01', ['🐣', '🥚', 20]],
      ['2030-04-11', ['🐣', '🥚', 20]],
      ['2030-04-21', ['🐣', '🥚', 20]],

      ['2027-02-09', ['🥞', '🍽️', 20]],
      ['2028-02-29', ['🥞', '🍽️', 20]],
      ['2030-03-05', ['🥞', '🍽️', 20]],

      ['2026-11-25', ['🦃', '🍂', 20]],
      ['2026-11-26', ['🦃', '🍂', 20]],
      ['2027-11-24', ['🦃', '🍂', 20]],
      ['2027-11-25', ['🦃', '🍂', 20]],
      ['2028-11-22', ['🦃', '🍂', 20]],
      ['2028-11-23', ['🦃', '🍂', 20]],
      ['2029-11-21', ['🦃', '🍂', 20]],
      ['2029-11-22', ['🦃', '🍂', 20]],
      ['2030-11-27', ['🦃', '🍂', 20]],
      ['2030-11-28', ['🦃', '🍂', 20]],

      ['2026-06-29', ['🎾', '⬛️', 20]],
      ['2026-07-12', ['🎾', '⬛️', 20]],
      ['2027-06-28', ['🎾', '⬛️', 20]],
      ['2027-07-11', ['🎾', '⬛️', 20]],
    ])('returns themed configuration for a year-specific date (%s)', (date, expectedResult) => {
      const parsedDate = new Date(date)
      const oldDate = new Date(date)
      oldDate.setFullYear(parsedDate.getFullYear() - 10)

      const match = getProgressConfig(parsedDate)
      const noMatch = getProgressConfig(oldDate)

      expect(match).toEqual(expectedResult)
      expect(noMatch).not.toEqual(expectedResult)
    })

    test.each([
      ['2026-02-17', [['🐴', '🧧', 20], ['🥞', '🍽️', 20]]],
      ['2029-02-13', [['🐓', '🧧', 20], ['🥞', '🍽️', 20]]],
      ['2029-04-01', [['🐣', '🥚', 20], ['🃏', '🕳️', 20]]],
    ])('randomly selects one theme when multiple match', (date, expectedResults) => {
      const configs = new Set()

      for (let i = 0; i < 50; i++) {
        const config = getProgressConfig(new Date(date))
        configs.add(JSON.stringify(config))
        if (configs.size >= 2) {
          break
        }
      }

      expect(configs.size).toBeGreaterThan(1)
      expect(configs.has(JSON.stringify(expectedResults[0]))).toBe(true)
      expect(configs.has(JSON.stringify(expectedResults[1]))).toBe(true)
    })

  })

})
