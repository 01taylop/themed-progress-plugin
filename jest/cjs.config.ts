import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  moduleNameMapper: {
    '<rootDir>/src/(.*)$': '<rootDir>/lib/$1.cjs',
  },
  rootDir: '../',
  transformIgnorePatterns: [
    '<rootDir>/lib/(.*)$'
  ],
}

export default config
