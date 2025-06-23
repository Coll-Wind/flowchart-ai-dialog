const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'electron-main',
  devtool: isDev ? 'inline-source-map' : false,
  entry: path.join(__dirname, '../../src/main/main.ts'),
  output: {
    path: path.join(__dirname, '../../dist'),
    filename: 'main.js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, '../../src')
    }
  },
  externals: {
    electron: 'require("electron")'
  }
};