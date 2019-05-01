const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    entry: './web/web.js',
    output: {
      filename: 'bundle.js',
      publicPath: '/web/',
      path: path.resolve(__dirname, 'web/dist')
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    }
  },
  {
    entry: './client/src/client.js',
    output: {
      filename: 'client.min.js',
      publicPath: '/client/',
      path: path.resolve(__dirname, 'client/dist')
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    },
    plugins: [
      new CopyPlugin([
        {
          from: 'client/hello.html',
          to: 'hello.html'
        }
      ])
    ]
  }
];
