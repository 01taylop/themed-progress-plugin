import baseConfig from '../jest.config.js'

export default {
  ...baseConfig,
  moduleNameMapper: {
    '<rootDir>/src/(.*)$': '<rootDir>/lib/$1.cjs',
  },
  rootDir: '../',
}
