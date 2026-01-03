import readline from 'node:readline'

import { ProgressPlugin, type Compiler } from 'webpack'

import { getProgressConfig } from './config'

class ThemedProgressPlugin {
  private readonly progressConfig: [string, string, number]
  private readonly progressPlugin: ProgressPlugin

  constructor() {
    this.progressConfig = getProgressConfig()
    this.progressPlugin = new ProgressPlugin(this.handler.bind(this))
  }

  private handler(percentage: number, message: string): void {
    const [startChar, endChar, progressLength] = this.progressConfig

    const percent = (percentage * 100).toFixed()
    const segments = Math.floor(progressLength * percentage)
    const emptySegments = progressLength - segments

    const complete = startChar.repeat(segments)
    const incomplete = endChar.repeat(emptySegments)

    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(`${complete}${incomplete} | ${percent}% ${message}`)
  }

  apply(compiler: Compiler): void {
    this.progressPlugin.apply(compiler)
  }
}

export {
  ThemedProgressPlugin,
}
