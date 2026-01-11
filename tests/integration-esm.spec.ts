import { jest } from '@jest/globals'

import { ThemedProgressPlugin as ThemedProgressPluginESM } from '../lib/index.js'

import compiler from './compiler'

// @ts-ignore - CJS build doesn't have type definitions
const { ThemedProgressPlugin: ThemedProgressPluginCJS } = await import('../lib/index.cjs')

describe.each([
  ['ESM', ThemedProgressPluginESM],
  ['CJS', ThemedProgressPluginCJS],
])('Integration tests - %s', (_format, ThemedProgressPlugin) => {

  it('can instantiate ThemedProgressPlugin', () => {
    const plugin = new ThemedProgressPlugin()

    expect(plugin).toBeInstanceOf(ThemedProgressPlugin)
    expect(typeof plugin.apply).toBe('function')
  })

  it('can be used as a webpack plugin and outputs progress', async () => {
    expect.assertions(3)

    const progressOutputs: string[] = []
    const originalWrite = process.stdout.write.bind(process.stdout)

    const writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation((chunk: any) => {
      const output = String(chunk)
      if (output.includes('|') && output.includes('%')) {
        progressOutputs.push(output)
        return true
      }
      return originalWrite(chunk)
    })

    const plugin = new ThemedProgressPlugin()
    const stats = await compiler(plugin)

    expect(stats.hasErrors()).toBe(false)
    expect(progressOutputs.length).toBeGreaterThan(0)
    expect(progressOutputs.some(output => /\d+%/.test(output))).toBe(true)

    writeSpy.mockRestore()
  })

})
