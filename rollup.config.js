import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import { dts } from 'rollup-plugin-dts'

const { dependencies, peerDependencies } = JSON.parse(readFileSync(resolve('./package.json'), 'utf-8'))

const commonOptions = {
  external: [
    ...Object.keys(dependencies || {}),
    ...Object.keys(peerDependencies || {}),
  ],
  input: 'src/index.ts',
}

const commonTypeScriptOptions = {
  exclude: [
    'tests/**',
    '**/__tests__/**',
    '**/*.spec.*',
  ],
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
    typescript(commonTypeScriptOptions),
    terser(),
  ],
}, {
  input: 'src/index.ts',
  output: [{
    file: 'lib/index.d.ts',
    format: 'esm',
  }, {
    file: 'lib/index.d.cts',
    format: 'cjs',
  }],
  plugins: [
    dts(),
  ],
}])
