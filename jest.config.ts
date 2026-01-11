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
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: {
        rootDir: '.',
      },
      useESM: true,
    }],
  },
  transformIgnorePatterns: [
    '/lib/',
    '/node_modules/',
  ],
}

export default config
