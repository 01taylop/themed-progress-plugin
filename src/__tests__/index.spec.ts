import readline from 'node:readline'

import { ProgressPlugin } from 'webpack'

import { ThemedProgressPlugin } from '../index'

jest.mock('node:readline', () => ({
  clearLine: jest.fn(),
  cursorTo: jest.fn(),
}))

jest.mock('chalk', () => ({
  bgWhite: jest.fn().mockImplementation(text => text),
  green: jest.fn().mockImplementation(text => text),
}))

jest.mock('webpack', () => ({
  ProgressPlugin: jest.fn().mockImplementation(() => ({
    apply: jest.fn(),
  })),
}))

describe('ThemedProgressPlugin', () => {

  const writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation()

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('initialises with progress configuration', () => {
    const plugin = new ThemedProgressPlugin()

    expect(ProgressPlugin).toHaveBeenCalledWith(expect.any(Function))
  })

  it('applies the plugin to compiler', () => {
    const plugin = new ThemedProgressPlugin()
    const mockCompiler = {} as any

    plugin.apply(mockCompiler)

    const mockProgressPluginInstance = jest.mocked(ProgressPlugin).mock.results[0].value
    expect(mockProgressPluginInstance.apply).toHaveBeenCalledWith(mockCompiler)
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
  ])('updates the default progress bar at %s percent', (percentage, expectedLog) => {
    jest.setSystemTime(new Date('2000-01-06'))

    const plugin = new ThemedProgressPlugin() as any

    plugin.handler(percentage, 'Compiling...')

    expect(readline.clearLine).toHaveBeenCalledWith(process.stdout, 0)
    expect(readline.cursorTo).toHaveBeenCalledWith(process.stdout, 0)
    expect(writeSpy).toHaveBeenCalledTimes(1)
    expect(writeSpy).toHaveBeenCalledWith(expectedLog)
  })

  test.each([
    [0.00, `🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩 | 0% Compiling...`],
    [0.05, `🎉🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩 | 5% Compiling...`],
    [0.42, `🎉🎉🎉🎉🎉🎉🎉🎉🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩 | 42% Compiling...`],
    [0.46, `🎉🎉🎉🎉🎉🎉🎉🎉🎉🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩 | 46% Compiling...`],
    [0.52, `🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🪩🪩🪩🪩🪩🪩🪩🪩🪩🪩 | 52% Compiling...`],
    [0.80, `🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🪩🪩🪩🪩 | 80% Compiling...`],
    [1.00, `🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 | 100% Compiling...`],
  ])('updates an emoji-themed progress bar at %s percent', (percentage, expectedLog) => {
    jest.setSystemTime(new Date('2000-01-01'))

    const plugin = new ThemedProgressPlugin() as any

    plugin.handler(percentage, 'Compiling...')

    expect(readline.clearLine).toHaveBeenCalledWith(process.stdout, 0)
    expect(readline.cursorTo).toHaveBeenCalledWith(process.stdout, 0)
    expect(writeSpy).toHaveBeenCalledTimes(1)
    expect(writeSpy).toHaveBeenCalledWith(expectedLog)
  })

})
