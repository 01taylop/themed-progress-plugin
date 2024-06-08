# 💚 Themed Progress Plugin

[![CodeQL Analysis](https://github.com/01taylop/themed-progress-plugin/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/01taylop/themed-progress-plugin/actions/workflows/codeql-analysis.yml)
[![Test](https://github.com/01taylop/themed-progress-plugin/actions/workflows/test.yml/badge.svg)](https://github.com/01taylop/themed-progress-plugin/actions/workflows/test.yml)

A webpack plugin featuring an emoji-themed loading bar for a fun and aesthetic build process.

- [Motivation](#motivation)
- [Example](#example)
- [Usage](#usage)
  - [Installation](#installation)
  - [Configuration](#configuration)

## Motivation

Traditional compilation processes can often be mundane and provide little visual feedback. `ThemedProgressPlugin` aims to bring a touch of light-hearted fun to everyday coding tasks by introducing a dynamic, emoji-themed loading bar which changes based on the date.

This brings an element of surprise and novelty to the typically routine compilation process, making it a more enjoyable part of the developer's day.

## Example

Normal:

![Progress Bar Normal](https://github.com/01taylop/themed-progress-plugin/blob/main/assets/progress-normal.jpg?raw=true)

During Halloween:

![Progress Bar Themed](https://github.com/01taylop/themed-progress-plugin/blob/main/assets/progress-theme.jpg?raw=true)

## Usage

### Installation

First, install the package as a dev dependency:

```bash
# Using yarn
yarn add -D themed-progress-plugin

# Using npm
npm install -D themed-progress-plugin
```

### Configuration

Configuring `ThemedProgressPlugin` is straightforward. After importing it, you simply need to add it to the plugins array in your webpack configuration.

You can import `ThemedProgressPlugin` using either CommonJS or ES Modules. Here's an example of how to do this:

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
