import baseConfig from '../jest.config.js'

export default {
  ...baseConfig,
  moduleNameMapper: {
    '<rootDir>/src/config$': '<rootDir>/lib/config.cjs',
    '<rootDir>/src/index$': '<rootDir>/lib/index.cjs',
  },
  rootDir: '../',
}
