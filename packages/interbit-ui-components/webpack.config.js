/* global __dirname, require, module */

const path = require('path')
const pkg = require('./package.json')

const libraryName = pkg.name

const plugins = []

const outputFile = `${libraryName}.js`

const config = {
  entry: path.join(__dirname, './src/index.js'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000,
              fallback: 'file-loader',
              // Options for the fallback
              name: '[name]-[md5:hash].[ext]',
              outputPath: '/assets/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      assets: path.resolve(__dirname, 'assets')
    },
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src'),
      path.resolve('../../node_modules')
    ],
    extensions: ['.json', '.js', '.jsx', '.css', '.svg', '.png']
  },
  plugins,
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    }
  }
}

module.exports = config
