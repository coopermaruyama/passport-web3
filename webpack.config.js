var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/index.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'flow']
        }
      }
    ]
  }
};
