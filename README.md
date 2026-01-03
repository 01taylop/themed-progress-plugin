# 💚 Themed Progress Plugin

[![Test](https://github.com/01taylop/themed-progress-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/01taylop/themed-progress-plugin/actions/workflows/test.yml)

![Node Versions Supported](https://img.shields.io/static/v1?label=node&message=>=18.18.0&color=blue)

A Webpack plugin featuring emoji-themed progress bars for a fun and engaging build process. Includes seasonal and date-based themes for a personalised development experience.

- [Motivation](#motivation)
- [Example](#example)
- [Usage](#usage)
  - [Installation](#installation)
  - [Configuration](#configuration)

## Motivation

Build processes typically display progress with plain, utilitarian indicators that get the job done but lack personality. While functional, these standard progress bars are part of the everyday routine that can feel repetitive.

Themed Progress Plugin adds a bit of whimsy to your development workflow with emoji-themed progress indicators that change based on the date. It's a small touch that brings some character and surprise to an otherwise routine part of development.

## Example

Normal:

![Progress Bar Normal](https://github.com/01taylop/themed-progress-plugin/blob/main/assets/progress-normal.jpg?raw=true)

During Halloween:

![Progress Bar Themed](https://github.com/01taylop/themed-progress-plugin/blob/main/assets/progress-theme.jpg?raw=true)

## Usage

### Installation

Install the package as a dev dependency:

```bash
# Using npm
npm install -D themed-progress-plugin

# Using yarn
yarn add -D themed-progress-plugin
```

### Configuration

Configuring `ThemedProgressPlugin` is straightforward. After importing it, you simply need to add it to the plugins array in your Webpack configuration.

For CommonJS:

```js
const { ThemedProgressPlugin } = require('themed-progress-plugin')

module.exports = {
  // other webpack configuration...
  plugins: [
    new ThemedProgressPlugin(),
    // other plugins...
  ],
}
```

For ES Modules:

```js
import { ThemedProgressPlugin } from 'themed-progress-plugin'

export default {
  // other webpack configuration...
  plugins: [
    new ThemedProgressPlugin(),
    // other plugins...
  ],
}
```
