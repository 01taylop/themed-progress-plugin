import { tmpdir } from 'node:os'

import webpack from 'webpack'

import type { Stats, WebpackPluginInstance } from 'webpack'

const compiler = (plugin: WebpackPluginInstance): Promise<Stats> => {
  const webpackCompiler = webpack({
    entry: './tests/entry.js',
    mode: 'development',
    output: {
      path: tmpdir(),
    },
    plugins: [plugin],
  })

  if (!webpackCompiler) {
    throw new Error('Webpack compiler creation failed')
  }

  return new Promise((resolve, reject) => {
    webpackCompiler.run((error, stats) => {
      if (error) {
        reject(error)
      }
      if (stats?.hasErrors()) {
        reject(stats.toJson().errors)
      }
      resolve(stats!)
    })
  })
}

export {
  compiler,
}
