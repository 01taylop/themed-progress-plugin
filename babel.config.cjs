module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
  ],
  env: {
    cjs: {
      presets: [["@babel/preset-env", { modules: "commonjs" }]],
      plugins: [
        ["babel-plugin-add-import-extension", { extension: "cjs" }],
      ],
    },
    esm: {
      presets: [["@babel/preset-env", { modules: false }]],
      plugins: [
        ["babel-plugin-add-import-extension", { extension: "js" }],
      ],
    },
  },
}
