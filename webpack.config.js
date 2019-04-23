const path = require('path');

module.exports = {
  entry: './web/web.js',
  output: {
    filename: 'bundle.js',
    publicPath: '/web/',
    path: path.resolve(__dirname, 'web/dist')
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
  }
};
