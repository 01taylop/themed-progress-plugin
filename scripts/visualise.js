import readline from 'readline'

import { getProgressConfig } from '../src/config.js'

const visualise = () => {
  const [startChar, endChar, progressLength] = getProgressConfig(new Date('2025-01-01'))

  const display = count => {
    const complete = startChar.repeat(count)
    const incomplete = endChar.repeat(progressLength - count)
    const percent = (count / progressLength * 100).toFixed()

    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)
    process.stdout.write(`${complete}${incomplete} | ${percent}% Testing...`)

    if (count < progressLength) {
      setTimeout(() => {
        display(count += 1)
      }, 100)
    }
  }

  display(0)
}

visualise()
