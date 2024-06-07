import readline from 'readline'
import { ProgressPlugin } from 'webpack'

import { ThemedProgressPlugin } from '../src/index'
import { getProgressConfig } from '../src/config'

jest.mock('readline', () => ({
  clearLine: jest.fn(),
  cursorTo: jest.fn(),
}))

jest.mock('webpack', () => ({
  ProgressPlugin: jest.fn(),
}))

jest.mock('../src/config', () => ({
  getProgressConfig: jest.fn(() => (['\u2588', ' ', 40])),
}))

describe('ThemedProgressPlugin', () => {
  let originalStdoutWrite, plugin, stdoutWriteMock

  beforeEach(() => {
    originalStdoutWrite = process.stdout.write
    stdoutWriteMock = jest.fn().mockImplementation()
    process.stdout.write = stdoutWriteMock

    plugin = new ThemedProgressPlugin()
  })

  afterEach(() => {
    process.stdout.write = originalStdoutWrite
  })

  it('creates a new ProgressPlugin instance in the constructor', () => {
    expect(ProgressPlugin).toHaveBeenCalledWith(expect.any(Function))
  })

  it('calls getProgressConfig in the constructor', () => {
    expect(getProgressConfig).toHaveBeenCalled()
  })

  it('calls this.progress with correct arguments when handler is invoked', async () => {
    plugin.progress = jest.fn()

    const mockPercentage = 0.5
    const mockMessage = 'Compiling...'
    await plugin.handler(mockPercentage, mockMessage)

    expect(plugin.progress).toHaveBeenCalledWith(mockPercentage, mockMessage)
  })

  test.each([
    [0.00, `${' '.repeat(40)} | 0% Compiling...`],
    [0.10, `${'\u2588'.repeat(4)}${' '.repeat(36)} | 10% Compiling...`],
    [0.45, `${'\u2588'.repeat(18)}${' '.repeat(22)} | 45% Compiling...`],
    [0.50, `${'\u2588'.repeat(20)}${' '.repeat(20)} | 50% Compiling...`],
    [0.55, `${'\u2588'.repeat(22)}${' '.repeat(18)} | 55% Compiling...`],
    [0.90, `${'\u2588'.repeat(36)}${' '.repeat(4)} | 90% Compiling...`],
    [0.98, `${'\u2588'.repeat(39)}${' '.repeat(1)} | 98% Compiling...`],
    [1.00, `${'\u2588'.repeat(40)} | 100% Compiling...`],
  ])('updates the progress bar correctly at %s percent', (percentage, expectedLog) => {
    plugin.progress(percentage, 'Compiling...')

    expect(readline.clearLine).toHaveBeenCalledWith(process.stdout, 0)
    expect(readline.cursorTo).toHaveBeenCalledWith(process.stdout, 0)
    expect(stdoutWriteMock).toHaveBeenCalledTimes(1)
    expect(stdoutWriteMock).toHaveBeenCalledWith(expectedLog)
  })

  test.each([
    [0.00, `${'🦇'.repeat(20)} | 0% Compiling...`],
    [0.05, `🎃${'🦇'.repeat(19)} | 5% Compiling...`],
    [0.42, `${'🎃'.repeat(8)}${'🦇'.repeat(12)} | 42% Compiling...`],
    [0.46, `${'🎃'.repeat(9)}${'🦇'.repeat(11)} | 46% Compiling...`],
    [0.52, `${'🎃'.repeat(10)}${'🦇'.repeat(10)} | 52% Compiling...`],
    [0.80, `${'🎃'.repeat(16)}${'🦇'.repeat(4)} | 80% Compiling...`],
    [1.00, `${'🎃'.repeat(20)}${'🦇'.repeat(0)} | 100% Compiling...`],
  ])('updates the progress bar correctly at %s percent with emoji', (percentage, expectedLog) => {
    getProgressConfig.mockImplementation(() => (['🎃', '🦇', 20]))

    const pluginWithTheme = new ThemedProgressPlugin()

    pluginWithTheme.progress(percentage, 'Compiling...')

    expect(readline.clearLine).toHaveBeenCalledWith(process.stdout, 0)
    expect(readline.cursorTo).toHaveBeenCalledWith(process.stdout, 0)
    expect(stdoutWriteMock).toHaveBeenCalledTimes(1)
    expect(stdoutWriteMock).toHaveBeenCalledWith(expectedLog)
  })

  it('applies the ProgressPlugin to the compiler', () => {
    const mockApply = jest.fn()
    plugin.progressPlugin = { apply: mockApply }

    const mockCompiler = {}
    plugin.apply(mockCompiler)

    expect(mockApply).toHaveBeenCalledWith(mockCompiler)
  })

})
