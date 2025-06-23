const path = require('path');

module.exports = {
  target: 'electron-preload',
  entry: path.join(__dirname, '../../src/preload/preload.ts'),
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'preload.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};