import type { Compiler } from 'webpack'

declare class ThemedProgressPlugin {
  constructor()
  apply(compiler: Compiler): void
}

export {
  ThemedProgressPlugin,
}
