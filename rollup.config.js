import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

const { dependencies, peerDependencies } = JSON.parse(readFileSync(resolve('./package.json'), 'utf-8'))

const commonOptions = {
  external: [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {}),
  ],
  input: 'src/index.ts',
}

const commonTypeScriptOptions = {
  exclude: ['**/*.spec.*']
}

export default defineConfig([{
  ...commonOptions,
  output: {
    exports: 'named',
    file: 'lib/index.cjs',
    format: 'cjs',
  },
  plugins: [
    nodeResolve(),
    typescript(commonTypeScriptOptions),
    terser(),
  ],
}, {
  ...commonOptions,
  output: {
    exports: 'named',
    file: 'lib/index.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    typescript({
      ...commonTypeScriptOptions,
      declaration: true,
      declarationDir: 'lib',
    }),
    terser(),
  ],
}])
