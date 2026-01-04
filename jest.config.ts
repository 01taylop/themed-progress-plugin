import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  transform: {
    'integration-esm\\.spec\\.ts$': ['ts-jest', { useESM: true }],
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '/lib/',
  ],
}

export default config
