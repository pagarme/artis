const webpack = require('webpack')
const paths = require('./paths')
const postcssUrlRebase = require('./postcssUrlRebase')
const stylelint = require('stylelint')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const postcssImport = require('postcss-import')
const postcssSassEach = require('postcss-sass-each')
const postcssUrl = require('postcss-url')({ url: postcssUrlRebase })
const postcssNext = require('postcss-cssnext')({
  features: {
    customProperties: {
      warnings: false,
    },
  },
})

const isTravis = 'TRAVIS' in process.env && 'CI' in process.env
const isCircle = 'CIRCLECI' in process.env && 'CI' in process.env

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: {
      warnings: false,
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
    },
    output: {
      comments: false,
    },
    exclude: [/\.min\.js$/gi],
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0,
  }),
]

if (!isTravis && !isCircle) {
  plugins.push(new BundleAnalyzer())
}

module.exports = {
  bail: true,
  devtool: 'source-map',
  target: 'web',
  entry: [
    'whatwg-fetch',
    paths.appIndexJs,
  ],
  output: {
    path: paths.appBuild,
    filename: './index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
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
            test: /\.(bmp|gif|jpe|png|woff|ttf|eot)$/,
            loader: require.resolve('url-loader'),
            options: {
              limit: 1000000,
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
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.svg$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  // @remove-on-eject-begin
                  babelrc: false,
                  presets: [require.resolve('babel-preset-react-app')],
                  // @remove-on-eject-end
                  compact: true,
                },
              },
              {
                loader: require.resolve('svgr/webpack'),
                options: {
                  replaceAttrValues: [
                    ['#000', 'currentColor'],
                    ['#000000', 'currentColor'],
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins,
}
