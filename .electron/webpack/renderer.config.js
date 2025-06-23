const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  entry: path.join(__dirname, '../../src/renderer/index.tsx'),
  output: {
    path: path.join(__dirname, '../../dist/renderer'),
    filename: 'renderer.js',
    publicPath: isDev ? 'http://localhost:3000/' : './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../../src/renderer/index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    port: 3000,
    hot: true
  }
};