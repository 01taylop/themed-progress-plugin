import { tmpdir } from 'node:os'

import { jest } from '@jest/globals'
import webpack from 'webpack'

import { createRequire } from 'node:module'

const esmRequire = createRequire(import.meta.url)
const { ThemedProgressPlugin } = esmRequire('../lib/index.cjs')

describe('Integration tests - CJS', () => {

  it('can instantiate ThemedProgressPlugin', () => {
    const plugin = new ThemedProgressPlugin()

    expect(plugin).toBeInstanceOf(ThemedProgressPlugin)
    expect(typeof plugin.apply).toBe('function')
  })

  it('can be used as a webpack plugin and outputs progress', done => {
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

    const compiler = webpack({
      entry: './tests/entry.js',
      mode: 'development',
      output: {
        path: tmpdir(),
      },
      plugins: [plugin],
    })

    if (!compiler) {
      throw new Error('Webpack compiler is null')
    }

    compiler.run((err, stats) => {
      expect(err).toBeNull()
      expect(stats?.hasErrors()).toBe(false)

      expect(progressOutputs.length).toBeGreaterThan(0)
      expect(progressOutputs.some(output => /\d+%/.test(output))).toBe(true)

      compiler.close(() => {
        writeSpy.mockRestore()
        done()
      })
    })
  }, 10000)

})
