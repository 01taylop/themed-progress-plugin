import baseConfig from '../jest.config.js'

export default {
  ...baseConfig,
  moduleNameMapper: {
    '/src/index$': '<rootDir>/lib/index.cjs',
  },
  rootDir: '../',
}
