const path = require('path')
const webpack = require('webpack')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const paths = require('./paths')
const postcssUrlRebase = require('./postcssUrlRebase')
const stylelint = require('stylelint')

const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const postcssImport = require('postcss-import')
const postcssSassEach = require('postcss-sass-each')
const postcssUrl = require('postcss-url')({ url: postcssUrlRebase })
const postcssNext = require('postcss-cssnext')

module.exports = {
  bail: true,
  devtool: 'source-map',
  target: 'web',
  entry: [
    require.resolve('./polyfills.js'),
    paths.appIndexJs,
  ],
  output: {
    path: paths.appBuild,
    filename: './index.js',
    chunkFilename: './index.chunk.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    plugins: [
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),

            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.css$/,
        enforce: 'pre',
        use: [
          {
            options: {
              plugins: () => [
                stylelint,
              ],
            },
            loader: require.resolve('postcss-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {

              compact: true,
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    postcssFlexbugsFixes,
                    postcssImport,
                    postcssSassEach,
                    postcssUrl,
                    postcssNext,
                  ],
                },
              },
            ],
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: true,
    }),
  ],
}
