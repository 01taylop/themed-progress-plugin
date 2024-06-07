import baseConfig from '../jest.config.js'

export default {
  ...baseConfig,
  moduleNameMapper: {
    '<rootDir>/src/config$': '<rootDir>/lib/config.js',
    '<rootDir>/src/index$': '<rootDir>/lib/index.js',
  },
  rootDir: '../',
}
