const webpack = require('webpack');
const path = require('path');

// Set the path variables for the webpack config
const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: [
    'webpack-dev-server/client?http://localhost:1234',
    'webpack/hot/dev-server',
    `${APP_DIR}/index.js`
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/static'
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
      test: /\.js|\.jsx?$/,
      exclude: /(node_modules)/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [
          {
          loader: 'url-loader?name=images/[name].[ext]'
          }
        ]
      },
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  devServer: {
    inline: true
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;
