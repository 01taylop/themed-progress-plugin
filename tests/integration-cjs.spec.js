import { createRequire } from 'node:module'

import { jest } from '@jest/globals'

import compiler from './compiler'

const esmRequire = createRequire(import.meta.url)
const { ThemedProgressPlugin } = esmRequire('../lib/index.cjs')

describe('Integration tests - CJS', () => {

  it('can instantiate ThemedProgressPlugin', () => {
    const plugin = new ThemedProgressPlugin()

    expect(plugin).toBeInstanceOf(ThemedProgressPlugin)
    expect(typeof plugin.apply).toBe('function')
  })

  it('can be used as a webpack plugin and outputs progress', async () => {
    expect.assertions(3)

    const progressOutputs = []
    const originalWrite = process.stdout.write.bind(process.stdout)

    const writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation(chunk => {
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
