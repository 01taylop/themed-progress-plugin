import { tmpdir } from 'node:os'

import webpack, { type Stats, type WebpackPluginInstance } from 'webpack'

export default (plugin: WebpackPluginInstance): Promise<Stats> => {
  const compiler = webpack({
    entry: './tests/entry.js',
    mode: 'development',
    output: {
      path: tmpdir(),
    },
    plugins: [plugin],
  })

  if (!compiler) {
    throw new Error('Webpack compiler creation failed')
  }

  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
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
