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
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
}

export default config
