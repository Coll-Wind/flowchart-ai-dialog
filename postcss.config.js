const path = require('path');

module.exports = {
  target: 'electron-main',
  entry: path.join(__dirname, '../../src/main/main.ts'),
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'main.js',
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