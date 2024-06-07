import readline from 'readline'
import { ProgressPlugin } from 'webpack'

import { getProgressConfig } from './config'

export default class ThemedProgressPlugin {
  constructor() {
    this.progressConfig = getProgressConfig()
    this.progressPlugin = new ProgressPlugin(this.handler.bind(this))
  }

  handler(...args) {
    this.progress(...args)
  }

  progress(percentage, message) {
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

  apply(compiler) {
    return this.progressPlugin.apply(compiler)
  }
}
