import { createRequire } from 'node:module'

import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'

const esmRequire = createRequire(import.meta.url)
const pkg = esmRequire('./package.json')

const commonOptions = {
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
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
